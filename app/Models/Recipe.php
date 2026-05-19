<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    // Tabel tidak punya created_at/updated_at standar
    public $timestamps = false;

    protected $table = 'recipes';

    protected $fillable = [
        'name',
        'instructions',
        'allergen_notes',
        'image_url',
    ];

    // instructions tersimpan sebagai JSON string di DB
    protected $casts = [
        'instructions' => 'array',
    ];

    // ─── RELASI PIVOT (many-to-many) ────────────────────────────────────────

    public function mealTypes()
    {
        return $this->belongsToMany(MealType::class, 'recipe_meal_types', 'recipe_id', 'meal_type_id');
    }

    public function cookingTimes()
    {
        return $this->belongsToMany(CookingTime::class, 'recipe_cooking_times', 'recipe_id', 'cooking_time_id');
    }

    public function textures()
    {
        return $this->belongsToMany(Texture::class, 'recipe_textures', 'recipe_id', 'texture_id');
    }

    public function equipments()
    {
        return $this->belongsToMany(Equipment::class, 'recipe_equipments', 'recipe_id', 'equipment_id');
    }

    public function methods()
    {
        return $this->belongsToMany(Method::class, 'recipe_methods', 'recipe_id', 'method_id');
    }

    // ─── RELASI HIERARKI BAHAN ──────────────────────────────────────────────
    // recipes → components → component_ingredients → ingredients

    public function components()
    {
        return $this->hasMany(Component::class, 'recipe_id');
    }

    // Shortcut: semua ingredients melalui components
    public function ingredients()
    {
        return $this->hasManyThrough(
            ComponentIngredient::class,
            Component::class,
            'recipe_id',     // FK di components
            'component_id',  // FK di component_ingredients
        );
    }

    // ─── RELASI LAIN ────────────────────────────────────────────────────────

    public function cookingDuration()
    {
        return $this->hasOne(RecipeCookingDuration::class, 'recipe_id');
    }

    public function bookmarks()
    {
        return $this->hasMany(Bookmark::class, 'recipe_id');
    }

    // ─── SCOPES FILTER ──────────────────────────────────────────────────────

    /**
     * Cari resep berdasarkan nama atau nama bahan (canonical/alias).
     * Support multi-keyword dipisah koma/titik koma.
     */
    public function scopeSearch($query, string $input)
    {
        $keywords = preg_split('/[,;]/', $input);
        $keywords = array_filter(array_map('trim', $keywords));

        return $query->where(function ($q) use ($keywords) {
            foreach ($keywords as $keyword) {
                $kw = '%' . strtolower($keyword) . '%';
                $q->orWhere(function ($q2) use ($kw) {
                    // cari di nama resep
                    $q2->whereRaw('LOWER(recipes.name) LIKE ?', [$kw])
                        // cari di canonical_name ingredient
                        ->orWhereHas('components.ingredients', fn ($i) =>
                            $i->whereRaw('LOWER(ingredients.canonical_name) LIKE ?', [$kw])
                        )
                        // cari di alias (termasuk bahasa Indonesia)
                        ->orWhereHas('components.ingredients.aliases', fn ($a) =>
                            $a->whereRaw('LOWER(ingredient_aliases.alias_name) LIKE ?', [$kw])
                        );
                });
            }
        });
    }

    public function scopeFilterMealType($query, int $id)
    {
        return $query->whereHas('mealTypes', fn ($q) => $q->where('meal_types.id', $id));
    }

    public function scopeFilterCookingTime($query, int $id)
    {
        return $query->whereHas('cookingTimes', fn ($q) => $q->where('cooking_times.id', $id));
    }

    public function scopeFilterTexture($query, int $id)
    {
        return $query->whereHas('textures', fn ($q) => $q->where('textures.id', $id));
    }

    public function scopeFilterEquipment($query, int $id)
    {
        return $query->whereHas('equipments', fn ($q) => $q->where('equipments.id', $id));
    }

    public function scopeFilterMethod($query, int $id)
    {
        return $query->whereHas('methods', fn ($q) => $q->where('methods.id', $id));
    }

    /**
     * Filter resep yang SEMUA ingredient-nya tersedia dari daftar ingredient_id user.
     * Resep lolos jika setiap ingredient-nya ada di daftar, ATAU ada substitusinya
     * yang juga ada di daftar.
     */
    public function scopeFilterByAvailableIngredients($query, array $availableIngredientIds)
    {
        if (empty($availableIngredientIds)) {
            return $query;
        }

        // Ambil semua substitute yang tersedia (ingredient A bisa diganti B yang ada)
        $substitutableIds = \DB::table('ingredient_substitutions')
            ->whereIn('substitute_id', $availableIngredientIds)
            ->pluck('ingredient_id')
            ->toArray();

        $allCoveredIds = array_unique(array_merge($availableIngredientIds, $substitutableIds));

        // Resep lolos hanya jika TIDAK ada ingredient-nya yang di luar daftar covered
        return $query->whereDoesntHave('components', function ($q) use ($allCoveredIds) {
            $q->whereHas('ingredientPivots', function ($q2) use ($allCoveredIds) {
                $q2->whereNotIn('ingredient_id', $allCoveredIds);
            });
        });
    }
}
