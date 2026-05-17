<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IngredientAlias extends Model
{
    public $timestamps = false;

    protected $table = 'ingredient_aliases';

    protected $fillable = ['ingredient_id', 'alias_name', 'language'];

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class, 'ingredient_id');
    }
}
