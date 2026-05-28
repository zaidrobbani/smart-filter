<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property int $recipe_id
 * @property CarbonImmutable|null $viewed_at
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 * @property-read Recipe $recipe
 * @property-read User $user
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory whereRecipeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory whereViewedAt($value)
 *
 * @mixin \Eloquent
 */
class RecipeHistory extends Model
{
    protected $fillable = [
        'user_id',
        'recipe_id',
        'viewed_at',
    ];

    protected $casts = [
        'viewed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}
