<?php

namespace App\Actions\Recipes;

use App\Models\Recipe;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class GetRecipesAction
{
    public function handle(string $search = '', int $page = 1, int $perPage = 6): Paginator
    {
        $query = Recipe::query();
        $search = trim($search);

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('allergen_notes', 'like', "%{$search}%")
                    ->orWhere('instructions', 'like', "%{$search}%");
            });
        }

        return $query->paginate($perPage, ['*'], 'page', $page)->withQueryString();

    }
}
