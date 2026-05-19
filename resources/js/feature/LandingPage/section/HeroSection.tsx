import { router } from '@inertiajs/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

interface Suggestion {
    id: string;
    title: string;
    description: string;
    image: string;
}

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(
            headlineRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
        )
            .fromTo(
                subRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.6',
            )
            .fromTo(
                searchRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 },
                '-=0.5',
            )
            .fromTo(
                imageRef.current,
                { y: 50, opacity: 0, scale: 0.97 },
                { y: 0, opacity: 1, scale: 1, duration: 1 },
                '-=0.4',
            );
    }, []);

    // Parallax on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!imageRef.current) {
                return;
            }

            const scrollY = window.scrollY;
            gsap.to(imageRef.current, {
                y: scrollY * 0.5,
                ease: 'none',
                duration: 0,
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch suggestions on query change
    useEffect(() => {
        // Kalau query terlalu pendek, reset langsung dan stop
        if (query.trim().length < 2) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSuggestions([]);
            setShowSuggestions(false);
            setIsLoadingSuggestions(false);

            return; // ← early return, hindari setState ganda
        }

        // Kalau query valid, baru set loading
        setIsLoadingSuggestions(true);

        const timeoutId = setTimeout(() => {
            fetch(
                `/api/recipes/search/suggestions?q=${encodeURIComponent(query)}`,
            )
                .then((res) => res.json())
                .then((data) => {
                    setSuggestions(data.suggestions || []);
                    setShowSuggestions(true);
                    setIsLoadingSuggestions(false);
                })
                .catch(() => {
                    setIsLoadingSuggestions(false);
                });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSearch = () => {
        if (query.trim()) {
            router.get('/recipes', { search: query });
        }
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setQuery(suggestion.title);
        setShowSuggestions(false);
        router.get('/recipes', { search: suggestion.title });
    };

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 md:px-20"
            style={{
                background: '#fbf9f4',
                backgroundImage:
                    'radial-gradient(#e5e0d5 0.8px, transparent 0.8px)',
                backgroundSize: '24px 24px',
            }}
        >
            {/* Decorative blobs */}
            <div className="bg-secondary-container/30 pointer-events-none absolute top-20 -left-20 h-72 w-72 rounded-full blur-3xl" />
            <div className="bg-primary-container/10 pointer-events-none absolute -right-20 bottom-20 h-96 w-96 rounded-full blur-3xl" />

            {/* Headline */}
            <div className="relative z-10 mb-10 w-full max-w-3xl text-center">
                <h1
                    ref={headlineRef}
                    className="mb-5 font-serif text-5xl leading-tight text-primary opacity-0 md:text-6xl"
                    style={{ fontFamily: "'Libre Caslon Text', serif" }}
                >
                    Access the root of your kitchen
                </h1>
                <p
                    ref={subRef}
                    className="text-on-surface-variant mx-auto mb-8 max-w-2xl font-sans text-lg opacity-0"
                >
                    Transform your pantry into professional culinary creations.
                    Type what you have, and we'll handle the rest.
                </p>

                {/* Search */}
                <div
                    ref={searchRef}
                    className="mx-auto w-full max-w-2xl opacity-0"
                >
                    <div className="group relative">
                        <div className="pointer-events-none absolute inset-y-0 left-5 flex items-center">
                            <svg
                                className="text-outline h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && handleSearch()
                            }
                            onFocus={() =>
                                query.trim().length >= 2 &&
                                setShowSuggestions(true)
                            }
                            placeholder="Tomato, Eggs, Garlic..."
                            className="border-outline-variant w-full rounded-xl border bg-white py-5 pr-36 pl-14 text-base shadow-sm transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary"
                        />
                        <div className="absolute inset-y-2 right-2">
                            <button
                                onClick={handleSearch}
                                className="rounded-lg bg-primary px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-600 active:scale-95"
                            >
                                Find Recipes
                            </button>
                        </div>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && (
                            <div className="border-outline-variant absolute top-full right-0 left-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border bg-white shadow-lg ">
                                {isLoadingSuggestions ? (
                                    <div className="text-on-surface-variant px-4 py-8 text-center">
                                        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                    </div>
                                ) : suggestions.length > 0 ? (
                                    <div className="divide-outline-variant divide-y">
                                        {suggestions.map((suggestion) => (
                                            <button
                                                key={suggestion.id}
                                                onClick={() =>
                                                    handleSuggestionClick(
                                                        suggestion,
                                                    )
                                                }
                                                className="hover:bg-secondary-100 flex w-full items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer"
                                            >
                                                <img
                                                    src={suggestion.image}
                                                    alt={suggestion.title}
                                                    className="h-10 w-10 rounded object-cover"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-on-surface truncate font-medium">
                                                        {suggestion.title}
                                                    </div>
                                                    <div className="text-on-surface-variant truncate text-xs">
                                                        {suggestion.description}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-on-surface-variant px-4 py-8 text-center text-sm">
                                        No recipes found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <span className="text-outline text-xs font-medium tracking-wider uppercase">
                            Try:
                        </span>
                        {[
                            'Avocado & Lime',
                            'Leftover Chicken',
                            'Zucchini, Pasta',
                        ].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => {
                                    setQuery(tag);
                                    router.get('/recipes', { search: tag });
                                }}
                                className="bg-secondary-container text-on-secondary-container rounded-full px-3 py-1 text-xs font-semibold transition-opacity hover:opacity-80"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hero Image */}
            <div
                ref={imageRef}
                className="relative aspect-21/9 w-full max-w-5xl overflow-hidden rounded-2xl opacity-0 shadow-xl"
            >
                <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&auto=format&fit=crop&q=80"
                    alt="Professional kitchen"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent" />
            </div>
        </section>
    );
}
