<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property array<array-key, mixed> $instructions
 * @property string|null $allergen_notes
 * @property string|null $image_url
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RecipeHistory> $histories
 * @property-read int|null $histories_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereAllergenNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereInstructions($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Recipe extends Model
{
    protected $fillable = [
        'name',
        'description',
        'instructions',
        'allergen_notes',
        'image_url',
    ];

    protected $casts = [
        'instructions' => 'array', // ← supaya otomatis decode JSON
    ];

    public function histories()
    {
        return $this->hasMany(RecipeHistory::class);
    }
}