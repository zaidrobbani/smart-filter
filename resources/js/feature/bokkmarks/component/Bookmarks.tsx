'use client';

import gsap from 'gsap';
import { Bookmark, Heart } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface BookmarkedRecipe {
    id: string;
    title: string;
    description: string;
    image: string;
    cookingTime: number;
    category: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    isLarge?: boolean;
    isWide?: boolean;
}

const bookmarkedRecipes: BookmarkedRecipe[] = [
    {
        id: '1',
        title: 'Seasonal Harvest Buddha Bowl',
        description:
            'A nutrient-dense foundation of ancient grains topped with seasonal roasted vegetables and a zesty lemon-tahini dressing.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
        cookingTime: 35,
        category: 'MAIN DISH',
        difficulty: 'EASY',
        isLarge: true,
        isWide: true,
    },
    {
        id: '2',
        title: 'Rustic Tomato & Basil Salad',
        description: 'Fresh, simple, and bursting with flavor.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
        cookingTime: 15,
        category: 'APPETIZER',
        difficulty: 'EASY',
    },
    {
        id: '3',
        title: 'Wild Mushroom Tagliatelle',
        description: 'Earthy, rich, and deeply satisfying pasta.',
        image: 'https://images.unsplash.com/photo-1473093295203-cad00df16e50?auto=format&fit=crop&w=1200&q=80',
        cookingTime: 25,
        category: 'PASTA',
        difficulty: 'MEDIUM',
    },
    {
        id: '4',
        title: 'Garden Green Detox Soup',
        description: 'A vibrant and nourishing bowl of wellness.',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
        cookingTime: 20,
        category: 'SOUP',
        difficulty: 'EASY',
    },
    {
        id: '5',
        title: 'Artisan Sourdough Pizza',
        description: 'Crispy crust, fresh toppings, pure comfort.',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
        cookingTime: 45,
        category: 'BAKING',
        difficulty: 'HARD',
    },
];

function BookmarkCard({
    recipe,
    index,
}: {
    recipe: BookmarkedRecipe;
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cardRefCurrent = cardRef.current;

        if (!cardRefCurrent) {
            return;
        }

        // Entrance animation
        gsap.fromTo(
            cardRefCurrent,
            {
                opacity: 0,
                y: 30,
                scale: 0.95,
                rotateY: -5,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateY: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
            },
        );

        // Hover animation
        const handleMouseEnter = () => {
            gsap.to(cardRefCurrent, {
                y: -8,
                duration: 0.4,
                ease: 'power2.out',
            });

            gsap.to(imageRef.current, {
                scale: 1.08,
                duration: 0.6,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(cardRefCurrent, {
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
            });

            gsap.to(imageRef.current, {
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
            });
        };

        cardRefCurrent.addEventListener('mouseenter', handleMouseEnter);
        cardRefCurrent.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cardRefCurrent?.removeEventListener('mouseenter', handleMouseEnter);
            cardRefCurrent?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [index]);

    const colSpan = recipe.isWide ? 'lg:col-span-8' : 'lg:col-span-4';

    return (
        <div
            ref={cardRef}
            className={`${colSpan} group cursor-pointer`}
            style={{ perspective: '1000px' }}
        >
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <div
                    ref={imageRef}
                    className={`relative ${
                        recipe.isLarge ? 'aspect-video' : 'aspect-square'
                    } overflow-hidden bg-neutral-100`}
                >
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="h-full w-full object-cover"
                    />

                    {/* Bookmark Button */}
                    <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <button className="rounded-full bg-white/90 p-2 text-primary-600 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                            <Bookmark className="h-5 w-5 fill-primary-600" />
                        </button>
                    </div>

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Content */}
                <div className="flex grow flex-col justify-between p-6">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-bold tracking-wider text-primary-600 uppercase">
                                {recipe.category}
                            </span>
                            <span className="text-xs font-semibold tracking-wider text-neutral-600 uppercase">
                                {recipe.cookingTime} MIN
                            </span>
                        </div>

                        <h3 className="mb-2 line-clamp-2 font-serif text-lg font-semibold text-neutral-800 md:text-xl">
                            {recipe.title}
                        </h3>

                        {recipe.isLarge && (
                            <p className="line-clamp-2 text-sm text-neutral-600">
                                {recipe.description}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <span
                            className={`text-xs font-semibold tracking-wider uppercase ${
                                recipe.difficulty === 'EASY'
                                    ? 'text-green-700'
                                    : recipe.difficulty === 'MEDIUM'
                                      ? 'text-orange-700'
                                      : 'text-red-700'
                            }`}
                        >
                            Difficulty: {recipe.difficulty}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BookmarksPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);

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

            gsap.fromTo(
                controlsRef.current?.querySelectorAll('[data-animate]') || [],
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    delay: 0.2,
                    stagger: 0.1,
                    ease: 'power2.out',
                },
            );
        }, headerRef);

        return () => ctx.revert();
    }, []);

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
                        {bookmarkedRecipes.length} recipes curated for your next
                        culinary adventure.
                    </p>

                    {/* Controls */}
                    <div
                        ref={controlsRef}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <div
                            data-animate
                            className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-2 shadow-sm"
                        >
                            <span className="text-xs font-bold tracking-wider text-neutral-600 uppercase">
                                Sort By
                            </span>
                            <select className="cursor-pointer border-none bg-transparent p-0 text-sm font-semibold text-primary-600 focus:ring-0">
                                <option>Recently Added</option>
                                <option>Prep Time</option>
                                <option>Difficulty</option>
                            </select>
                        </div>

                        <button
                            data-animate
                            className="flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 font-semibold text-neutral-700 transition-colors duration-300 hover:bg-neutral-50"
                        >
                            <span>🔍</span>
                            Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Recipes Grid */}
            <div className="px-6 pb-20 md:px-20">
                <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-12">
                    {bookmarkedRecipes.map((recipe, index) => (
                        <BookmarkCard
                            key={recipe.id}
                            recipe={recipe}
                            index={index}
                        />
                    ))}
                </div>

                {/* Empty State / CTA */}
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-white/50 p-12 text-center backdrop-blur">
                        <div className="mb-4 flex justify-center">
                            <Heart className="h-12 w-12 text-primary-300" />
                        </div>
                        <h3 className="mb-2 font-serif text-2xl font-semibold text-neutral-800">
                            Build Your Collection
                        </h3>
                        <p className="mx-auto mb-8 max-w-md text-neutral-600">
                            Explore thousands of recipes and save your favorites
                            to access them anytime, anywhere.
                        </p>
                        <button className="rounded-full bg-primary-600 px-8 py-3 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-primary-700 hover:shadow-xl">
                            Explore More Recipes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
