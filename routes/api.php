<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookmarkController;

Route::post('/bookmarks', [BookmarkController::class, 'store']); //menambahkan resep ke bookmark
Route::get('/bookmarks', [BookmarkController::class, 'index']); //nampilin semua bookmark milik user
Route::delete('/bookmarks/{recipe_id}', [BookmarkController::class, 'destroy']); //hapus bookmark milikan user berdasarkan id resep