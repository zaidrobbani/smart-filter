<?php

namespace App\Actions\Bookmarks;

use App\Models\Bookmark;
use Illuminate\Support\Facades\Auth;

class DeleteBookmarkAction
{
    public function execute(int $recipeId): array
    {
        $bookmark = Bookmark::where('user_id', Auth::id())
            ->where('recipe_id', $recipeId)
            ->first();

        if (!$bookmark) {
            return ['status' => 'not_found', 'message' => 'Bookmark not found'];
        }

        $bookmark->delete();

        return ['status' => 'deleted'];
    }
}