<?php

// ─── app/Models/MealType.php ─────────────────────────────────────────────────

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * @property-read Collection<int, Recipe> $recipes
 * @property-read int|null $recipes_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MealType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MealType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MealType query()
 *
 * @mixin \Eloquent
 */
class MealType extends Model
{
    public $timestamps = false;

    protected $table = 'meal_types';

    protected $fillable = ['name'];

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_meal_types', 'meal_type_id', 'recipe_id');
    }
}
