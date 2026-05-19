'use client';

import { recipeData } from '@/data/recipe-data';
import { RecipeCard } from '@/feature/Recipes/component/RecipesCard';
import MainLayout from '@/layout/MainLayout';

export default function RecipeCardGrid() {
    return (
        <MainLayout>
            <div className="space-y-8 p-25">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                        36 Recipes for You
                    </h1>
                    <p className="text-base text-muted-foreground sm:text-lg">
                        Using Tomato, Eggs, and Garlic from your pantry.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {recipeData.map((recipe, index) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
