<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\AuthController;

// AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// PROTECTED ROUTES  
Route::middleware('auth:sanctum')->group(function () {  // semua route di dalam group ini butuh autentikasi dengan Sanctum

    Route::post('/bookmarks', [BookmarkController::class, 'store']);    //  menambahkan resep ke bookmark
    Route::get('/bookmarks', [BookmarkController::class, 'index']);    //   nampilin bookmark milik si user
    Route::delete('/bookmarks/{recipe_id}', [BookmarkController::class, 'destroy']); // menghapus bookmark user berdasarkan id resep
    Route::post('/logout', [AuthController::class, 'logout']);  // logout user (hapus token)
});

Route::middleware('auth:sanctum')->get('/test-auth', function () {
    return response()->json([
        'message' => 'AUTHORIZED',
        'user' => auth()->user()
    ]);
});