import { Link, usePage } from '@inertiajs/react';
import { CircleUserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    const { auth } = usePage().props;
    const { url } = usePage();
    const pathname = url;
    const cleanPathname = pathname.split('?')[0];
    const isRecipeDetailPage = /^\/recipes\/[^/]+$/.test(cleanPathname);
    const isActive = (href: string) => pathname === href;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            ref={navRef}
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
                scrolled || isRecipeDetailPage
                    ? 'bg-surface/90 border-outline-variant/40 border-b shadow-sm backdrop-blur-md'
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
