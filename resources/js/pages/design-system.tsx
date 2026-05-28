import { Head } from '@inertiajs/react';

const colors = {
    primary: [
        '#FDF2EC',
        '#F5E8DF',
        '#E8C9B0',
        '#D4956A',
        '#A65D37',
        '#7A3D1E',
        '#4A1E08',
        '#2A0E02',
    ],
    secondary: [
        '#F0F2EC',
        '#E1E6D9',
        '#C3CCBB',
        '#95A285',
        '#707A5E',
        '#4D5840',
        '#2E3826',
        '#161C10',
    ],
    tertiary: [
        '#FDF6F0',
        '#F7EDE3',
        '#EDD4BA',
        '#E3B98E',
        '#D99872',
        '#B87340',
        '#8C5230',
        '#5C3018',
    ],
    neutral: [
        '#FDFCFA',
        '#F9F7F2',
        '#ECEAE4',
        '#D4CFC6',
        '#B0A898',
        '#8C7B6E',
        '#4A3C30',
        '#1C1410',
    ],
};

const stops = ['100', '200', '300', '400', '500', '600', '700', '800'];

export default function DesignSystem() {
    return (
        <>
            <Head title="Design System" />
            <div className="min-h-screen bg-neutral-200 p-8">
                <h1 className="mb-2 font-serif text-3xl text-neutral-800">
                    Design System
                </h1>
                <p className="mb-8 font-sans text-neutral-600">
                    Smart Filter — Color, Typography, Components
                </p>

                {/* Colors */}
                <section className="mb-10">
                    <h2 className="mb-4 font-serif text-xl text-neutral-800">
                        Color Palette
                    </h2>
                    <div className="space-y-3">
                        {Object.entries(colors).map(([name, shades]) => (
                            <div key={name}>
                                <p className="mb-1 font-sans text-xs font-medium text-neutral-600 capitalize">
                                    {name}
                                </p>
                                <div className="flex overflow-hidden rounded-lg">
                                    {shades.map((hex, i) => (
                                        <div
                                            key={i}
                                            className="flex h-12 flex-1 items-end justify-center pb-1"
                                            style={{ backgroundColor: hex }}
                                        >
                                            <span
                                                className="text-[10px] font-medium"
                                                style={{
                                                    color:
                                                        i < 4
                                                            ? shades[6]
                                                            : shades[1],
                                                }}
                                            >
                                                {stops[i]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Typography */}
                <section className="mb-10">
                    <h2 className="mb-4 font-serif text-xl text-neutral-800">
                        Typography
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-neutral-300 bg-white p-6">
                            <p className="mb-2 text-xs text-neutral-600">
                                Headline · Libre Caslon Text
                            </p>
                            <p className="font-serif text-5xl text-neutral-800">
                                Aa
                            </p>
                            <p className="mt-3 font-serif text-2xl text-neutral-800">
                                Resep Pilihan
                            </p>
                            <p className="mt-1 font-serif text-lg text-neutral-600 italic">
                                50 resep lezat menanti
                            </p>
                        </div>
                        <div className="rounded-xl border border-neutral-300 bg-white p-6">
                            <p className="mb-2 text-xs text-neutral-600">
                                Body & Label · Manrope
                            </p>
                            <p className="font-sans text-5xl font-medium text-neutral-800">
                                Aa
                            </p>
                            <p className="mt-3 font-sans text-base leading-relaxed text-neutral-700">
                                Body: Bumbu yang kaya rasa, dimasak selama 3
                                jam.
                            </p>
                            <p className="mt-2 font-sans text-sm font-medium text-neutral-600">
                                Label: 12 bahan · 45 menit
                            </p>
                        </div>
                    </div>
                </section>

                {/* Buttons */}
                <section className="mb-10">
                    <h2 className="mb-4 font-serif text-xl text-neutral-800">
                        Buttons
                    </h2>
                    <div className="flex flex-wrap gap-3 rounded-xl border border-neutral-300 bg-white p-6">
                        <button className="rounded-lg bg-primary-500 px-4 py-2 font-sans text-sm font-medium text-primary-100">
                            Primary
                        </button>
                        <button className="rounded-lg bg-secondary-500 px-4 py-2 font-sans text-sm font-medium text-secondary-100">
                            Secondary
                        </button>
                        <button className="rounded-lg bg-neutral-800 px-4 py-2 font-sans text-sm font-medium text-neutral-100">
                            Inverted
                        </button>
                        <button className="rounded-lg border border-primary-500 px-4 py-2 font-sans text-sm font-medium text-primary-500">
                            Outlined
                        </button>
                        <button className="rounded-lg bg-primary-200 px-4 py-2 font-sans text-sm font-medium text-primary-600">
                            Ghost
                        </button>
                    </div>
                </section>

                {/* Badges */}
                <section className="mb-10">
                    <h2 className="mb-4 font-serif text-xl text-neutral-800">
                        Badges
                    </h2>
                    <div className="flex flex-wrap gap-2 rounded-xl border border-neutral-300 bg-white p-6">
                        <span className="rounded-full bg-primary-200 px-3 py-1 font-sans text-xs font-medium text-primary-600">
                            Primary
                        </span>
                        <span className="rounded-full bg-secondary-200 px-3 py-1 font-sans text-xs font-medium text-secondary-600">
                            Secondary
                        </span>
                        <span className="rounded-full bg-tertiary-200 px-3 py-1 font-sans text-xs font-medium text-tertiary-600">
                            Tertiary
                        </span>
                        <span className="rounded-full bg-neutral-300 px-3 py-1 font-sans text-xs font-medium text-neutral-700">
                            Neutral
                        </span>
                        <span className="rounded-full bg-primary-200 px-3 py-1 font-sans text-xs font-medium text-primary-600">
                            🥛 Dairy
                        </span>
                        <span className="rounded-full bg-secondary-200 px-3 py-1 font-sans text-xs font-medium text-secondary-600">
                            🥜 Peanut
                        </span>
                    </div>
                </section>
            </div>
        </>
    );
}
