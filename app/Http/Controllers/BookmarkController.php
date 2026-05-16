<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    public function store(Request $request)
    {
        // cek apakah recipe sudah dibookmark user
        $existingBookmark = Bookmark::where('user_id', auth()->id())
            ->where('recipe_id', $request->recipe_id)
            ->first();

        if ($existingBookmark) {
            return response()->json([
                'message' => 'Recipe already bookmarked'
            ], 409);
        }

        // simpan bookmark baru
        $bookmark = Bookmark::create([
            'user_id' => auth()->id(),

            'recipe_id' => $request->recipe_id,
            'saved_at' => now()
        ]);

        return response()->json([
            'message' => 'Bookmark added',
            'data' => $bookmark
        ]);
    }

    public function index() //nampilin semua bookmark user
    {
        $bookmarks = Bookmark::where('user_id', auth()->id())->get();

        return response()->json([
            'data' => $bookmarks
        ]);
    }

    public function destroy($recipe_id)
    {
        $bookmark = Bookmark::where('user_id', auth()->id())
            ->where('recipe_id', $recipe_id)
            ->first();

        if (!$bookmark) {
            return response()->json([
                'message' => 'Bookmark not found'
            ], 404);
        }

        Bookmark::where('user_id', auth()->id())
            ->where('recipe_id', $recipe_id)
            ->delete();

        return response()->json([
            'message' => 'Bookmark deleted'
        ]);
    }
}
