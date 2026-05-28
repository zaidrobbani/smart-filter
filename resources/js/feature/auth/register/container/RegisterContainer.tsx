import { Head, Link, useForm } from '@inertiajs/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const leftRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLHeadingElement>(null);
    const formSectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const googleBtnRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const fieldsRef = useRef<HTMLDivElement>(null);
    const submitRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const accentRef = useRef<HTMLDivElement>(null);

    // Animasi masuk
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(
            leftRef.current,
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1 },
        )
            .fromTo(
                logoRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                '-=0.4',
            )
            .fromTo(
                quoteRef.current,
                { y: 40, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
                {
                    y: 0,
                    opacity: 1,
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 0.9,
                },
                '-=0.3',
            )
            .fromTo(
                formSectionRef.current,
                { x: 60, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.9 },
                '-=0.8',
            )
            .fromTo(
                headerRef.current,
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                '-=0.5',
            )
            .fromTo(
                googleBtnRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 },
                '-=0.3',
            )
            .fromTo(
                dividerRef.current,
                { scaleX: 0, opacity: 0 },
                {
                    scaleX: 1,
                    opacity: 1,
                    duration: 0.5,
                    transformOrigin: 'center',
                },
                '-=0.2',
            )
            .fromTo(
                fieldsRef.current ? Array.from(fieldsRef.current.children) : [],
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
                '-=0.2',
            )
            .fromTo(
                submitRef.current,
                { y: 16, opacity: 0, scale: 0.97 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5 },
                '-=0.1',
            )
            .fromTo(
                [footerRef.current, accentRef.current],
                { y: 12, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
                '-=0.1',
            );
    }, []);

    // Animasi mengambang untuk accent
    useEffect(() => {
        gsap.to(accentRef.current, {
            y: -8,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
        });
    }, []);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        gsap.fromTo(
            fieldsRef.current,
            { x: -6 },
            { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' },
        );
        post('/register');
    }

    const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        });
    };

    return (
        <>
            <Head title="Create Your Account — RootCook" />

            <main className="flex min-h-screen flex-col md:flex-row">
                {/* Visual Anchor (Left Side) */}
                <section
                    ref={leftRef}
                    className="relative hidden overflow-hidden bg-neutral-300 md:flex md:w-1/2"
                    style={{ opacity: 0 }}
                >
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/20 to-transparent" />
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn6CjLTarQ1CHOL6VjJxuoKuSHXUYuHsUsngZgPAbFDODAZ29sM-Ug6oq24cUfU-G9V2B5UBBveA3QSLZaPaz3Gmb39kfbaEIQ-Q25NyZ-BUGaMyt0GNexwt_11GCkEzJ34Nc-UHbqQuA4j_drOSZI9Xufw09sxLi59RBJNahBmubSZr9J6gstlfzD1_iv7QK_4OM42cPeQTmNOfDyYy2iybWjNQtEfT6sIOQwXGx4VYN9nhFOYuCOrkYn_ywb-42-3SRdZtyBnjE"
                        alt="A sun-drenched, rustic kitchen pantry"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{
                            filter: 'grayscale(20%) sepia(10%) contrast(1.05)',
                        }}
                    />
                    <div className="relative z-20 mt-auto mb-20 p-20">
                        <div
                            ref={logoRef}
                            className="mb-2 flex items-center gap-2"
                            style={{ opacity: 0 }}
                        >
                            <span className="material-symbols-outlined rounded-full bg-primary-600/60 p-2 text-white">
                                nest_eco_leaf
                            </span>
                            <span className="font-serif text-2xl font-bold text-white">
                                RootCook
                            </span>
                        </div>
                        <h2
                            ref={quoteRef}
                            className="max-w-md font-serif text-5xl leading-tight text-white"
                            style={{
                                opacity: 0,
                                clipPath: 'inset(100% 0% 0% 0%)',
                            }}
                        >
                            Return to the roots of cooking.
                        </h2>
                    </div>
                </section>

                {/* Registration Form (Right Side) */}
                <section
                    ref={formSectionRef}
                    className="flex flex-1 items-center justify-center bg-background p-6 md:p-20"
                    style={{ opacity: 0 }}
                >
                    <div className="w-full max-w-[480px]">
                        {/* Mobile Header */}
                        <header
                            ref={headerRef}
                            className="mb-12"
                            style={{ opacity: 0 }}
                        >
                            <div className="mb-6 flex items-center gap-2 md:hidden">
                                <span className="material-symbols-outlined text-3xl text-primary">
                                    nest_eco_leaf
                                </span>
                                <span className="font-serif text-2xl font-bold text-primary">
                                    RootCook
                                </span>
                            </div>
                            <h1 className="mb-2 font-serif text-3xl text-foreground md:text-4xl">
                                Create Your Account
                            </h1>
                            <p className="text-muted-foreground">
                                Join our community of home cooks and start
                                saving your favorite recipes.
                            </p>
                        </header>

                        {/* Social Sign Up */}
                        <div
                            ref={googleBtnRef}
                            className="mb-6"
                            style={{ opacity: 0 }}
                        >
                            <button
                                type="button"
                                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-border px-4 py-3 text-foreground transition-colors duration-200 hover:bg-neutral-300"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Sign up with Google
                            </button>
                        </div>

                        {/* Divider */}
                        <div
                            ref={dividerRef}
                            className="mb-6 flex items-center gap-4 text-muted-foreground"
                            style={{ opacity: 0 }}
                        >
                            <div className="h-px flex-grow bg-border" />
                            <span className="text-xs font-bold tracking-widest whitespace-nowrap text-muted-foreground uppercase">
                                or continue with email
                            </span>
                            <div className="h-px flex-grow bg-border" />
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit}>
                            <div ref={fieldsRef} className="space-y-6">
                                {/* Username */}
                                <div
                                    className="space-y-2"
                                    style={{ opacity: 0 }}
                                >
                                    <label
                                        htmlFor="username"
                                        className="block text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                    >
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        placeholder="chef_root"
                                        value={data.username}
                                        onChange={(e) =>
                                            setData('username', e.target.value)
                                        }
                                        className="w-full rounded-xl border border-border bg-neutral-100 px-4 py-3 text-foreground shadow-inner transition-all placeholder:text-neutral-500 focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                    />
                                    {errors.username && (
                                        <p className="text-sm text-destructive">
                                            {errors.username}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div
                                    className="space-y-2"
                                    style={{ opacity: 0 }}
                                >
                                    <label
                                        htmlFor="email"
                                        className="block text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="hello@example.com"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className="w-full rounded-xl border border-border bg-neutral-100 px-4 py-3 text-foreground shadow-inner transition-all placeholder:text-neutral-500 focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Grid */}
                                <div
                                    className="grid grid-cols-1 gap-4 md:grid-cols-2"
                                    style={{ opacity: 0 }}
                                >
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="password"
                                            className="block text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                        >
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-border bg-neutral-100 px-4 py-3 text-foreground shadow-inner transition-all placeholder:text-neutral-500 focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                        />
                                        {errors.password && (
                                            <p className="text-sm text-destructive">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="password_confirmation"
                                            className="block text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type="password"
                                            required
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    'password_confirmation',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-border bg-neutral-100 px-4 py-3 text-foreground shadow-inner transition-all placeholder:text-neutral-500 focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                        />
                                        {errors.password_confirmation && (
                                            <p className="text-sm text-destructive">
                                                {errors.password_confirmation}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit */}
                                <div
                                    ref={submitRef}
                                    className="pt-4"
                                    style={{ opacity: 0 }}
                                >
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        onMouseMove={handleButtonHover}
                                        onMouseLeave={handleButtonLeave}
                                        className="w-full cursor-pointer rounded-xl bg-primary-500 py-4 text-lg font-semibold text-primary-foreground shadow-md transition-all duration-150 hover:bg-primary active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg
                                                    className="h-4 w-4 animate-spin"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8H4z"
                                                    />
                                                </svg>
                                                Creating Account…
                                            </span>
                                        ) : (
                                            'Create Account'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* Footer */}
                        <footer
                            ref={footerRef}
                            className="mt-12 text-center"
                            style={{ opacity: 0 }}
                        >
                            <p className="text-muted-foreground">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="font-bold text-primary decoration-2 underline-offset-4 transition-all hover:underline"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </footer>

                        {/* Visual Accent */}
                        <div
                            ref={accentRef}
                            className="mt-12 flex justify-center opacity-30"
                            style={{ opacity: 0 }}
                        >
                            <span className="material-symbols-outlined text-4xl text-neutral-500">
                                local_florist
                            </span>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
