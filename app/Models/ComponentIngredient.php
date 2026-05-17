<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ComponentIngredient extends Model
{
    public $timestamps = false;

    protected $table = 'component_ingredients';

    // Composite PK — nonaktifkan auto-increment
    public $incrementing = false;

    protected $fillable = ['component_id', 'ingredient_id', 'quantity'];

    // ─── RELASI ─────────────────────────────────────────────────────────────

    public function component()
    {
        return $this->belongsTo(Component::class, 'component_id');
    }

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class, 'ingredient_id');
    }

    // Akses alias ingredient langsung dari pivot
    public function aliases()
    {
        return $this->hasMany(IngredientAlias::class, 'ingredient_id', 'ingredient_id');
    }
}
