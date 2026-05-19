<?php

use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\Settings\ProfileController as SettingsProfileController;

// Homepage
Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// Design-system
Route::inertia('/design-system', 'design-system')->name('design-system');

// Auth
Route::inertia('/login', 'auth/login')->name('login');
Route::inertia('/register', 'auth/register')->name('register');

// Recipes
// routes/web.php
Route::get('/recipes', [RecipeController::class, 'index']) ->name('recipes.index'); 
Route::get('/recipes/{id}', [RecipeController::class, 'show']) ->name('recipes.show');

// Bookmarks (Public)
Route::get('/bookmarks', [BookmarkController::class, 'index'])->name('bookmarks.index')->withoutMiddleware('auth');
Route::post('/bookmarks', [BookmarkController::class, 'store'])->name('bookmarks.store')->withoutMiddleware('auth');
Route::delete('/bookmarks/{recipe_id}', [BookmarkController::class, 'destroy'])->name('bookmarks.destroy')->withoutMiddleware('auth');

// Profile
Route::get('/profile', [SettingsProfileController::class, 'show'])->name('profile.show');

// History
Route::get('/history', [HistoryController::class, 'index'])->name('history.index')->withoutMiddleware('auth');
Route::middleware('auth')->group(function () {
});

// Dashboard (team-based)
Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::inertia('dashboard', 'dashboard')->name('dashboard');
    });

require __DIR__.'/settings.php';