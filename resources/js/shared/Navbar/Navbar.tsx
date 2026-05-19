import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    {/* <img src="/RootCook Logo.png" alt="RootCook Logo" className="w-full h-full" /> */}
                    <span className="font-headline-md text-2xl font-bold text-primary font-serif">
                        RootCook
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="hidden items-center gap-8 md:flex">
                    {[
                        { label: 'Recipes', href: '/recipes' },
                        { label: 'Bookmarks', href: '/bookmark' },
                        { label: 'History', href: '/history' },
                    ].map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="text-on-surface-variant group relative py-1 font-sans text-sm font-medium transition-colors duration-200 hover:text-primary"
                        >
                            {label}
                            {/* Underline animasi kiri ke kanan */}
                            <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
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
            </nav>
        </header>
    );
}
