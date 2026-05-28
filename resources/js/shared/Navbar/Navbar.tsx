import { Link, router, usePage } from '@inertiajs/react';
import { CircleUserRound, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Suggestion {
    id: string;
    title: string;
    description: string;
    image: string;
}

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [showSearchMobile, setShowSearchMobile] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const { auth } = usePage().props;
    const { url } = usePage();
    const pathname = url;
    const isActive = (href: string) => pathname === href;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Fetch suggestions on query change
    useEffect(() => {
        if (query.trim().length < 2) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSuggestions([]);
            setShowSuggestions(false);
            setIsLoadingSuggestions(false);

            return;
        }

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

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = () => {
        if (query.trim()) {
            router.get('/recipes', { search: query });
            setQuery('');
            setShowSuggestions(false);
            setShowSearchMobile(false);
        }
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        router.get('/recipes', { search: suggestion.title });
        setQuery('');
        setShowSuggestions(false);
        setShowSearchMobile(false);
    };

    return (
        <header
            ref={navRef}
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-surface/80 border-outline-variant/40 border-b shadow-sm backdrop-blur-md'
                    : 'bg-transparent'
            }`}
        >
            <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-20">
                <Link href="/" className="flex items-center gap-3">
                    <span className="font-headline-md font-serif text-2xl font-bold text-primary">
                        RootCook
                    </span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {[
                        { label: 'Recipes', href: '/recipes' },
                        { label: 'Bookmarks', href: '/bookmarks' },
                        { label: 'History', href: '/history' },
                    ].map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className={`text-on-surface-variant group relative py-1 font-sans text-sm font-medium transition-colors duration-200 hover:text-primary ${isActive(href) ? 'text-primary' : ''}`}
                        >
                            {label}
                            <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {!auth?.user ? (
                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="hidden rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-all duration-200 hover:bg-primary hover:text-white md:inline-flex"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-primary-600 active:scale-95"
                        >
                            Daftar
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        {/* Desktop Search */}
                        <div
                            ref={searchRef}
                            className="relative hidden md:block"
                        >
                            <div className="border-outline-variant bg-surface-container flex items-center rounded-lg border px-3 py-2">
                                <Search className="text-on-surface-variant h-4 w-4" />
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
                                    placeholder="Search recipes..."
                                    className="bg-surface-container placeholder:text-on-surface-variant ml-2 w-40 text-sm outline-none"
                                />

                                {/* Suggestions Dropdown */}
                                {showSuggestions && (
                                    <div className="border-outline-variant absolute top-full right-0 left-0 z-50 mt-2 max-h-64 overflow-y-auto rounded-lg border bg-white shadow-lg">
                                        {isLoadingSuggestions ? (
                                            <div className="text-on-surface-variant px-3 py-4 text-center">
                                                <div className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                            </div>
                                        ) : suggestions.length > 0 ? (
                                            <div className="divide-outline-variant divide-y">
                                                {suggestions.map(
                                                    (suggestion) => (
                                                        <button
                                                            key={suggestion.id}
                                                            onClick={() =>
                                                                handleSuggestionClick(
                                                                    suggestion,
                                                                )
                                                            }
                                                            className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-secondary-100"
                                                        >
                                                            <img
                                                                src={
                                                                    suggestion.image
                                                                }
                                                                alt={
                                                                    suggestion.title
                                                                }
                                                                className="h-8 w-8 rounded object-cover"
                                                            />
                                                            <div className="min-w-0 flex-1">
                                                                <div className="text-on-surface truncate text-xs font-medium">
                                                                    {
                                                                        suggestion.title
                                                                    }
                                                                </div>
                                                                <div className="text-on-surface-variant truncate text-xs">
                                                                    {
                                                                        suggestion.description
                                                                    }
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-on-surface-variant px-3 py-4 text-center text-xs">
                                                No recipes found
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Search Toggle */}
                        <button
                            onClick={() =>
                                setShowSearchMobile(!showSearchMobile)
                            }
                            className="text-on-surface-variant md:hidden"
                        >
                            {showSearchMobile ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Search className="h-5 w-5" />
                            )}
                        </button>

                        {/* Mobile Search (expanded) */}
                        {showSearchMobile && (
                            <div
                                ref={searchRef}
                                className="absolute top-16 right-4 left-4 md:hidden"
                            >
                                <div className="border-outline-variant bg-surface-container relative flex items-center rounded-lg border px-3 py-2">
                                    <Search className="text-on-surface-variant h-4 w-4" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === 'Enter' && handleSearch()
                                        }
                                        onFocus={() =>
                                            query.trim().length >= 2 &&
                                            setShowSuggestions(true)
                                        }
                                        placeholder="Search recipes..."
                                        className="bg-surface-container placeholder:text-on-surface-variant ml-2 flex-1 text-sm outline-none"
                                    />

                                    {/* Mobile Suggestions Dropdown */}
                                    {showSuggestions && (
                                        <div className="border-outline-variant absolute top-full right-0 left-0 z-50 mt-2 max-h-64 overflow-y-auto rounded-lg border bg-white shadow-lg">
                                            {isLoadingSuggestions ? (
                                                <div className="text-on-surface-variant px-3 py-4 text-center">
                                                    <div className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                                </div>
                                            ) : suggestions.length > 0 ? (
                                                <div className="divide-outline-variant divide-y">
                                                    {suggestions.map(
                                                        (suggestion) => (
                                                            <button
                                                                key={
                                                                    suggestion.id
                                                                }
                                                                onClick={() =>
                                                                    handleSuggestionClick(
                                                                        suggestion,
                                                                    )
                                                                }
                                                                className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-secondary-100"
                                                            >
                                                                <img
                                                                    src={
                                                                        suggestion.image
                                                                    }
                                                                    alt={
                                                                        suggestion.title
                                                                    }
                                                                    className="h-8 w-8 rounded object-cover"
                                                                />
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="text-on-surface truncate text-xs font-medium">
                                                                        {
                                                                            suggestion.title
                                                                        }
                                                                    </div>
                                                                    <div className="text-on-surface-variant truncate text-xs">
                                                                        {
                                                                            suggestion.description
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        ),
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="text-on-surface-variant px-3 py-4 text-center text-xs">
                                                    No recipes found
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <Link href={'/profile'}>
                            <button className="text-on-surface-variant cursor-pointer transition hover:scale-105">
                                <CircleUserRound className="h-6 w-6" />
                            </button>
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
