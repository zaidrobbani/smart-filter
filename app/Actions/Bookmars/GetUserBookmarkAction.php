<?php

namespace App\Actions\Bookmarks;

use App\Models\Bookmark;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;

class GetUserBookmarkAction
{
    public function execute(): Collection
    {
        return Bookmark::where('user_id', Auth::id())
            ->with('recipe')
            ->orderByDesc('saved_at')
            ->get();
    }
}