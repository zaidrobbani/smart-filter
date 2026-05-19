<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Recipe> $recipes
 * @property-read int|null $recipes_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Method newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Method newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Method query()
 * @mixin \Eloquent
 */
class Method extends Model
{
    public $timestamps = false;
    protected $table = 'methods';
    protected $fillable = ['name'];

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_methods', 'method_id', 'recipe_id');
    }
}
