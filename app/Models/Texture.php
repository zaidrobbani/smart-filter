<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * @property-read Collection<int, Recipe> $recipes
 * @property-read int|null $recipes_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Texture newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Texture newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Texture query()
 *
 * @mixin \Eloquent
 */
class Texture extends Model
{
    public $timestamps = false;

    protected $table = 'textures';

    protected $fillable = ['name'];

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_textures', 'texture_id', 'recipe_id');
    }
}
