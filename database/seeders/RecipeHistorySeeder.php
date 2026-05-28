<?php

namespace Database\Seeders;

use App\Models\Recipe;
use App\Models\RecipeHistory;
use App\Models\User;
use Illuminate\Database\Seeder;

class RecipeHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();
        $recipes = Recipe::limit(5)->get();

        if (! $user || $recipes->isEmpty()) {
            return;
        }

        foreach ($recipes as $recipe) {
            RecipeHistory::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'recipe_id' => $recipe->id,
                ],
                [
                    'viewed_at' => now()->subDays(rand(0, 7)),
                ]
            );
        }
    }
}
