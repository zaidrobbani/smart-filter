import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: '1',
        title: 'Input ingredients',
        desc: "Tell us what's in your pantry. Our smart filter recognizes ingredients in multiple languages.",
    },
    {
        number: '2',
        title: 'Discover recipes',
        desc: 'Explore a curated list of recipes that you can make right now. No more last-minute grocery runs.',
    },
    {
        number: '3',
        title: 'Cook with substitutions',
        desc: 'Missing something? We provide smart, chef-approved alternatives for every recipe.',
    },
];

export default function HowItWorks() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title scroll in
            gsap.fromTo(
                titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 85%',
                        end: 'bottom 50%',
                        toggleActions: 'play reverse play reverse',
                    },
                },
            );

            // Cards stagger scroll in
            gsap.fromTo(
                cardsRef.current?.children ?? [],
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 80%',
                        end: 'bottom 40%',
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
            className="bg-surface-container-low px-4 py-24 md:px-20"
        >
            <div className="mx-auto max-w-7xl">
                <div ref={titleRef} className="mb-16 text-center opacity-0">
                    <h2
                        className="mb-3 text-3xl font-bold text-primary"
                        style={{ fontFamily: "'Libre Caslon Text', serif" }}
                    >
                        How it works
                    </h2>
                    <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
                </div>

                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 gap-6 md:grid-cols-3"
                >
                    {steps.map(({ number, title, desc }) => (
                        <div
                            key={number}
                            className="border-outline-variant group rounded-xl border bg-white p-8 opacity-0 transition-shadow duration-300 hover:shadow-md"
                        >
                            <div className="mb-4 font-serif text-6xl font-bold text-primary opacity-20 transition-opacity duration-300 group-hover:opacity-100">
                                {number}
                            </div>
                            <h3
                                className="mb-3 text-xl font-semibold text-primary"
                                style={{
                                    fontFamily: "'Libre Caslon Text', serif",
                                }}
                            >
                                {title}
                            </h3>
                            <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
