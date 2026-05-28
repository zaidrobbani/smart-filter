<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property-read Ingredient|null $ingredient
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|IngredientAlias newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|IngredientAlias newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|IngredientAlias query()
 *
 * @mixin \Eloquent
 */
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
