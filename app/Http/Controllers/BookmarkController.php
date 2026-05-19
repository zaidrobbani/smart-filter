<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class BookmarkController extends Controller
{
    public function index()
    {
        return Inertia::render('bookmarks/index');
    }
}