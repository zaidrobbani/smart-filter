<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * @property-read Collection<int, IngredientAlias> $aliases
 * @property-read int|null $aliases_count
 * @property-read Component|null $component
 * @property-read Ingredient|null $ingredient
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ComponentIngredient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ComponentIngredient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ComponentIngredient query()
 *
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
