<?php

namespace App\Actions\History;

use App\Models\RecipeVisit;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

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
