<?php

use Illuminate\Support\Facades\Route;

// Settings routes (team-based)
Route::prefix('{current_team}/settings')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        // Add settings routes here as needed
    });
