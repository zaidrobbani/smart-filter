'use client';

import { Head, usePage } from '@inertiajs/react';
import gsap from 'gsap';
import { Clock, ChefHat, Flame } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Button } from '@/component/ui/button';
import { Separator } from '@/component/ui/separator';

interface Ingredient {
    name: string;
    note?: string;
    quantity?: string;
}

interface Instruction {
    step: number;
    title: string;
    description: string;
}

interface NutritionFacts {
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
    fiber: string;
}

interface SmartSubstitutions {
    title: string;
    description: string;
    suggestions?: string[];
}

interface Recipe {
    id: string;
    title: string;
    image: string;
    description: string;
    cookingTime: number;
    difficulty: string;
    ingredients: Ingredient[];
    instructions: Instruction[];
    nutritionFacts: NutritionFacts;
    smartSubstitutions?: SmartSubstitutions;
}

interface RecipeShowProps {
    recipe: Recipe;
}

export default function RecipeShow({ recipe }: RecipeShowProps) {
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { auth } = usePage().props as any;

    useEffect(() => {
        // Record visit to history when component mounts
        if (auth?.user && recipe?.id) {
            fetch('/api/history/record', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipe_id: parseInt(recipe.id) }),
            }).catch((error) => {
                console.error('Error recording history:', error);
            });
        }

        // Header entrance animation
        if (headerRef.current) {
            gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            );
        }

        // Content stagger animation
        if (contentRef.current) {
            const sections =
                contentRef.current.querySelectorAll('[data-animate]');
            gsap.fromTo(
                sections,
                { opacity: 0, y: 20 },
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
    }, [auth?.user, recipe?.id]);

    if (!recipe) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-muted-foreground">
                    Recipe not found
                </p>
            </div>
        );
    }

    const ingredients: Ingredient[] = Array.isArray(recipe.ingredients)
        ? recipe.ingredients
        : [];

    const instructions: Instruction[] = Array.isArray(recipe.instructions)
        ? recipe.instructions
        : [];

    return (
        <React.Fragment>
            <Head title={recipe.title} />

            <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Title Overlay */}
                    <div className="absolute right-0 bottom-0 left-0 flex items-end gap-4 p-6 sm:p-8">
                        <div className="flex-1">
                            <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                                {recipe.title}
                            </h1>
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
                <div ref={contentRef} className="mx-auto max-w-6xl py-8">
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
                            {(recipe.smartSubstitutions.suggestions ?? [])
                                .length > 0 && (
                                <ul className="space-y-2">
                                    {recipe.smartSubstitutions.suggestions!.map(
                                        (suggestion, idx) => (
                                            <li
                                                key={idx}
                                                className="text-sm text-primary-600"
                                            >
                                                <span className="font-semibold">
                                                    {suggestion.split('?')[0]}
                                                </span>
                                                ?{suggestion.split('?')[1]}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            )}
                        </section>
                    )}

                    {/* Two-column layout: main content + nutrition sidebar */}
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                        {/* Left: Ingredients + Instructions */}
                        <div className="min-w-0 flex-1">
                            {/* Ingredients Section */}
                            <section data-animate className="mb-12">
                                <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
                                    Ingredients
                                </h2>

                                {ingredients.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        No ingredients available.
                                    </p>
                                ) : (
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {ingredients.map((ingredient, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 sm:p-4"
                                            >
                                                {ingredient.quantity && (
                                                    <span className="shrink-0 text-sm font-semibold text-muted-foreground">
                                                        {ingredient.quantity}
                                                    </span>
                                                )}
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
                                )}
                            </section>

                            <Separator className="my-12" />

                            {/* Instructions Section */}
                            <section data-animate className="mb-12">
                                <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                                    Instructions
                                </h2>

                                {instructions.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        No instructions available.
                                    </p>
                                ) : (
                                    <div className="space-y-6">
                                        {instructions.map((instruction) => (
                                            <div
                                                key={instruction.step}
                                                className="flex items-start gap-4 sm:gap-6"
                                            >
                                                {/* Step Number */}
                                                <div className="shrink-0 pt-1">
                                                    <span className="font-serif text-4xl font-bold text-foreground/20">
                                                        {(instruction.step ?? 0)
                                                            .toString()
                                                            .padStart(2, '0')}
                                                    </span>
                                                </div>
                                                {/* Step Content */}
                                                <div className="flex-1 pt-2">
                                                    <p className="text-sm text-muted-foreground sm:text-base">
                                                        {
                                                            instruction.description
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            <Separator className="my-12" />
                        </div>

                        {/* Right: Nutrition Facts (sticky sidebar) */}
                        <aside
                            data-animate
                            className="w-full lg:sticky lg:top-8 lg:w-72 lg:shrink-0"
                        >
                            <div className="rounded-lg border border-border bg-muted p-6">
                                <h3 className="mb-4 font-bold tracking-wide text-foreground">
                                    NUTRITION FACTS
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        {
                                            label: 'Calories',
                                            value: `${recipe.nutritionFacts.calories} kcal`,
                                            highlight: true,
                                        },
                                        {
                                            label: 'Protein',
                                            value: recipe.nutritionFacts
                                                .protein,
                                        },
                                        {
                                            label: 'Fat',
                                            value: recipe.nutritionFacts.fat,
                                        },
                                        {
                                            label: 'Carbs',
                                            value: recipe.nutritionFacts.carbs,
                                        },
                                        {
                                            label: 'Fiber',
                                            value: recipe.nutritionFacts.fiber,
                                        },
                                    ].map(({ label, value, highlight }) => (
                                        <div
                                            key={label}
                                            className="flex items-center justify-between"
                                        >
                                            <span className="text-xs font-medium text-muted-foreground">
                                                {label}
                                            </span>
                                            <span
                                                className={
                                                    highlight
                                                        ? 'font-bold text-primary'
                                                        : 'font-semibold text-foreground'
                                                }
                                            >
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
