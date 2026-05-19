<?php

namespace App\Actions\History;

use App\Models\RecipeVisit;
use Illuminate\Support\Facades\Auth;

class RecordVisitAction
{
    public function execute(int $recipeId): void
    {
        if (!Auth::check()) return; // skip kalau belum login

        // Hindari duplikat dalam 1 jam terakhir
        $recentVisit = RecipeVisit::where('user_id', Auth::id())
            ->where('recipe_id', $recipeId)
            ->where('visited_at', '>=', now()->subHour())
            ->first();

        if (!$recentVisit) {
            RecipeVisit::create([
                'user_id'    => Auth::id(),
                'recipe_id'  => $recipeId,
                'visited_at' => now(),
            ]);
        }
    }
}