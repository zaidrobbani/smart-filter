import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function BentoSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const bentoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax pada gambar besar
            gsap.to('.bento-parallax-img', {
                yPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5,
                },
            });

            // Bento cards fade in stagger
            gsap.fromTo(
                bentoRef.current?.children ?? [],
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.52,
                    scrollTrigger: {
                        trigger: bentoRef.current,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play reverse play reverse',
                    },
                },
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="mx-auto max-w-7xl px-4 py-24 md:px-20"
        >
            <div
                ref={bentoRef}
                className="grid grid-cols-1 gap-4 md:grid-cols-4"
                style={{ gridTemplateRows: 'repeat(2, 280px)' }}
            >
                {/* Card 1 — Big feature, 2x2 */}
                <div className="group border-outline-variant relative overflow-hidden rounded-2xl border opacity-0 shadow-sm md:col-span-2 md:row-span-2">
                    <img
                        className="bento-parallax-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
                        alt="The Autumn Harvest"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                        <span className="bg-secondary-container text-on-secondary-container mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase">
                            Seasonal Focus
                        </span>
                        <h3
                            className="mb-2 text-2xl font-bold text-white"
                            style={{ fontFamily: "'Libre Caslon Text', serif" }}
                        >
                            The Autumn Harvest
                        </h3>
                        <p className="font-sans text-sm text-white/80">
                            Recipes that celebrate the root vegetables of the
                            season.
                        </p>
                    </div>
                </div>

                {/* Card 2 — Substitution */}
                <div className="bg-secondary-container border-outline-variant relative flex flex-col justify-center overflow-hidden rounded-2xl border p-8 opacity-0 md:col-span-2">
                    <h3
                        className="text-on-secondary-container mb-3 text-xl font-bold"
                        style={{ fontFamily: "'Libre Caslon Text', serif" }}
                    >
                        Substitution Masterclass
                    </h3>
                    <p className="text-on-secondary-container/80 mb-6 font-sans text-sm leading-relaxed">
                        Learn why Greek Yogurt is the perfect replacement for
                        sour cream in 90% of recipes.
                    </p>
                    <button className="border-on-secondary-container text-on-secondary-container hover:bg-on-secondary-container hover:text-secondary-container w-fit rounded-lg border px-5 py-2 text-sm font-semibold transition-all duration-200">
                        Read Article
                    </button>
                </div>

                {/* Card 3 — Image */}
                <div className="border-outline-variant relative overflow-hidden rounded-2xl border opacity-0 shadow-sm md:col-span-1">
                    <img
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&auto=format&fit=crop&q=80"
                        alt="Fresh herbs"
                    />
                </div>

                {/* Card 4 — Rating */}
                <div className="bg-primary-container border-outline-variant relative overflow-hidden rounded-2xl border opacity-0 md:col-span-1">
                    <img
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&auto=format&fit=crop&q=80"
                        alt="Fresh herbs"
                    />

                    {/* overlay gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-tertiary-700/80 via-tertiary-500/80 to-transparent" />

                    {/* content */}
                    <div className="relative z-10 flex h-full flex-col justify-end p-6">
                        <svg
                            className="mb-2 h-8 w-8 fill-white text-white"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>

                        <h4
                            className="text-2xl font-bold text-white"
                            style={{ fontFamily: "'Libre Caslon Text', serif" }}
                        >
                            4.9/5
                        </h4>

                        <p className="mt-1 font-sans text-xs text-white/80">
                            Average user rating for pantry-based recipes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
