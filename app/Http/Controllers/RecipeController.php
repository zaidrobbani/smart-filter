<?php

namespace App\Http\Controllers;

use App\Models\Recipe;

class RecipeController extends Controller
{
    public function index()      //nampilin semua resep
    {
        $recipes = Recipe::all();

        return response()->json($recipes);
    }

    public function show($id)   //nampilin detail resep berdasarkan id
    {
        $recipe = Recipe::find($id);

        if (!$recipe) {
            return response()->json([
                'message' => 'Recipe not found'
            ], 404);
        }

        return response()->json($recipe);
    }
}
