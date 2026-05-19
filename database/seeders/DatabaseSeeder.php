<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\RecipeSeeder;
use Database\Seeders\UserSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            RecipeSeeder::class,
        ]);
    }
}