import { Link, router, usePage } from '@inertiajs/react';
import { Clock3, RotateCcw, Trash2, Search, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import MainLayout from '@/layout/MainLayout';

interface Recipe {
    id: number;
    title: string;
    image?: string;
}

interface History {
    id: number;
    recipe: Recipe;
    viewed_at: string;
}

interface PageProps {
    histories: History[];
}

export default function HistoryPage() {
    const { histories = [] } = usePage().props as unknown as PageProps;
    const [searchQuery, setSearchQuery] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [filteredHistories, setFilteredHistories] =
        useState<History[]>(histories);

    // Sync filteredHistories when histories prop changes (after Inertia visit)
    useEffect(() => {
        applyFilter(histories, searchQuery, fromDate, toDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [histories]);

    const applyFilter = (
        source: History[],
        query: string,
        from: string,
        to: string,
    ) => {
        let filtered = source;

        if (query) {
            filtered = filtered.filter((h) =>
                h.recipe?.title.toLowerCase().includes(query.toLowerCase()),
            );
        }

        if (from) {
            filtered = filtered.filter((h) => {
                const viewedDate = new Date(h.viewed_at);
                const fromDate = new Date(from);
                return viewedDate >= fromDate;
            });
        }

        if (to) {
            filtered = filtered.filter((h) => {
                const viewedDate = new Date(h.viewed_at);
                const toDate = new Date(to);
                toDate.setHours(23, 59, 59, 999);
                return viewedDate <= toDate;
            });
        }

        setFilteredHistories(filtered);
    };

    const handleFilter = () => {
        applyFilter(histories, searchQuery, fromDate, toDate);
    };

    const handleDeleteItem = (id: number) => {
        router.delete(`/history/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('History item deleted');
            },
            onError: () => {
                toast.error('Failed to delete history item');
            },
        });
    };

    const handleClearAll = () => {
        if (
            window.confirm(
                'Apakah Anda yakin ingin menghapus semua history? Tindakan ini tidak dapat dibatalkan.',
            )
        ) {
            router.delete('/history/clear', {
                onSuccess: () => {
                    toast.success('All history cleared');
                },
                onError: () => {
                    toast.error('Failed to clear history');
                },
            });
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleFilter();
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setFromDate('');
        setToDate('');
        setFilteredHistories(histories);
    };

    return (
        <MainLayout>
            <main className="mx-auto min-h-screen max-w-7xl px-6 pt-36 pb-24">
                {/* Header */}
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
                            onClick={handleClearAll}
                            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#C88962] px-5 text-sm font-medium text-[#8B451F] transition-all hover:bg-[#F1E7DF]"
                        >
                            <Trash2 size={16} />
                            Clear All History
                        </button>
                    )}
                </div>

                {/* Filters */}
                {histories.length > 0 && (
                    <div className="my-8 rounded-lg border border-[#DED6CF] bg-[#FEF9F3] p-6">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="space-y-4"
                        >
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#6A625C]">
                                        Search Recipes
                                    </label>
                                    <div className="relative">
                                        <Search
                                            size={18}
                                            className="absolute top-3 left-3 text-[#C88962]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Cari recipe..."
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            className="w-full rounded-lg border border-[#DED6CF] bg-white py-2 pr-4 pl-10 text-sm text-[#3D3D3D] placeholder-[#9A8F8A] focus:border-[#C88962] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#6A625C]">
                                        From Date
                                    </label>
                                    <div className="relative">
                                        <Calendar
                                            size={18}
                                            className="absolute top-3 left-3 text-[#C88962]"
                                        />
                                        <input
                                            type="date"
                                            value={fromDate}
                                            onChange={(e) =>
                                                setFromDate(e.target.value)
                                            }
                                            className="w-full rounded-lg border border-[#DED6CF] bg-white py-2 pr-4 pl-10 text-sm text-[#3D3D3D] focus:border-[#C88962] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#6A625C]">
                                        To Date
                                    </label>
                                    <div className="relative">
                                        <Calendar
                                            size={18}
                                            className="absolute top-3 left-3 text-[#C88962]"
                                        />
                                        <input
                                            type="date"
                                            value={toDate}
                                            onChange={(e) =>
                                                setToDate(e.target.value)
                                            }
                                            className="w-full rounded-lg border border-[#DED6CF] bg-white py-2 pr-4 pl-10 text-sm text-[#3D3D3D] focus:border-[#C88962] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-end gap-2">
                                    <button
                                        type="submit"
                                        className="w-full rounded-lg bg-[#8B451F] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#6B3515]"
                                    >
                                        Apply Filters
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleResetFilters}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-[#DED6CF] bg-white px-4 py-2 text-sm font-medium text-[#8B451F] transition hover:bg-[#FEF9F3]"
                                    >
                                        <RotateCcw size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* List or Empty State */}
                {filteredHistories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-40 text-center">
                        {histories.length > 0 ? (
                            <>
                                <h2 className="font-serif text-3xl font-bold text-[#8B451F]">
                                    No Matching History
                                </h2>
                                <p className="mt-3 max-w-md text-[#746B64]">
                                    No recipes match your current filters. Try
                                    adjusting your search or date range.
                                </p>
                                <button
                                    onClick={handleResetFilters}
                                    className="mt-8 flex items-center gap-2 rounded-xl border border-[#C88962] px-6 py-3 text-sm font-medium text-[#8B451F] transition hover:bg-[#F1E7DF]"
                                >
                                    <RotateCcw size={16} />
                                    Reset Filters
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="font-serif text-3xl font-bold text-[#8B451F]">
                                    No History Yet
                                </h2>
                                <p className="mt-3 max-w-md text-[#746B64]">
                                    Start exploring recipes and your recently
                                    viewed dishes will appear here.
                                </p>
                                <Link
                                    href="/recipes"
                                    className="mt-8 rounded-xl bg-[#8B451F] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                                >
                                    Explore Recipes
                                </Link>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredHistories.map((history) => (
                            <div
                                key={history.id}
                                className="flex items-center justify-between rounded-lg border border-[#DED6CF] bg-white p-4 transition hover:shadow-md"
                            >
                                <Link
                                    href={`/recipes/${history.recipe.id}`}
                                    className="flex flex-1 items-center gap-4"
                                >
                                    {history.recipe.image && (
                                        <img
                                            src={history.recipe.image}
                                            alt={history.recipe.title}
                                            className="h-20 w-20 rounded-lg object-cover"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-[#3D3D3D] hover:text-[#8B451F]">
                                            {history.recipe.title}
                                        </h3>
                                        <div className="mt-1 flex items-center gap-2 text-sm text-[#6A625C]">
                                            <Clock3 size={14} />
                                            <span>
                                                {new Date(
                                                    history.viewed_at,
                                                ).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </Link>

                                <button
                                    onClick={() =>
                                        handleDeleteItem(history.id)
                                    }
                                    className="ml-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#C88962] text-[#8B451F] transition hover:bg-[#FEE8D8]"
                                    title="Delete this history item"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </MainLayout>
    );
}
