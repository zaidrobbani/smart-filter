<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecipeCookingDuration extends Model
{
    public $timestamps = false;
    // PK bukan auto-increment; sama dengan recipe_id
    public $incrementing = false;
    protected $primaryKey = 'recipe_id';

    protected $table = 'recipe_cooking_duration';

    protected $fillable = [
        'recipe_id',
        'prep_minutes',
        'cook_minutes',
        'total_minutes',
        'servings',
    ];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class, 'recipe_id');
    }
}
