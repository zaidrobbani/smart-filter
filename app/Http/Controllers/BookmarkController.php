<?php

namespace App\Http\Controllers;

use App\Actions\Bookmarks\CreateBookmarkAction;
use App\Actions\Bookmarks\DeleteBookmarkAction;
use App\Actions\Bookmarks\GetUserBookmarkAction;
use App\Actions\Recipes\RecipePresenter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookmarkController extends Controller
{
    public function index(): Response
    {
        $bookmarks = app(GetUserBookmarkAction::class)->execute();

        $recipes = $bookmarks->map(function ($bookmark) {
            return [
                ...RecipePresenter::present($bookmark->recipe),
                'isBookmarked' => true,
            ];
        })->values()->all();

        return Inertia::render('bookmarks/index', [
            'recipes' => $recipes,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'recipe_id' => ['required', 'integer', 'exists:recipes,id'],
        ]);

        $recipeId = (int) $validated['recipe_id'];

        $result = app(CreateBookmarkAction::class)->execute($recipeId);

        if ($result['status'] === 'conflict') {
            return response()->json(['message' => 'Recipe already bookmarked'], 409);
        }

        return response()->json($result, 201);
    }

    public function destroy(int $recipe_id): JsonResponse
    {
        $result = app(DeleteBookmarkAction::class)->execute($recipe_id);

        if ($result['status'] === 'not_found') {
            return response()->json(['message' => 'Bookmark not found'], 404);
        }

        return response()->json($result);
    }
}