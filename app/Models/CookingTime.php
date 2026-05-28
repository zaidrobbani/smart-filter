<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * @property-read Collection<int, Recipe> $recipes
 * @property-read int|null $recipes_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CookingTime newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CookingTime newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CookingTime query()
 *
 * @mixin \Eloquent
 */
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
