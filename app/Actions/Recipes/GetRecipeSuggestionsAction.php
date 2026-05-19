<?php

namespace App\Actions\Recipes;

use App\Models\Recipe;

class GetRecipeSuggestionsAction
{
    /**
     * Get recipe suggestions for autocomplete/dropdown
     */
    public function handle(string $search = '', int $limit = 8): array
    {
        if (! $search || strlen($search) < 2) {
            return [];
        }

        $recipes = Recipe::query()
            ->where('name', 'like', "%{$search}%")
            ->orWhere('allergen_notes', 'like', "%{$search}%")
            ->orWhere('instructions', 'like', "%{$search}%")
            ->limit($limit)
            ->select('id', 'name', 'image_url', 'allergen_notes')
            ->get()
            ->map(fn (Recipe $recipe) => [
                'id' => $recipe->id,
                'title' => $recipe->name,
                'description' => $recipe->allergen_notes ?? 'A delicious recipe from our collection.',
                'image' => $recipe->image_url ?? 'https://via.placeholder.com/60x60?text=Recipe',
            ])
            ->toArray();

        return $recipes;
    }
}
