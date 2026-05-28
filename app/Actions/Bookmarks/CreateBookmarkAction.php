<?php

namespace App\Actions\Bookmarks;

use App\Models\Bookmark;
use Illuminate\Support\Facades\Auth;

class CreateBookmarkAction
{
    public function execute(int $recipeId): array
    {
        $existing = Bookmark::where('user_id', Auth::id())
            ->where('recipe_id', $recipeId)
            ->first();

        if ($existing) {
            return ['status' => 'conflict', 'message' => 'Recipe already bookmarked'];
        }

        $bookmark = Bookmark::create([
            'user_id' => Auth::id(),
            'recipe_id' => $recipeId,
            'saved_at' => now(),
        ]);

        return ['status' => 'created', 'data' => $bookmark];
    }
}
