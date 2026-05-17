<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\AuthController;

// AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// FORGOT PASSWORD
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);


// GOOGLE AUTH
Route::get('/auth/google/redirect', [AuthController::class, 'googleRedirect']);
Route::get('/auth/google/callback', [AuthController::class, 'googleCallback']);


// PROTECTED ROUTES
Route::middleware('auth:sanctum')->group(function () { 

    // BOOKMARK
    Route::post('/bookmarks', [BookmarkController::class, 'store']);
    Route::get('/bookmarks', [BookmarkController::class, 'index']);
    Route::delete('/bookmarks/{recipe_id}', [BookmarkController::class, 'destroy']);

    // LOGOUT
    Route::post('/logout', [AuthController::class, 'logout']);
});


// TEST AUTH
Route::middleware('auth:sanctum')->get('/test-auth', function () {

    return response()->json([
        'message' => 'AUTHORIZED',
        'user' => auth()->user()
    ]);
});