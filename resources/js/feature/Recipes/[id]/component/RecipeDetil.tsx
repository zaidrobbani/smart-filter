'use client';

import { Head, usePage } from '@inertiajs/react';
import gsap from 'gsap';
import { Clock, ChefHat, Flame } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/component/ui/button';
import { Separator } from '@/component/ui/separator';
import { recipeData } from '@/data/recipe-data';

interface RecipeShowProps {
    id: string;
}

export default function RecipeShow({ id }: RecipeShowProps) {
    const recipe = recipeData.find((r) => r.id === id);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { auth } = usePage().props as any;

    useEffect(() => {
        // Record visit to history when component mounts
        if (auth.user && recipe?.id) {
            fetch('/api/history/record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipe_id: parseInt(recipe.id) }),
            })
                .then((response) => {
                    if (!response.ok) {
                        console.error('Failed to record history');
                    }
                })
                .catch((error) => {
                    console.error('Error recording history:', error);
                });
        }

        // Header entrance animation
        if (headerRef.current) {
            gsap.fromTo(
                headerRef.current,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                },
            );
        }

        // Content stagger animation
        if (contentRef.current) {
            const sections =
                contentRef.current.querySelectorAll('[data-animate]');
            gsap.fromTo(
                sections,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.3,
                    ease: 'power2.out',
                },
            );
        }
    }, []);

    if (!recipe) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-muted-foreground">
                    Recipe not found
                </p>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Head title={recipe.title} />

            <div className="min-h-screen bg-background p-18">
                {/* Hero Image with Overlay */}
                <div
                    ref={headerRef}
                    className="relative h-80 w-full overflow-hidden rounded-md sm:h-96"
                >
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="h-full w-full object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                    {/* Title Overlay */}
                    <div className="absolute right-0 bottom-0 left-0 flex items-end gap-4 p-6 sm:p-8">
                        <div className="flex-1">
                            <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                                {recipe.title}
                            </h1>

                            {/* Quick Stats */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-white">
                                    <Clock className="h-5 w-5" />
                                    <span className="text-sm font-medium">
                                        {recipe.cookingTime} MIN
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <Flame className="h-5 w-5" />
                                    <span className="text-sm font-medium">
                                        {recipe.difficulty}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-12 w-12 rounded-full"
                        >
                            <ChefHat className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div
                    ref={contentRef}
                    className="flex w-full justify-center gap-8 px-4 py-8 sm:px-6 lg:px-0"
                >
                    <div ref={contentRef} className="w-full">
                        {/* Smart Substitutions */}
                        {recipe.smartSubstitutions && (
                            <section
                                data-animate
                                className="mb-8 rounded-lg border border-primary-300 bg-neutral-100 p-6 sm:mb-12"
                            >
                                <h2 className="mb-2 text-lg font-semibold text-secondary-600">
                                    ♻️ {recipe.smartSubstitutions.title}
                                </h2>
                                <p className="mb-4 text-sm text-tertiary-800">
                                    {recipe.smartSubstitutions.description}
                                </p>
                                <ul className="space-y-2">
                                    {recipe.smartSubstitutions.suggestions.map(
                                        (suggestion, idx) => (
                                            <li
                                                key={idx}
                                                className="text-sm text-primary-600"
                                            >
                                                <span className="font-semibold">
                                                    {suggestion.split('?')[0]}
                                                </span>
                                                ? {suggestion.split('?')[1]}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </section>
                        )}

                        {/* Ingredients Section */}
                        <section data-animate className="mb-12">
                            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
                                Ingredients
                            </h2>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {recipe.ingredients.map((ingredient, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 sm:p-4"
                                    >
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-card-foreground">
                                                {ingredient.name}
                                            </p>
                                            {ingredient.note && (
                                                <p className="text-xs text-muted-foreground">
                                                    {ingredient.note}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <Separator className="my-12" />

                        {/* Instructions Section */}
                        <section data-animate className="mb-12">
                            <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                                Instructions
                            </h2>
                            <div className="space-y-6">
                                {recipe.instructions.map((instruction) => (
                                    <div
                                        key={instruction.step}
                                        className="flex items-center justify-center gap-4 sm:gap-6"
                                    >
                                        {/* Step Number */}
                                        <div className="shrink-0">
                                            <span className="font-serif text-4xl font-bold text-tertiary-700/40">
                                                {instruction.step
                                                    .toString()
                                                    .padStart(2, '0')}
                                            </span>
                                        </div>

                                        {/* Step Content */}
                                        <div className="flex-1 pt-1">
                                            <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">
                                                {instruction.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground sm:text-base">
                                                {instruction.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <Separator className="my-12" />
                    </div>
                    {/* Nutrition Facts */}
                    <section data-animate className="mb-12">
                        <div className="w-full">
                            {/* Right: Nutrition Facts */}
                            <div className="rounded-lg border border-border bg-muted p-6">
                                <h3 className="mb-4 font-bold text-foreground">
                                    NUTRITION FACTS
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-muted-foreground">
                                            Calories
                                        </span>
                                        <span className="font-bold text-primary">
                                            {recipe.nutritionFacts.calories}{' '}
                                            kcal
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-muted-foreground">
                                            Protein
                                        </span>
                                        <span className="font-semibold text-foreground">
                                            {recipe.nutritionFacts.protein}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-muted-foreground">
                                            Fat
                                        </span>
                                        <span className="font-semibold text-foreground">
                                            {recipe.nutritionFacts.fat}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-muted-foreground">
                                            Carbs
                                        </span>
                                        <span className="font-semibold text-foreground">
                                            {recipe.nutritionFacts.carbs}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-muted-foreground">
                                            Fiber
                                        </span>
                                        <span className="font-semibold text-foreground">
                                            {recipe.nutritionFacts.fiber}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </React.Fragment>
    );
}
