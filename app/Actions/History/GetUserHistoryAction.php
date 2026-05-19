<?php

namespace App\Actions\History;

use App\Models\RecipeVisit;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;

class GetUserHistoryAction
{
    public function execute(): Collection
    {
        return RecipeVisit::where('user_id', Auth::id())
            ->with('recipe')
            ->orderByDesc('visited_at')
            ->get();
    }
}