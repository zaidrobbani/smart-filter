<?php

namespace App\Actions\Recipes;

use App\Models\Recipe;

class RecipePresenter
{
    /**
     * Transform Recipe model to frontend format
     */
    public static function present(Recipe $recipe): array
    {
        return [
            'id' => (string) $recipe->id,
            'title' => $recipe->name,
            'description' => $recipe->allergen_notes ?? 'A delicious recipe from our collection.',
            'image' => $recipe->image_url ?? 'https://via.placeholder.com/400x300?text=Recipe',
            'cookingTime' => 30, // Default, bisa custom nanti
            'tags' => ['VEGETARIAN'], // Default, bisa extend nanti
            'label' => 'FEATURED',
            'price' => '$$',
            'difficulty' => 'MEDIUM',
            'smartSubstitutions' => [
                'title' => 'Smart Substitutions',
                'description' => 'Resourceful cooking means using what you have.',
                'suggestions' => [],
            ],
            'ingredients' => [], // Bisa populate dari table terpisah nanti
            'instructions' => is_array($recipe->instructions) ? $recipe->instructions : [],
            'nutritionFacts' => [
                'calories' => mt_rand(100, 800),
                'protein' => mt_rand(5, 50).'g',
                'fat' => mt_rand(5, 50).'g',
                'carbs' => mt_rand(10, 100).'g',
                'fiber' => mt_rand(1, 15).'g',
            ],
        ];
    }

    /**
     * Transform collection of recipes
     */
    public static function presentMany(iterable $recipes): array
    {
        $presented = [];
        foreach ($recipes as $recipe) {
            $presented[] = self::present($recipe);
        }

        return $presented;
    }
}
