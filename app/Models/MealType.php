<?php
// ─── app/Models/MealType.php ─────────────────────────────────────────────────
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class MealType extends Model
{
    public $timestamps = false;
    protected $table = 'meal_types';
    protected $fillable = ['name'];

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_meal_types', 'meal_type_id', 'recipe_id');
    }
}
