<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\RecipeHistory;

class HistoryController extends Controller
{
    public function index()
    {
        $histories = RecipeHistory::where('user_id', Auth::id())
            ->latest('viewed_at')
            ->get();

        return Inertia::render('History/index', [
            'histories' => $histories,
        ]);
    }

    public function clear()
    {
        RecipeHistory::where('user_id', Auth::id())->delete();

        return redirect()->back();
    }
}