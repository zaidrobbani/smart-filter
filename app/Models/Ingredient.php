<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\IngredientAlias> $aliases
 * @property-read int|null $aliases_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Ingredient> $substitutedBy
 * @property-read int|null $substituted_by_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Ingredient> $substitutes
 * @property-read int|null $substitutes_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient query()
 * @mixin \Eloquent
 */
class Ingredient extends Model
{
    public $timestamps = false;

    protected $table = 'ingredients';

    protected $fillable = ['canonical_name'];

    // ─── RELASI ─────────────────────────────────────────────────────────────

    public function aliases()
    {
        return $this->hasMany(IngredientAlias::class, 'ingredient_id');
    }

    /**
     * Bahan pengganti yang bisa digunakan untuk bahan ini.
     * ingredient_substitutions: ingredient_id → substitute_id
     */
    public function substitutes()
    {
        return $this->belongsToMany(
            Ingredient::class,
            'ingredient_substitutions',
            'ingredient_id',
            'substitute_id'
        )->withPivot('substitution_ratio', 'note');
    }

    /**
     * Bahan yang bisa digantikan oleh bahan ini.
     */
    public function substitutedBy()
    {
        return $this->belongsToMany(
            Ingredient::class,
            'ingredient_substitutions',
            'substitute_id',
            'ingredient_id'
        )->withPivot('substitution_ratio', 'note');
    }

    // Nama dalam bahasa tertentu (misal 'id' untuk Indonesia)
    public function aliasesByLang(string $lang)
    {
        return $this->aliases()->where('language', $lang);
    }
}
