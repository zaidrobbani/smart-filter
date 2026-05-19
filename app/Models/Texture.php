<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
