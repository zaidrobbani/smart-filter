<?php

namespace App\Actions\Recipes;

use App\Models\Recipe;
use Illuminate\Support\Facades\Schema;

class RecipePresenter
{
    /**
     * Cache hasil Schema::hasTable agar tidak query DB setiap pemanggilan.
     */
    private static ?bool $hasComponentsTable = null;

    private static function hasComponentsTable(): bool
    {
        if (self::$hasComponentsTable === null) {
            self::$hasComponentsTable = Schema::hasTable('components');
        }

        return self::$hasComponentsTable;
    }

    public static function present(Recipe $recipe): array
    {
        $ingredients = [];

        if (self::hasComponentsTable()) {
            $ingredients = $recipe->components
                ->flatMap(function ($component) {
                    return $component->ingredientPivots->map(function ($pivot) {
                        $ingredient = $pivot->ingredient;

                        return [
                            'name'     => $ingredient?->name ?? null,
                            'note'     => null,
                            'quantity' => (string) ($pivot->quantity ?? ''),
                        ];
                    });
                })
                ->filter(fn ($item) => !empty($item['name']))
                ->values()
                ->all();
        }

        // Instructions: sudah di-cast array oleh model, tapi tetap guard
        $instructions = [];
        if (is_array($recipe->instructions)) {
            $raw = $recipe->instructions;
        } elseif (is_string($recipe->instructions)) {
            $decoded = json_decode($recipe->instructions, true);
            $raw = is_array($decoded) ? $decoded : [];
        } else {
            $raw = [];
        }

        // Normalize: pastikan setiap item punya step, title, description
        $instructions = array_values(array_map(function ($item, $index) {
        // Kalau item-nya string langsung (format DB kamu)
        if (is_string($item)) {
            return [
                'step'        => $index + 1,
                'title'       => 'Step ' . ($index + 1),
                'description' => $item,
            ];
        }

        // Kalau item-nya object/array
        return [
            'step'        => $item['step'] ?? ($index + 1),
            'title'       => $item['title'] ?? $item['name'] ?? 'Step ' . ($index + 1),
            'description' => $item['description'] ?? $item['text'] ?? $item['content'] ?? '',
        ];
    }, $raw, array_keys($raw)));

        return [
            'id'          => (string) $recipe->id,
            'title'       => $recipe->name,
            'description' => $recipe->allergen_notes ?? 'A delicious recipe from our collection.',
            'image'       => $recipe->image_url ?? 'https://via.placeholder.com/400x300?text=Recipe',
            'cookingTime' => 30,
            'tags'        => ['VEGETARIAN'],
            'label'       => 'FEATURED',
            'price'       => '$$',
            'difficulty'  => 'MEDIUM',
            'smartSubstitutions' => [
                'title'       => 'Smart Substitutions',
                'description' => 'Resourceful cooking means using what you have.',
                'suggestions' => [],
            ],
            'ingredients'  => $ingredients,
            'instructions' => $instructions,
            'nutritionFacts' => [
                'calories' => mt_rand(100, 800),
                'protein'  => mt_rand(5, 50) . 'g',
                'fat'      => mt_rand(5, 50) . 'g',
                'carbs'    => mt_rand(10, 100) . 'g',
                'fiber'    => mt_rand(1, 15) . 'g',
            ],
        ];
    }

    public static function presentMany(iterable $recipes): array
    {
        $presented = [];
        foreach ($recipes as $recipe) {
            $presented[] = self::present($recipe);
        }

        return $presented;
    }
}