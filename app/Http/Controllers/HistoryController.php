<?php

namespace App\Http\Controllers;

use App\Actions\History\RecordVisitAction;
use App\Models\RecipeHistory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index(Request $request)
    {
        $query = RecipeHistory::where('user_id', Auth::id())
            ->with('recipe')
            ->latest('viewed_at');

        if ($request->get('search')) {
            $search = $request->get('search');
            $query->whereHas('recipe', function ($q) use ($search) {
                // kolom di tabel recipes adalah 'name', bukan 'title'
                $q->where('name', 'like', "%{$search}%");
            });
        }

        if ($request->get('from_date')) {
            $query->where('viewed_at', '>=', Carbon::parse($request->get('from_date'))->startOfDay());
        }

        if ($request->get('to_date')) {
            $query->where('viewed_at', '<=', Carbon::parse($request->get('to_date'))->endOfDay());
        }

        $histories = $query->get();

        $formattedHistories = $histories->map(function ($history) {
            return [
                'id' => $history->id,
                'user_id' => $history->user_id,
                'recipe_id' => $history->recipe_id,
                'viewed_at' => $history->viewed_at,
                'recipe' => $history->recipe ? [
                    'id' => $history->recipe->id,
                    'title' => $history->recipe->name, // pakai 'name'
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
        RecipeHistory::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail()
            ->delete();

        return response()->json(['message' => 'History deleted successfully'], 200);
    }

    public function record(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required|integer|exists:recipes,id',
        ]);

        app(RecordVisitAction::class)->execute((int) $request->input('recipe_id'));

        return response()->json(['message' => 'History recorded'], 201);
    }

    public function clear()
    {
        RecipeHistory::where('user_id', Auth::id())->delete();

        return redirect()->back();
    }
}
