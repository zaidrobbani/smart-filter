<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    public $timestamps = false;

    protected $table = 'components';

    protected $fillable = ['recipe_id', 'name'];

    // ─── RELASI ─────────────────────────────────────────────────────────────

    public function recipe()
    {
        return $this->belongsTo(Recipe::class, 'recipe_id');
    }

    /**
     * Pivot rows di component_ingredients (dengan quantity).
     */
    public function ingredientPivots()
    {
        return $this->hasMany(ComponentIngredient::class, 'component_id');
    }

    /**
     * Shortcut ke Ingredient melalui pivot (bawa quantity).
     */
    public function ingredients()
    {
        return $this->belongsToMany(
            Ingredient::class,
            'component_ingredients',
            'component_id',
            'ingredient_id'
        )->withPivot('quantity');
    }
}
