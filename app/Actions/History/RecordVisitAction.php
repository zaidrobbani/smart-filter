<?php

namespace App\Actions\History;

use App\Models\RecipeHistory;
use Illuminate\Support\Facades\Auth;

class RecordVisitAction
{
    public function execute(int $recipeId): void
    {
        if (!Auth::check()) return; // skip kalau belum login

        // Update atau create - jika sudah ada, hanya update viewed_at
        RecipeHistory::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'recipe_id' => $recipeId,
            ],
            [
                'viewed_at' => now(),
            ]
        );
    }
}