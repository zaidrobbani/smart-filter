<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
