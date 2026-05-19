<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property int $recipe_id
 * @property \Carbon\CarbonImmutable|null $viewed_at
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property-read \App\Models\Recipe $recipe
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory whereRecipeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeHistory whereViewedAt($value)
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