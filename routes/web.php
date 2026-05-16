<?php

use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\BookmarkController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::inertia('dashboard', 'dashboard')->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
});

Route::get('/recipes', [RecipeController::class, 'index']);       //nampilin semua resep
Route::get('/recipes/{id}', [RecipeController::class, 'show']);  //nampilin detail resep berdasarkan id
Route::post('/bookmarks', [BookmarkController::class, 'store']); //menambahkan resep ke bookmark

require __DIR__.'/settings.php';
