'use client';

import gsap from 'gsap';
import { Heart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Recipe } from '@/data/recipe-data';
import { RecipeCard } from '@/feature/Recipes/component/RecipesCard';

interface BookmarksPageProps {
    recipes: Recipe[];
}

export default function BookmarksPage({
    recipes: initialRecipes,
}: BookmarksPageProps) {
    const headerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const [recipes, setRecipes] = useState(initialRecipes);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animations
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                },
            );

            gsap.fromTo(
                descRef.current,
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.1,
                    ease: 'power3.out',
                },
            );
        }, headerRef);

        return () => ctx.revert();
    }, []);

    const handleBookmarkChange = (recipeId: string, isBookmarked: boolean) => {
        if (!isBookmarked) {
            // Remove from bookmarks
            setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
        }
    };

    return (
        <div className="to-primary-50 min-h-screen bg-linear-to-br from-neutral-50 via-neutral-100 pt-10">
            {/* Header Section */}
            <div ref={headerRef} className="px-6 py-12 md:px-20 md:py-16">
                <div className="mx-auto max-w-7xl">
                    <h1
                        ref={titleRef}
                        className="mb-3 font-serif text-4xl font-bold text-primary-700 md:text-5xl"
                    >
                        Your Kitchen Collection
                    </h1>
                    <p
                        ref={descRef}
                        className="mb-8 max-w-2xl text-lg text-neutral-600"
                    >
                        {recipes.length} recipes curated for your next culinary
                        adventure.
                    </p>
                </div>
            </div>

            {/* Recipes Grid or Empty State */}
            <div className="px-6 pb-20 md:px-20">
                {recipes.length > 0 ? (
                    <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {recipes.map((recipe, index) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                index={index}
                                onBookmarkChange={handleBookmarkChange}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mx-auto max-w-7xl">
                        <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-white/50 p-12 text-center backdrop-blur">
                            <div className="mb-4 flex justify-center">
                                <Heart className="h-12 w-12 text-primary-300" />
                            </div>
                            <h3 className="mb-2 font-serif text-2xl font-semibold text-neutral-800">
                                Build Your Collection
                            </h3>
                            <p className="mx-auto mb-8 max-w-md text-neutral-600">
                                Explore thousands of recipes and save your
                                favorites to access them anytime, anywhere.
                            </p>
                            <a
                                href="/recipes"
                                className="inline-block rounded-full bg-primary-600 px-8 py-3 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-primary-700 hover:shadow-xl"
                            >
                                Explore More Recipes
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
