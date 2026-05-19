<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property-read \App\Models\Recipe|null $recipe
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeCookingDuration newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeCookingDuration newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeCookingDuration query()
 * @mixin \Eloquent
 */
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
