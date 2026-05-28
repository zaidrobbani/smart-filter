'use client';

import { Link, usePage } from '@inertiajs/react';
import gsap from 'gsap';
import { Clock, Heart, CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import type { Recipe } from '@/data/recipe-data';

interface RecipeCardProps {
    recipe: Recipe;
    index?: number;
    onBookmarkChange?: (recipeId: string, isBookmarked: boolean) => void;
}

export function RecipeCard({
    recipe,
    index = 0,
    onBookmarkChange,
}: RecipeCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const { auth } = usePage().props as any;
    const [isBookmarked, setIsBookmarked] = useState(
        (recipe as any).isBookmarked || false,
    );
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!cardRef.current) {
            return;
        }

        // Entrance animation dengan stagger
        gsap.fromTo(
            cardRef.current,
            {
                opacity: 0,
                y: 30,
                scale: 0.95,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out',
            },
        );
    }, [index]);

    const handleHoverStart = () => {
        if (!cardRef.current || !imageRef.current) {
            return;
        }

        // Card lift effect
        gsap.to(cardRef.current, {
            y: -8,
            duration: 0.3,
            ease: 'power2.out',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 35px',
        });

        // Image zoom
        gsap.to(imageRef.current, {
            scale: 1.08,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const getCsrfToken = (): string => {
        return document.cookie
            .split('; ')
            .find((row) => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1]
            ? decodeURIComponent(
                  document.cookie
                      .split('; ')
                      .find((row) => row.startsWith('XSRF-TOKEN='))!
                      .split('=')[1],
              )
            : '';
    };

    const handleHoverEnd = () => {
        if (!cardRef.current || !imageRef.current) {
            return;
        }

        gsap.to(cardRef.current, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            boxShadow: 'rgba(0, 0, 0, 0.08) 0px 2px 8px',
        });

        gsap.to(imageRef.current, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleBookmarkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!auth?.user) {
            toast.error('Silakan login terlebih dahulu untuk bookmark recipe');

            return;
        }

        setIsLoading(true);
        const csrfToken = getCsrfToken();

        if (isBookmarked) {
            fetch(`/bookmarks/${recipe.id}`, {
                method: 'DELETE',
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    Accept: 'application/json',
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed');
                    }

                    setIsBookmarked(false);
                    toast.success('Bookmark dihapus');
                    onBookmarkChange?.(recipe.id, false);
                })
                .catch(() => toast.error('Gagal menghapus bookmark'))
                .finally(() => setIsLoading(false));
        } else {
            fetch('/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken,
                    Accept: 'application/json',
                },
                body: JSON.stringify({ recipe_id: Number(recipe.id) }),
            })
                .then((res) => {
                    if (res.status === 409) {
                        setIsBookmarked(true);
                        toast.info('Recipe sudah ada di bookmark');

                        return;
                    }

                    if (!res.ok) {
                        throw new Error('Failed');
                    }

                    setIsBookmarked(true);
                    toast.success('Recipe ditambahkan ke bookmark');
                    onBookmarkChange?.(recipe.id, true);
                })
                .catch(() => toast.error('Gagal menambahkan bookmark'))
                .finally(() => setIsLoading(false));
        }
    };

    return (
        <Link href={`/recipes/${recipe.id}`}>
            <div
                ref={cardRef}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-300"
            >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-muted sm:h-56">
                    <div ref={imageRef} className="h-full w-full origin-center">
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleBookmarkClick}
                        disabled={isLoading}
                        className="absolute top-3 right-3 rounded-full bg-white/90 p-2 backdrop-blur-sm transition-colors hover:bg-white disabled:opacity-50"
                    >
                        {isBookmarked ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                            <Heart className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                        )}
                    </button>

                    {/* Label Badge */}
                    {recipe.label && (
                        <div className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                            {recipe.label}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-5">
                    {/* Title */}
                    <h3 className="line-clamp-2 text-lg font-semibold text-card-foreground sm:text-xl">
                        {recipe.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {recipe.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Meta Info - Cooking Time */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{recipe.cookingTime} MIN</span>
                    </div>

                    {/* Description */}
                    <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
                        {recipe.description}
                    </p>

                    {/* Price / Rating */}
                    <div className="flex items-center justify-between border-t border-border pt-3">
                        <span className="text-sm font-semibold text-card-foreground">
                            {recipe.price}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                            {recipe.difficulty}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
