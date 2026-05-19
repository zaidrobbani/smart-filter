<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $fillable = [
        'name',
        'description',
        'instructions',
        'allergen_notes',
        'image_url',
    ];

    protected $casts = [
        'instructions' => 'array', // ← supaya otomatis decode JSON
    ];

    public function histories()
    {
        return $this->hasMany(RecipeHistory::class);
    }
}