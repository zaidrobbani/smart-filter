import MainLayout from '@/layout/MainLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { Clock3, RotateCcw, Trash2 } from 'lucide-react';

export default function HistoryPage() {
    const { histories } = usePage().props as any;

    const clearHistory = () => {
        router.delete('/history/clear');
    };

    return (
        <MainLayout>
            <main className="mx-auto min-h-screen max-w-7xl px-6 pt-36 pb-24">
                <div className="flex flex-col gap-6 border-b border-[#DED6CF] pb-10 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="font-serif text-5xl font-bold tracking-tight text-[#8B451F] sm:text-6xl">
                            Cooking History
                        </h1>

                        <p className="mt-3 text-lg text-[#6A625C] sm:text-xl">
                            Revisit the flavors you've discovered.
                        </p>
                    </div>

                    {histories.length > 0 && (
                        <button
                            onClick={clearHistory}
                            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#C88962] px-5 text-sm font-medium text-[#8B451F] transition-all hover:bg-[#F1E7DF]"
                        >
                            <Trash2 size={16} />
                            Clear History
                        </button>
                    )}
                </div>

                {histories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-40 text-center">
                        <h2 className="font-serif text-3xl font-bold text-[#8B451F]">
                            No History Yet
                        </h2>

                        <p className="mt-3 max-w-md text-[#746B64]">
                            Start exploring recipes and your recently viewed
                            dishes will appear here.
                        </p>

                        <Link
                            href="/recipes"
                            className="mt-8 rounded-xl bg-[#8B451F] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            Browse Recipes
                        </Link>
                    </div>
                ) : (
                    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                        {histories.map((history: any) => (
                            <Link
                                key={history.id}
                                href={`/recipes/${history.recipe_id}`}
                                className="group overflow-hidden rounded-[28px] border border-[#DDD3CC] bg-[#FBF8F5] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={
                                            history.recipe?.image ||
                                            'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80'
                                        }
                                        alt={
                                            history.recipe?.title || 'Recipe'
                                        }
                                        className="h-[280px] w-full object-cover transition duration-500 group-hover:scale-105"
                                    />

                                    <div className="absolute top-4 right-4 rounded-full bg-[#F4EEE8]/95 px-4 py-1 text-sm font-medium text-[#5B544E] backdrop-blur">
                                        {new Date(
                                            history.viewed_at,
                                        ).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="p-7">
                                    <div className="inline-flex rounded-md bg-[#EEE7E1] px-3 py-1 text-xs tracking-wide text-[#7B736D] uppercase">
                                        Recently Viewed
                                    </div>

                                    <h2 className="mt-5 line-clamp-2 font-serif text-3xl leading-tight font-bold text-[#26221F]">
                                        {history.recipe?.title ||
                                            `Recipe #${history.recipe_id}`}
                                    </h2>

                                    <p className="mt-4 line-clamp-3 text-base leading-relaxed text-[#5F5752]">
                                        {history.recipe?.description}
                                    </p>

                                    <div className="mt-7 border-t border-[#E3D9D2] pt-5">
                                        <div className="flex items-center justify-between text-sm text-[#766C65]">
                                            <div className="flex items-center gap-2">
                                                <Clock3 size={16} />
                                                {history.recipe
                                                    ?.cookingTime || 0}{' '}
                                                mins
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <RotateCcw size={16} />
                                                Last viewed{' '}
                                                {new Date(
                                                    history.viewed_at,
                                                ).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </MainLayout>
    );
}