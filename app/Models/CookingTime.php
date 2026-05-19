<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CookingTime extends Model
{
    public $timestamps = false;
    protected $table = 'cooking_times';
    protected $fillable = ['name'];

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_cooking_times', 'cooking_time_id', 'recipe_id');
    }
}
