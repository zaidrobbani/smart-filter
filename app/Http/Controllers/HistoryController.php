<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\RecipeHistory;
use Illuminate\Http\Request;
use Carbon\Carbon;

class HistoryController extends Controller
{
    public function index(Request $request)
    {
        $query = RecipeHistory::where('user_id', Auth::id())
            ->with('recipe')
            ->latest('viewed_at');

        // Search by recipe name
        if ($request->get('search')) {
            $search = $request->get('search');
            $query->whereHas('recipe', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            });
        }

        // Filter by date range
        if ($request->get('from_date')) {
            $fromDate = Carbon::parse($request->get('from_date'))->startOfDay();
            $query->where('viewed_at', '>=', $fromDate);
        }

        if ($request->get('to_date')) {
            $toDate = Carbon::parse($request->get('to_date'))->endOfDay();
            $query->where('viewed_at', '<=', $toDate);
        }

        $histories = $query->get();

        // Format histories with recipe data
        $formattedHistories = $histories->map(function ($history) {
            return [
                'id' => $history->id,
                'user_id' => $history->user_id,
                'recipe_id' => $history->recipe_id,
                'viewed_at' => $history->viewed_at,
                'recipe' => $history->recipe ? [
                    'id' => $history->recipe->id,
                    'title' => $history->recipe->title,
                    'image' => $history->recipe->image_url ?? null,
                ] : null,
            ];
        })->toArray();

        return Inertia::render('history/index', [
            'histories' => $formattedHistories,
        ]);
    }

    public function destroy(int $id)
    {
        $history = RecipeHistory::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $history->delete();

        return response()->json(['message' => 'History deleted successfully'], 200);
    }

    public function record(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required|integer|exists:recipes,id',
        ]);

        $action = app(\App\Actions\History\RecordVisitAction::class);
        $action->execute($request->input('recipe_id'));

        return response()->json(['message' => 'History recorded'], 201);
    }

    public function clear()
    {
        RecipeHistory::where('user_id', Auth::id())->delete();

        return redirect()->back();
    }
}