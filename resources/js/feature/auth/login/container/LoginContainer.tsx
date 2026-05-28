import { Head, Link, useForm } from '@inertiajs/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    // Refs
    const visualSideRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const brandRef = useRef<HTMLDivElement>(null);
    const heroTextRef = useRef<HTMLDivElement>(null);
    const dotsRef = useRef<HTMLDivElement>(null);
    const copyrightRef = useRef<HTMLDivElement>(null);
    const formSideRef = useRef<HTMLElement>(null);
    const mobileBrandRef = useRef<HTMLDivElement>(null);
    const formHeaderRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const socialBtnRef = useRef<HTMLButtonElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const emailFieldRef = useRef<HTMLDivElement>(null);
    const passwordFieldRef = useRef<HTMLDivElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);
    const footerLinkRef = useRef<HTMLDivElement>(null);
    const policyRef = useRef<HTMLDivElement>(null);
    const tipCardRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
            visualSideRef.current,
            { x: -80, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.1 },
        )
            .fromTo(
                imgRef.current,
                { scale: 1.08 },
                { scale: 1, duration: 1.6, ease: 'power2.out' },
                '<',
            )
            .fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.8 },
                '-=0.8',
            )
            .fromTo(
                brandRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                '-=0.5',
            )
            .fromTo(
                heroTextRef.current,
                { y: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
                {
                    y: 0,
                    opacity: 1,
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 0.9,
                },
                '-=0.3',
            )
            .fromTo(
                dotsRef.current,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5 },
                '-=0.2',
            )
            .fromTo(
                copyrightRef.current,
                { opacity: 0 },
                { opacity: 0.8, duration: 0.5 },
                '-=0.2',
            )
            .fromTo(
                formSideRef.current,
                { x: 80, opacity: 0 },
                { x: 0, opacity: 1, duration: 1 },
                '-=1.2',
            )
            .fromTo(
                mobileBrandRef.current,
                { y: -16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 },
                '-=0.6',
            )
            .fromTo(
                formHeaderRef.current,
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                '-=0.4',
            )
            .fromTo(
                cardRef.current,
                { y: 32, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 0.7 },
                '-=0.3',
            )
            .fromTo(
                socialBtnRef.current,
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 },
                '-=0.4',
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
                [emailFieldRef.current, passwordFieldRef.current],
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 },
                '-=0.2',
            )
            .fromTo(
                submitBtnRef.current,
                { y: 16, opacity: 0, scale: 0.97 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5 },
                '-=0.1',
            )
            .fromTo(
                [footerLinkRef.current, policyRef.current],
                { y: 12, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
                '-=0.1',
            )
            .fromTo(
                tipCardRef.current,
                { x: 40, opacity: 0, scale: 0.95 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: 'back.out(1.4)',
                },
                '-=0.2',
            );

        // Floating tip card loop
        gsap.to(tipCardRef.current, {
            y: -6,
            duration: 2.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 2,
        });
    }, []);

    const handleBtnHover = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
        gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
    };
    const handleBtnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
        });
        e.currentTarget.style.filter = 'brightness(1)';
    };

    const shakeField = (el: HTMLElement | null) => {
        if (!el) {
            return;
        }

        gsap.fromTo(
            el,
            { x: -8 },
            { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' },
        );
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/login', {
            onError: () => {
                shakeField(emailFieldRef.current);
                shakeField(passwordFieldRef.current);
            },
        });
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) =>
        gsap.to(e.currentTarget, {
            scale: 1.012,
            duration: 0.2,
            ease: 'power2.out',
        });
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
        gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
        });

    // Design tokens — exact values from the HTML/CSS
    const c = {
        primary: '#884521',
        primaryHov: '#733512',
        bg: '#fbf9f4',
        surface: '#f5f3ee',
        border: '#d9c2b8',
        text: '#1b1c19',
        muted: '#54433c',
        placeholder: '#86736b',
        error: '#ba1a1a',
        secondary: '#dce7c5',
        secBorder: '#c0cbaa',
        secText: '#5e684d',
        secTitle: '#416231',
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        borderRadius: '0.75rem',
        border: `1px solid ${c.border}`,
        backgroundColor: c.surface,
        color: c.text,
        padding: '0.75rem 1rem 0.75rem 3rem',
        outline: 'none',
        fontSize: '0.9rem',
        fontFamily: 'Manrope, sans-serif',
        boxShadow: 'inset 0 2px 4px rgba(74,60,48,0.05)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: c.muted,
        fontFamily: 'Manrope, sans-serif',
        marginBottom: '0.5rem',
    };

    return (
        <>
            <Head title="Sign In — RootCook" />

            <main
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: c.bg,
                    color: c.text,
                    fontFamily: 'Manrope, sans-serif',
                }}
            >
                {/* ── VISUAL SIDE ── */}
                <div
                    ref={visualSideRef}
                    className="relative hidden overflow-hidden md:flex md:w-5/12 lg:w-1/2"
                >
                    <img
                        ref={imgRef}
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTPYSduBbAU_NOvWZAT16zj540Uh01Blfvbx9Z7mdTdC0Sq5U8qMirZrXhDbR-T2J9alKQJCz7LUQvna6zN0zhMfMkK_kSIUtInGSexgsjQrq4wAyHkPLoGZH1vR3c6BFJ-zcENCXzE5suO06IyWKaCK7YUqhi9T4wb1cQU2vxuK8yIVTv6lU53oUoItXfc5eyfJTKdE3AutkrJFfLBnBwOnyy7nLHT0fz3p1OBur6aYrd8AUOGjxEbxRdIL2CULJV-cEJ9zCv1TM"
                        alt="Sunlit kitchen pantry"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'grayscale(20%) sepia(10%)',
                        }}
                    />
                    <div
                        ref={overlayRef}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(to top, rgba(136,69,33,0.45) 0%, transparent 100%)`,
                            opacity: 0,
                        }}
                    />
                    <div
                        style={{
                            position: 'relative',
                            zIndex: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                            padding: '5rem',
                            color: 'white',
                        }}
                    >
                        {/* Brand */}
                        <div
                            ref={brandRef}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                opacity: 0,
                            }}
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{
                                    fontSize: '2rem',
                                    fontVariationSettings: "'FILL' 1",
                                }}
                            >
                                restaurant
                            </span>
                            <h1
                                style={{
                                    fontFamily: 'Libre Caslon Text, serif',
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    letterSpacing: '-0.01em',
                                }}
                            >
                                RootCook
                            </h1>
                        </div>

                        {/* Hero */}
                        <div
                            ref={heroTextRef}
                            style={{
                                maxWidth: '28rem',
                                opacity: 0,
                                clipPath: 'inset(100% 0 0 0)',
                            }}
                        >
                            <h2
                                style={{
                                    fontFamily: 'Libre Caslon Text, serif',
                                    fontSize: '3rem',
                                    lineHeight: 1.15,
                                    fontWeight: 700,
                                    marginBottom: '1rem',
                                }}
                            >
                                Nurture your culinary roots.
                            </h2>
                            <p
                                style={{
                                    fontSize: '1.1rem',
                                    opacity: 0.9,
                                    lineHeight: 1.6,
                                }}
                            >
                                Join a community of home cooks bridging
                                traditional wisdom with modern speed.
                            </p>
                            <div
                                ref={dotsRef}
                                style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    marginTop: '1.5rem',
                                    opacity: 0,
                                }}
                            >
                                <div
                                    style={{
                                        width: '2rem',
                                        height: '6px',
                                        borderRadius: 9999,
                                        backgroundColor:
                                            'rgba(255,255,255,0.55)',
                                    }}
                                />
                                <div
                                    style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: 9999,
                                        backgroundColor:
                                            'rgba(255,255,255,0.55)',
                                    }}
                                />
                                <div
                                    style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: 9999,
                                        backgroundColor:
                                            'rgba(255,255,255,0.55)',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Copyright */}
                        <div
                            ref={copyrightRef}
                            style={{
                                fontSize: '0.68rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                fontFamily: 'Manrope, sans-serif',
                                opacity: 0,
                            }}
                        >
                            © 2024 University Culinary Arts Team
                        </div>
                    </div>
                </div>

                {/* ── FORM SIDE ── */}
                <section
                    ref={formSideRef}
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: c.bg,
                        opacity: 0,
                    }}
                    className="p-6 md:p-[5rem]"
                >
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '480px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                        }}
                    >
                        {/* Mobile brand */}
                        <div
                            ref={mobileBrandRef}
                            className="md:hidden"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem',
                                opacity: 0,
                            }}
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{
                                    fontSize: '3rem',
                                    color: c.primary,
                                    fontVariationSettings: "'FILL' 1",
                                }}
                            >
                                restaurant
                            </span>
                            <span
                                style={{
                                    fontFamily: 'Libre Caslon Text, serif',
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: c.primary,
                                }}
                            >
                                RootCook
                            </span>
                        </div>

                        {/* Header */}
                        <div
                            ref={formHeaderRef}
                            style={{ opacity: 0 }}
                            className="text-center"
                        >
                            <h2
                                style={{
                                    fontFamily: 'Libre Caslon Text, serif',
                                    fontSize: '2.25rem',
                                    fontWeight: 600,
                                    color: c.primary,
                                    marginBottom: '0.5rem',
                                }}
                            >
                                Welcome Back
                            </h2>
                            <p style={{ color: c.muted, fontSize: '0.95rem' }}>
                                Sign in to your account or create a new one to
                                start cooking.
                            </p>
                        </div>

                        {/* Card */}
                        <div
                            ref={cardRef}
                            style={{
                                backgroundColor: c.bg,
                                border: `1px solid ${c.border}`,
                                borderRadius: '0.75rem',
                                padding: '2rem',
                                boxShadow: '0 4px 20px rgba(74,60,48,0.08)',
                                opacity: 0,
                            }}
                        >
                            {/* Google */}
                            <button
                                ref={socialBtnRef}
                                type="button"
                                onMouseMove={handleBtnHover}
                                onMouseLeave={handleBtnLeave}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.75rem',
                                    border: `1px solid ${c.border}`,
                                    backgroundColor: '#ffffff',
                                    color: c.text,
                                    fontSize: '0.9rem',
                                    fontFamily: 'Manrope, sans-serif',
                                    cursor: 'pointer',
                                    opacity: 0,
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Continue with Google
                            </button>

                            {/* Divider */}
                            <div
                                ref={dividerRef}
                                style={{
                                    position: 'relative',
                                    margin: '1.5rem 0',
                                    opacity: 0,
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '100%',
                                            borderTop: `1px solid ${c.border}`,
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        position: 'relative',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span
                                        style={{
                                            backgroundColor: c.bg,
                                            padding: '0 1rem',
                                            fontSize: '0.68rem',
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            color: c.muted,
                                            fontFamily: 'Manrope, sans-serif',
                                        }}
                                    >
                                        or use email
                                    </span>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1.25rem',
                                    }}
                                >
                                    {/* Email */}
                                    <div
                                        ref={emailFieldRef}
                                        style={{ opacity: 0 }}
                                    >
                                        <label
                                            htmlFor="email"
                                            style={labelStyle}
                                        >
                                            Email Address
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <span
                                                className="material-symbols-outlined"
                                                style={{
                                                    position: 'absolute',
                                                    left: '1rem',
                                                    top: '50%',
                                                    transform:
                                                        'translateY(-50%)',
                                                    color: c.placeholder,
                                                    fontSize: '1.2rem',
                                                    pointerEvents: 'none',
                                                }}
                                            >
                                                mail
                                            </span>
                                            <input
                                                id="email"
                                                type="email"
                                                required
                                                placeholder="chef@rootcook.com"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                style={inputStyle}
                                            />
                                        </div>
                                        {errors.email && (
                                            <p
                                                style={{
                                                    color: c.error,
                                                    fontSize: '0.75rem',
                                                    marginTop: '0.25rem',
                                                }}
                                            >
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div
                                        ref={passwordFieldRef}
                                        style={{ opacity: 0 }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '0.5rem',
                                            }}
                                        >
                                            <label
                                                htmlFor="password"
                                                style={{
                                                    ...labelStyle,
                                                    marginBottom: 0,
                                                }}
                                            >
                                                Password
                                            </label>
                                            <a
                                                href="#"
                                                style={{
                                                    fontSize: '0.75rem',
                                                    color: c.primary,
                                                    fontWeight: 700,
                                                    textDecoration: 'none',
                                                    fontFamily:
                                                        'Manrope, sans-serif',
                                                }}
                                            >
                                                Forgot?
                                            </a>
                                        </div>
                                        <div style={{ position: 'relative' }}>
                                            <span
                                                className="material-symbols-outlined"
                                                style={{
                                                    position: 'absolute',
                                                    left: '1rem',
                                                    top: '50%',
                                                    transform:
                                                        'translateY(-50%)',
                                                    color: c.placeholder,
                                                    fontSize: '1.2rem',
                                                    pointerEvents: 'none',
                                                }}
                                            >
                                                lock
                                            </span>
                                            <input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                required
                                                placeholder="••••••••"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        'password',
                                                        e.target.value,
                                                    )
                                                }
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                style={{
                                                    ...inputStyle,
                                                    paddingRight: '3rem',
                                                }}
                                            />
                                            <button
                                                type="button"
                                                tabIndex={-1}
                                                onClick={() =>
                                                    setShowPassword((p) => !p)
                                                }
                                                style={{
                                                    position: 'absolute',
                                                    right: '1rem',
                                                    top: '50%',
                                                    transform:
                                                        'translateY(-50%)',
                                                    color: c.placeholder,
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: 0,
                                                }}
                                            >
                                                <span
                                                    className="material-symbols-outlined"
                                                    style={{
                                                        fontSize: '1.2rem',
                                                    }}
                                                >
                                                    {showPassword
                                                        ? 'visibility_off'
                                                        : 'visibility'}
                                                </span>
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p
                                                style={{
                                                    color: c.error,
                                                    fontSize: '0.75rem',
                                                    marginTop: '0.25rem',
                                                }}
                                            >
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <button
                                        ref={submitBtnRef}
                                        type="submit"
                                        disabled={processing}
                                        onMouseMove={handleBtnHover}
                                        onMouseLeave={handleBtnLeave}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '0.75rem',
                                            backgroundColor: c.primary,
                                            color: '#ffffff',
                                            fontFamily: 'Manrope, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            border: 'none',
                                            cursor: processing
                                                ? 'not-allowed'
                                                : 'pointer',
                                            opacity: processing ? 0.6 : 1,
                                            boxShadow:
                                                '0 4px 20px rgba(136,69,33,0.25)',
                                            transition: 'filter 0.15s',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!processing) {
                                                e.currentTarget.style.filter =
                                                    'brightness(1.1)';
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.currentTarget.style.transform =
                                                'scale(0.98)';
                                        }}
                                        onMouseUp={(e) => {
                                            e.currentTarget.style.transform =
                                                'scale(1)';
                                        }}
                                    >
                                        {processing ? (
                                            <span
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem',
                                                }}
                                            >
                                                <svg
                                                    style={{
                                                        width: '1rem',
                                                        height: '1rem',
                                                        animation:
                                                            'spin 1s linear infinite',
                                                    }}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <circle
                                                        style={{
                                                            opacity: 0.25,
                                                        }}
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        style={{
                                                            opacity: 0.75,
                                                        }}
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8H4z"
                                                    />
                                                </svg>
                                                Signing In...
                                            </span>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Footer inside card */}
                            <div
                                ref={footerLinkRef}
                                style={{
                                    marginTop: '2rem',
                                    textAlign: 'center',
                                    opacity: 0,
                                }}
                            >
                                <p
                                    style={{
                                        color: c.muted,
                                        fontSize: '0.9rem',
                                        fontFamily: 'Manrope, sans-serif',
                                    }}
                                >
                                    Don't have an account?{' '}
                                    <Link
                                        href="/register"
                                        style={{
                                            color: c.primary,
                                            fontWeight: 700,
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Create an account
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Policy */}
                        <div
                            ref={policyRef}
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '1.5rem',
                                opacity: 0,
                            }}
                            className="flex items-center justify-center"
                        >
                            {[
                                'Privacy Policy',
                                'Terms of Service',
                                'Cookie Policy',
                            ].map((label) => (
                                <a
                                    key={label}
                                    href="#"
                                    style={{
                                        fontSize: '0.75rem',
                                        color: c.placeholder,
                                        textDecoration: 'none',
                                        fontFamily: 'Manrope, sans-serif',
                                    }}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </>
    );
}
