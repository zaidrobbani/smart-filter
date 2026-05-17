<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\Ingredient;
use App\Models\IngredientAlias;
use App\Models\MealType;
use App\Models\CookingTime;
use App\Models\Texture;
use App\Models\Equipment;
use App\Models\Method;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{
    // ─── GET /recipes ────────────────────────────────────────────────────────
    // Daftar resep dengan semua filter sekaligus.
    //
    // Query params yang didukung:
    //   search            string  — nama resep / nama bahan (id/en/alias)
    //   meal_type         int     — ID meal_type
    //   cooking_time      int     — ID cooking_time
    //   texture           int     — ID texture
    //   equipment         int     — ID equipment
    //   method            int     — ID method
    //   ingredients       string  — comma-separated ingredient IDs yang DIMILIKI user
    //                               → filter resep yang bisa dibuat dari bahan tersebut
    //   lang              string  — 'id' (default) atau 'en', untuk label dalam response
    public function index(Request $request)
    {
        $lang = $request->input('lang', 'id');

        $query = Recipe::query()
            ->when($request->search, fn ($q) => $q->search($request->search))
            ->when($request->meal_type, fn ($q) => $q->filterMealType((int) $request->meal_type))
            ->when($request->cooking_time, fn ($q) => $q->filterCookingTime((int) $request->cooking_time))
            ->when($request->texture, fn ($q) => $q->filterTexture((int) $request->texture))
            ->when($request->equipment, fn ($q) => $q->filterEquipment((int) $request->equipment))
            ->when($request->method, fn ($q) => $q->filterMethod((int) $request->method))
            ->when($request->ingredients, function ($q) use ($request) {
                $ids = array_filter(array_map('intval', explode(',', $request->ingredients)));
                if (!empty($ids)) {
                    $q->filterByAvailableIngredients($ids);
                }
            });

        $recipes = $query->with([
            'mealTypes',
            'cookingTimes',
            'textures',
            'equipments',
            'methods',
            'cookingDuration',
        ])->get();

        // Format response ringkas untuk list
        $data = $recipes->map(fn ($r) => $this->formatRecipeCard($r, $lang));

        return response()->json([
            'status' => 'success',
            'total'  => $data->count(),
            'data'   => $data,
        ]);
    }

    // ─── GET /recipes/{id} ───────────────────────────────────────────────────
    // Detail lengkap resep: instruksi, bahan per komponen + substitusi, info waktu.
    public function show(Request $request, int $id)
    {
        $lang = $request->input('lang', 'id');

        $recipe = Recipe::with([
            'mealTypes',
            'cookingTimes',
            'textures',
            'equipments',
            'methods',
            'cookingDuration',
            // load komponen beserta ingredient + alias + substitusi
            'components.ingredients.aliases',
            'components.ingredients.substitutes',
        ])->find($id);

        if (! $recipe) {
            return response()->json(['status' => 'error', 'message' => 'Recipe not found'], 404);
        }

        return response()->json([
            'status' => 'success',
            'data'   => $this->formatRecipeDetail($recipe, $lang),
        ]);
    }

    // ─── GET /filter-options ─────────────────────────────────────────────────
    // Semua opsi dropdown untuk filter UI.
    public function filterOptions()
    {
        return response()->json([
            'status' => 'success',
            'data'   => [
                'meal_types'    => MealType::all(),
                'cooking_times' => CookingTime::all(),
                'textures'      => Texture::all(),
                'equipments'    => Equipment::all(),
                'methods'       => Method::all(),
            ],
        ]);
    }

    // ─── GET /ingredients/search ─────────────────────────────────────────────
    // Cari ingredient berdasarkan nama (canonical atau alias, semua bahasa).
    // Berguna untuk fitur "pilih bahan yang kamu punya".
    public function searchIngredients(Request $request)
    {
        $q = $request->input('q', '');
        $lang = $request->input('lang', 'id');

        if (strlen($q) < 2) {
            return response()->json(['status' => 'success', 'data' => []]);
        }

        $kw = '%' . strtolower($q) . '%';

        $ingredients = Ingredient::with('aliases')
            ->where(function ($query) use ($kw) {
                $query->whereRaw('LOWER(canonical_name) LIKE ?', [$kw])
                      ->orWhereHas('aliases', fn ($a) =>
                          $a->whereRaw('LOWER(alias_name) LIKE ?', [$kw])
                      );
            })
            ->get()
            ->map(fn ($i) => [
                'id'             => $i->id,
                'canonical_name' => $i->canonical_name,
                'display_name'   => $this->getDisplayName($i, $lang),
                'aliases'        => $i->aliases->map(fn ($a) => [
                    'name'     => $a->alias_name,
                    'language' => $a->language,
                ]),
            ]);

        return response()->json(['status' => 'success', 'data' => $ingredients]);
    }

    // ─── GET /ingredients/{id}/substitutions ─────────────────────────────────
    // Ambil substitusi untuk satu bahan.
    public function ingredientSubstitutions(Request $request, int $id)
    {
        $lang = $request->input('lang', 'id');

        $ingredient = Ingredient::with(['substitutes.aliases', 'aliases'])->find($id);

        if (! $ingredient) {
            return response()->json(['status' => 'error', 'message' => 'Ingredient not found'], 404);
        }

        $substitutes = $ingredient->substitutes->map(fn ($s) => [
            'id'                 => $s->id,
            'canonical_name'     => $s->canonical_name,
            'display_name'       => $this->getDisplayName($s, $lang),
            'substitution_ratio' => $s->pivot->substitution_ratio,
            'note'               => $s->pivot->note,
        ]);

        return response()->json([
            'status' => 'success',
            'data'   => [
                'ingredient' => [
                    'id'           => $ingredient->id,
                    'canonical_name' => $ingredient->canonical_name,
                    'display_name' => $this->getDisplayName($ingredient, $lang),
                ],
                'substitutes' => $substitutes,
            ],
        ]);
    }

    // ─── PRIVATE HELPERS ─────────────────────────────────────────────────────

    /**
     * Format ringkas untuk card di halaman list.
     */
    private function formatRecipeCard(Recipe $recipe, string $lang): array
    {
        return [
            'id'            => $recipe->id,
            'name'          => $recipe->name,
            'image_url'     => $recipe->image_url,
            'allergen_notes' => $recipe->allergen_notes,
            'meal_types'    => $recipe->mealTypes->pluck('name'),
            'cooking_times' => $recipe->cookingTimes->pluck('name'),
            'textures'      => $recipe->textures->pluck('name'),
            'equipments'    => $recipe->equipments->pluck('name'),
            'methods'       => $recipe->methods->pluck('name'),
            'duration'      => $recipe->cookingDuration ? [
                'prep_minutes'  => $recipe->cookingDuration->prep_minutes,
                'cook_minutes'  => $recipe->cookingDuration->cook_minutes,
                'total_minutes' => $recipe->cookingDuration->total_minutes,
                'servings'      => $recipe->cookingDuration->servings,
            ] : null,
        ];
    }

    /**
     * Format lengkap untuk halaman detail (saat gambar ditekan).
     */
    private function formatRecipeDetail(Recipe $recipe, string $lang): array
    {
        return [
            'id'             => $recipe->id,
            'name'           => $recipe->name,
            'image_url'      => $recipe->image_url,
            'allergen_notes' => $recipe->allergen_notes,
            'instructions'   => $recipe->instructions ?? [],
            'meal_types'     => $recipe->mealTypes->pluck('name'),
            'cooking_times'  => $recipe->cookingTimes->pluck('name'),
            'textures'       => $recipe->textures->pluck('name'),
            'equipments'     => $recipe->equipments->pluck('name'),
            'methods'        => $recipe->methods->pluck('name'),
            'duration'       => $recipe->cookingDuration ? [
                'prep_minutes'  => $recipe->cookingDuration->prep_minutes,
                'cook_minutes'  => $recipe->cookingDuration->cook_minutes,
                'total_minutes' => $recipe->cookingDuration->total_minutes,
                'servings'      => $recipe->cookingDuration->servings,
            ] : null,
            // Bahan dikelompokkan per komponen (Bumbu Halus, Bahan Utama, dll.)
            'components' => $recipe->components->map(fn ($component) => [
                'id'   => $component->id,
                'name' => $component->name,
                'ingredients' => $component->ingredients->map(fn ($ing) => [
                    'id'             => $ing->id,
                    'canonical_name' => $ing->canonical_name,
                    // Nama tampil sesuai bahasa (alias 'id' = Indonesia)
                    'display_name'   => $this->getDisplayName($ing, $lang),
                    'quantity'       => $ing->pivot->quantity,
                    // Daftar substitusi (sudah di-eager load)
                    'substitutes'    => $ing->substitutes->map(fn ($s) => [
                        'id'                 => $s->id,
                        'canonical_name'     => $s->canonical_name,
                        'display_name'       => $this->getDisplayName($s, $lang),
                        'substitution_ratio' => $s->pivot->substitution_ratio,
                        'note'               => $s->pivot->note,
                    ]),
                ]),
            ]),
        ];
    }

    /**
     * Ambil nama tampil ingredient dalam bahasa tertentu.
     * Fallback ke canonical_name jika alias tidak ada.
     */
    private function getDisplayName(Ingredient $ingredient, string $lang): string
    {
        $alias = $ingredient->aliases->firstWhere('language', $lang);
        return $alias ? $alias->alias_name : $ingredient->canonical_name;
    }
}
