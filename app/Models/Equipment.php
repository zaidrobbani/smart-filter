<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Recipe> $recipes
 * @property-read int|null $recipes_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Equipment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Equipment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Equipment query()
 * @mixin \Eloquent
 */
class Equipment extends Model
{
    public $timestamps = false;
    protected $table = 'equipments';
    protected $fillable = ['name'];

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_equipments', 'equipment_id', 'recipe_id');
    }
}
