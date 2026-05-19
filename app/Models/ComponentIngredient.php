<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\IngredientAlias> $aliases
 * @property-read int|null $aliases_count
 * @property-read \App\Models\Component|null $component
 * @property-read \App\Models\Ingredient|null $ingredient
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ComponentIngredient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ComponentIngredient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ComponentIngredient query()
 * @mixin \Eloquent
 */
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
