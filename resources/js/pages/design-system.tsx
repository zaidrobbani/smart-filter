import { Head } from '@inertiajs/react';

const colors = {
    primary: ['#FDF2EC','#F5E8DF','#E8C9B0','#D4956A','#A65D37','#7A3D1E','#4A1E08','#2A0E02'],
    secondary: ['#F0F2EC','#E1E6D9','#C3CCBB','#95A285','#707A5E','#4D5840','#2E3826','#161C10'],
    tertiary: ['#FDF6F0','#F7EDE3','#EDD4BA','#E3B98E','#D99872','#B87340','#8C5230','#5C3018'],
    neutral: ['#FDFCFA','#F9F7F2','#ECEAE4','#D4CFC6','#B0A898','#8C7B6E','#4A3C30','#1C1410'],
};

const stops = ['100','200','300','400','500','600','700','800'];

export default function DesignSystem() {
    return (
        <>
            <Head title="Design System" />
            <div className="min-h-screen bg-neutral-200 p-8">
                <h1 className="font-serif text-3xl text-neutral-800 mb-2">Design System</h1>
                <p className="text-neutral-600 font-sans mb-8">Smart Filter — Color, Typography, Components</p>

                {/* Colors */}
                <section className="mb-10">
                    <h2 className="font-serif text-xl text-neutral-800 mb-4">Color Palette</h2>
                    <div className="space-y-3">
                        {Object.entries(colors).map(([name, shades]) => (
                            <div key={name}>
                                <p className="text-xs font-sans font-medium text-neutral-600 mb-1 capitalize">{name}</p>
                                <div className="flex rounded-lg overflow-hidden">
                                    {shades.map((hex, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 h-12 flex items-end justify-center pb-1"
                                            style={{ backgroundColor: hex }}
                                        >
                                            <span className="text-[10px] font-medium" style={{ color: i < 4 ? shades[6] : shades[1] }}>
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
                    <h2 className="font-serif text-xl text-neutral-800 mb-4">Typography</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl border border-neutral-300 p-6">
                            <p className="text-xs text-neutral-600 mb-2">Headline · Libre Caslon Text</p>
                            <p className="font-serif text-5xl text-neutral-800">Aa</p>
                            <p className="font-serif text-2xl text-neutral-800 mt-3">Resep Pilihan</p>
                            <p className="font-serif text-lg italic text-neutral-600 mt-1">50 resep lezat menanti</p>
                        </div>
                        <div className="bg-white rounded-xl border border-neutral-300 p-6">
                            <p className="text-xs text-neutral-600 mb-2">Body & Label · Manrope</p>
                            <p className="font-sans text-5xl font-medium text-neutral-800">Aa</p>
                            <p className="font-sans text-base text-neutral-700 mt-3 leading-relaxed">Body: Bumbu yang kaya rasa, dimasak selama 3 jam.</p>
                            <p className="font-sans text-sm font-medium text-neutral-600 mt-2">Label: 12 bahan · 45 menit</p>
                        </div>
                    </div>
                </section>

                {/* Buttons */}
                <section className="mb-10">
                    <h2 className="font-serif text-xl text-neutral-800 mb-4">Buttons</h2>
                    <div className="bg-white rounded-xl border border-neutral-300 p-6 flex flex-wrap gap-3">
                        <button className="px-4 py-2 rounded-lg bg-primary-500 text-primary-100 text-sm font-medium font-sans">Primary</button>
                        <button className="px-4 py-2 rounded-lg bg-secondary-500 text-secondary-100 text-sm font-medium font-sans">Secondary</button>
                        <button className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-100 text-sm font-medium font-sans">Inverted</button>
                        <button className="px-4 py-2 rounded-lg border border-primary-500 text-primary-500 text-sm font-medium font-sans">Outlined</button>
                        <button className="px-4 py-2 rounded-lg bg-primary-200 text-primary-600 text-sm font-medium font-sans">Ghost</button>
                    </div>
                </section>

                {/* Badges */}
                <section className="mb-10">
                    <h2 className="font-serif text-xl text-neutral-800 mb-4">Badges</h2>
                    <div className="bg-white rounded-xl border border-neutral-300 p-6 flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary-200 text-primary-600 text-xs font-medium font-sans">Primary</span>
                        <span className="px-3 py-1 rounded-full bg-secondary-200 text-secondary-600 text-xs font-medium font-sans">Secondary</span>
                        <span className="px-3 py-1 rounded-full bg-tertiary-200 text-tertiary-600 text-xs font-medium font-sans">Tertiary</span>
                        <span className="px-3 py-1 rounded-full bg-neutral-300 text-neutral-700 text-xs font-medium font-sans">Neutral</span>
                        <span className="px-3 py-1 rounded-full bg-primary-200 text-primary-600 text-xs font-medium font-sans">🥛 Dairy</span>
                        <span className="px-3 py-1 rounded-full bg-secondary-200 text-secondary-600 text-xs font-medium font-sans">🥜 Peanut</span>
                    </div>
                </section>
            </div>
        </>
    );
}