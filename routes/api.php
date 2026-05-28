<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookmarkController;
use app\Http\Controllers\HistoryController;
use App\Http\Controllers\RecipeController;
use Illuminate\Support\Facades\Route;

// ─── AUTH (public) ───────────────────────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Google OAuth — aktifkan jika socialite sudah terpasang
// Route::get('/auth/google/redirect', [AuthController::class, 'googleRedirect']);
// Route::get('/auth/google/callback', [AuthController::class, 'googleCallback']);

// ─── RECIPES (public) ────────────────────────────────────────────────────────
//
// GET /recipes
//   ?search=ayam            cari di nama resep / nama bahan (id/en/alias)
//   ?meal_type=1            filter: 1=main 2=snack 3=dessert 4=beverage
//   ?cooking_time=1         filter: 1=fast 2=medium 3=long
//   ?texture=1              filter: 1=dry 2=soupy
//   ?equipment=1            filter: 1=stove 2=airfryer 3=oven 4=blender …
//   ?method=1               filter: 1=cooking 2=baking
//   ?ingredients=13,14,25   filter resep yang bisa dibuat dari bahan ini
//   ?lang=id                bahasa label: id (default) atau en
//
Route::get('/recipes/search/suggestions', [RecipeController::class, 'suggestions']);
Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/recipes/{id}', [RecipeController::class, 'show']);  // detail (saat gambar ditekan)
Route::get('/filter-options', [RecipeController::class, 'filterOptions']);

// Pencarian dan substitusi bahan
Route::get('/ingredients/search', [RecipeController::class, 'searchIngredients']);
Route::get('/ingredients/{id}/substitutions', [RecipeController::class, 'ingredientSubstitutions']);

// ─── PROTECTED ───────────────────────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    // Bookmarks
    Route::get('/bookmarks', [BookmarkController::class, 'index']);
    Route::post('/bookmarks', [BookmarkController::class, 'store']);
    Route::delete('/bookmarks/{recipe_id}', [BookmarkController::class, 'destroy']);

    // History
    Route::post('/history/record', [HistoryController::class, 'record']);
    Route::delete('/history/{id}', [HistoryController::class, 'destroy']);

    // Debug / test token
    Route::get('/test-auth', fn () => response()->json([
        'message' => 'AUTHORIZED',
        'user' => auth('sanctum')->user(),
    ]));
});
