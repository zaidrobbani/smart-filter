<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\Settings\ProfileController as SettingsProfileController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// Homepage
Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// Design-system
Route::inertia('/design-system', 'design-system')->name('design-system');

// Auth
// Auth
Route::get('/login', [AuthController::class, 'showLogin'])
    ->name('login');

Route::post('/login', [AuthController::class, 'login'])
    ->name('login.store');

Route::get('/register', [AuthController::class, 'showRegister'])
    ->name('register');

Route::post('/register', [AuthController::class, 'register'])
    ->name('register.store');

// Recipes
// routes/web.php
Route::get('/recipes', [RecipeController::class, 'index'])->name('recipes.index');
Route::get('/recipes/{id}', [RecipeController::class, 'show'])->name('recipes.show');

// Bookmarks (Public)

// Profile

// History
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [SettingsProfileController::class, 'show'])->name('profile.show');
    Route::get('/settings/profile', [SettingsProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/settings/profile', [SettingsProfileController::class, 'update'])->name('profile.update');
    Route::get('/bookmarks', [BookmarkController::class, 'index'])->name('bookmarks.index');
    Route::post('/bookmarks', [BookmarkController::class, 'store'])->name('bookmarks.store');
    Route::delete('/bookmarks/{recipe_id}', [BookmarkController::class, 'destroy'])->name('bookmarks.destroy');
    Route::get('/history', [HistoryController::class, 'index'])
        ->name('history.index');
    Route::delete('/history/{id}', [HistoryController::class, 'destroy'])
        ->name('history.destroy');
    Route::delete('/history/clear', [HistoryController::class, 'clear'])
        ->name('history.clear');
});

// Dashboard (team-based)
Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::inertia('dashboard', 'dashboard')->name('dashboard');
    });

// require __DIR__.'/settings.php';
