'use client';

import { Link, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import type { Recipe } from '@/data/recipe-data';
import { RecipeCard } from '@/feature/Recipes/component/RecipesCard';
import MainLayout from '@/layout/MainLayout';

interface PaginationData {
    currentPage: number;
    perPage: number;
    total: number;
    lastPage: number;
    hasMore: boolean;
    nextPageUrl: string | null;
    prevPageUrl: string | null;
}

interface PageProps {
    recipes: Recipe[];
    pagination: PaginationData;
    search: string;
}

export default function RecipeCardGrid() {
    const props = usePage().props as unknown as PageProps;

    const [searchInput, setSearchInput] = useState<string>(props.search || '');

    const handleSearch = (value: string) => {
        setSearchInput(value);
        const url = new URL(window.location.href);

        if (value) {
            url.searchParams.set('search', value);
        } else {
            url.searchParams.delete('search');
        }

        url.searchParams.set('page', '1');
        window.location.href = url.toString();
    };

    const totalRecipes = props.pagination.total;
    const displayText =
        searchInput && totalRecipes > 0
            ? `${totalRecipes} Recipes for "${searchInput}"`
            : searchInput && totalRecipes === 0
              ? `No recipes found for "${searchInput}"`
              : `${totalRecipes} Recipes for You`;

    return (
        <MainLayout>
            <div className="space-y-8 p-25">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                        {displayText}
                    </h1>
                    <p className="text-base text-muted-foreground sm:text-lg">
                        Using Tomato, Eggs, and Garlic from your pantry.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <div className="border-outline-variant bg-surface flex items-center rounded-lg border px-4 py-3">
                        <Search className="text-on-surface-variant h-5 w-5" />
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search recipes..."
                            className="text-on-surface placeholder:text-on-surface-variant ml-3 w-full bg-transparent outline-none"
                        />
                    </div>
                </div>

                {/* Grid */}
                {props.recipes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {props.recipes.map((recipe, index) => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-4 pt-8">
                            {props.pagination.prevPageUrl && (
                                <Link
                                    href={props.pagination.prevPageUrl}
                                    className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white"
                                >
                                    ← Previous
                                </Link>
                            )}

                            <span className="text-on-surface-variant text-sm">
                                Page {props.pagination.currentPage} of{' '}
                                {props.pagination.lastPage}
                            </span>

                            {props.pagination.nextPageUrl && (
                                <Link
                                    href={props.pagination.nextPageUrl}
                                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-600"
                                >
                                    Next →
                                </Link>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-on-surface-variant text-lg">
                            No recipes found. Try searching for something else!
                        </p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
