<?php

namespace App\Actions\Recipes;

use App\Models\Recipe;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class GetRecipesAction
{
    public function handle(string $search = '', int $page = 1, int $perPage = 6): Paginator
    {
        $query = Recipe::query();

        if ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('allergen_notes', 'like', "%{$search}%")
                ->orWhere('instructions', 'like', "%{$search}%");
        }

        return $query->paginate($perPage, ['*'], 'page', $page);
    }
}
