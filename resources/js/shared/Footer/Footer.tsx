import { Link } from '@inertiajs/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                footerRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 95%',
                        toggleActions: 'play reverse play reverse',
                    },
                },
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="bg-surface-container border-outline-variant border-t opacity-0"
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 md:flex-row md:px-20">
                <div className="flex flex-col items-center gap-2 md:items-start">
                    <Link href="/" className="flex items-center gap-2">
                        <span
                            className="text-lg font-bold text-primary"
                            style={{ fontFamily: "'Libre Caslon Text', serif" }}
                        >
                            SmartFilter
                        </span>
                    </Link>
                    <p className="text-on-surface-variant text-center font-sans text-sm md:text-left">
                        © 2024 SmartFilter. Crafted with ❤️
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {[
                        { label: 'Recipes', href: '/recipes' },
                        { label: 'Bookmarks', href: '/bookmark' },
                        { label: 'History', href: '/history' },
                        { label: 'Settings', href: '/settings' },
                    ].map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="text-on-surface-variant font-sans text-xs font-semibold tracking-wider uppercase transition-colors hover:text-primary"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
