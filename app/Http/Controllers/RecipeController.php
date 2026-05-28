<?php

namespace App\Http\Controllers;

use App\Actions\Recipes\GetRecipesAction;
use App\Actions\Recipes\GetRecipeSuggestionsAction;
use App\Actions\Recipes\RecipePresenter;
use App\Models\Recipe;
use App\Models\RecipeHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RecipeController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search', '');
        $page = $request->query('page', 1);
        $perPage = 6;

        $recipesPage = app(GetRecipesAction::class)->handle($search, $page, $perPage);

        $recipes = RecipePresenter::presentMany($recipesPage->items());

        return Inertia::render('Recipes/index', [
            'recipes' => $recipes,
            'pagination' => [
                'currentPage' => $recipesPage->currentPage(),
                'perPage' => $recipesPage->perPage(),
                'total' => $recipesPage->total(),
                'lastPage' => $recipesPage->lastPage(),
                'hasMore' => $recipesPage->hasMorePages(),
                'nextPageUrl' => $recipesPage->nextPageUrl(),
                'prevPageUrl' => $recipesPage->previousPageUrl(),
            ],
            'search' => $search,
        ]);
    }

    public function show($id): Response
    {
        $recipe = Recipe::findOrFail($id);

        if (Auth::check()) {
            RecipeHistory::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'recipe_id' => $recipe->id,
                ],
                [
                    'viewed_at' => now(),
                ]
            );
        }

        $presentedRecipe = RecipePresenter::present($recipe);

        return Inertia::render('Recipes/show', [
            'recipe' => $presentedRecipe,
        ]);
    }

    public function suggestions(Request $request)
    {
        $search = $request->query('q', '');

        $suggestions = app(GetRecipeSuggestionsAction::class)->handle($search);

        return response()->json([
            'suggestions' => $suggestions,
        ]);
    }
}
