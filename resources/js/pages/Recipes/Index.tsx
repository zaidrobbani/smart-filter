import { RecipeCard } from '@/components/recipe/RecipeCard';
import { recipeData } from '@/components/recipe/recipe-data';

export default function RecipesIndex() {
  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
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
            <RecipeCard key={recipe.id} recipe={recipe} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
