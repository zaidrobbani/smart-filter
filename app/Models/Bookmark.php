<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    protected $table = 'bookmarks';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'recipe_id',
        'saved_at'
    ];
}