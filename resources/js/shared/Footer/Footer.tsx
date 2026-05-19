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
                    y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 95%',
                        toggleActions: 'play reverse play reverse',
                    },
                },
            );
        }, footerRef);

        return () => 
            ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="bg-surface-container border-t border-outline-variant opacity-0"
        >
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center py-12 px-4 md:px-20 gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <span
                            className="text-lg font-bold text-primary"
                            style={{ fontFamily: "'Libre Caslon Text', serif" }}
                        >
                            SmartFilter
                        </span>
                    </Link>
                    <p className="font-sans text-sm text-on-surface-variant text-center md:text-left">
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
                            className="font-sans text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}