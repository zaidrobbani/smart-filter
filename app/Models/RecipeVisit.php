<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property int $recipe_id
 * @property CarbonImmutable $visited_at
 * @property-read Recipe $recipe
 * @property-read User $user
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeVisit newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeVisit newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeVisit query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeVisit whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeVisit whereRecipeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeVisit whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecipeVisit whereVisitedAt($value)
 *
 * @mixin \Eloquent
 */
class RecipeVisit extends Model
{
    public $timestamps = false;

    protected $fillable = ['user_id', 'recipe_id', 'visited_at'];

    protected $casts = [
        'visited_at' => 'datetime',
    ];

    public function recipe(): BelongsTo
    {
        return $this->belongsTo(Recipe::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
