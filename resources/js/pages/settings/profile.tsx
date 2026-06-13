'use client';

import { router, usePage } from '@inertiajs/react';
import gsap from 'gsap';
import { Camera, Loader2, UserCircle2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Navbar } from '../../shared/Navbar/Navbar';

interface ProfileFormData {
    name: string;
    email: string;
}

interface PageProps {
    user?: {
        id: number;
        name: string;
        email: string;
        avatar: string | null;
        username: string;
        password_changed_at?: string | null;
    };
    errors?: Record<string, string>;
    toast?: {
        type: 'success' | 'error';
        message: string;
    };
    minPasswordLength?: number;
}

function AvatarImage({
    src,
    alt,
    className,
}: {
    src: string | null;
    alt: string;
    className?: string;
}) {
    const [errored, setErrored] = useState(false);

    if (!src || errored) {
        return <UserCircle2 className={className} strokeWidth={1} />;
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setErrored(true)}
        />
    );
}

export default function ProfilePage() {
    const {
        user: userData,
        toast,
        minPasswordLength = 8,
    } = usePage().props as PageProps;
    const [isEditMode, setIsEditMode] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    // previewUrl is only set when user picks a new image file locally
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { isDirty, errors },
    } = useForm<ProfileFormData>({
        defaultValues: {
            name: userData?.name || '',
            email: userData?.email || '',
        },
    });

    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState<
        Record<string, string>
    >({});

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        reset: resetPassword,
        formState: { errors: passwordFormErrors },
    } = useForm<{
        current_password: string;
        password: string;
        password_confirmation: string;
    }>({
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: '',
        },
    });

    const handlePasswordUpdate = (data: {
        current_password: string;
        password: string;
        password_confirmation: string;
    }) => {
        setIsPasswordLoading(true);
        setPasswordErrors({});

        router.patch(
            '/settings/password',
            {
                current_password: data.current_password,
                password: data.password,
                password_confirmation: data.password_confirmation,
            },
            {
                onSuccess: () => {
                    setIsPasswordLoading(false);
                    setIsPasswordModalOpen(false);
                    resetPassword();
                    showToast('success', 'Password updated successfully!');
                },
                onError: (errors) => {
                    setIsPasswordLoading(false);
                    setPasswordErrors(errors);
                },
            },
        );
    };
    const watchName = useWatch({ control, name: 'name' });
    const watchEmail = useWatch({ control, name: 'email' });

    const sectionRef = useRef<HTMLDivElement>(null);
    const personalInfoRef = useRef<HTMLDivElement>(null);
    const securityRef = useRef<HTMLDivElement>(null);
    const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showToast = (type: 'success' | 'error', message: string) => {
        if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
        }

        setToastMessage({ type, message });
        toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 5000);
    };

    useEffect(() => {
        if (toast) {
            showToast(toast.type, toast.message);
        }

        return () => {
            if (toastTimeoutRef.current) {
                clearTimeout(toastTimeoutRef.current);
            }
        };
    }, [toast]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current?.querySelector('h1') as HTMLElement,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            );

            gsap.fromTo(
                [personalInfoRef.current, securityRef.current],
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power2.out',
                },
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const resetEditState = () => {
        reset();
        setPreviewUrl(null);
        setImageFile(null);
        setIsEditMode(false);
    };

    const onSubmit = (data: ProfileFormData) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('_method', 'PATCH');

        if (imageFile) {
            formData.append('avatar', imageFile);
        }

        router.post('/settings/profile', formData, {
            forceFormData: true,
            onSuccess: () => {
                setIsLoading(false);
                setIsEditMode(false);
                setImageFile(null);
                setPreviewUrl(null);
                reset(data);
                showToast('success', 'Profile updated successfully!');
            },
            onError: () => {
                setIsLoading(false);
                showToast(
                    'error',
                    'Failed to update profile. Please try again.',
                );
            },
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result;

            if (typeof result === 'string') {
                setPreviewUrl(result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleToggle2FA = () => {
        setIs2FAEnabled((prev) => !prev);
        gsap.to('[data-toggle-indicator]', {
            x: is2FAEnabled ? 0 : 20,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    // What to show in the avatar: local preview > server URL > null (fallback icon)
    const displayedAvatar = previewUrl ?? userData?.avatar ?? null;

    const formatLastChanged = (dateString?: string | null) => {
        if (!dateString) {
            return 'Never changed';
        }

        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            if (diffMins < 1) {
                return 'Last changed just now';
            }

            if (diffMins < 60) {
                return `Last changed ${diffMins} minutes ago`;
            }

            if (diffHours < 24) {
                return `Last changed ${diffHours} hours ago`;
            }

            if (diffDays < 30) {
                return `Last changed ${diffDays} days ago`;
            }

            return `Last changed on ${date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}`;
        } catch (e) {
            return `Last changed recently ${e instanceof Error ? e.message : ''}`;
        }
    };

    return (
        <React.Fragment>
            <Navbar />
            <div
                ref={sectionRef}
                className="to-primary-50 mt-12 min-h-screen bg-linear-to-br from-neutral-50 via-neutral-100 py-12"
            >
                {/* Toast Notification */}
                {toastMessage && (
                    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2">
                        <div
                            className={`rounded-lg px-6 py-3 text-white shadow-lg ${
                                toastMessage.type === 'success'
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                            }`}
                        >
                            {toastMessage.message}
                        </div>
                    </div>
                )}

                <div className="mx-auto max-w-2xl px-6 md:px-8">
                    {/* Header */}
                    <h1 className="mb-8 font-serif text-4xl font-bold text-primary-700 md:text-5xl">
                        Account Settings
                    </h1>

                    {/* Personal Information Section */}
                    <div
                        ref={personalInfoRef}
                        className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
                    >
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="font-serif text-2xl font-semibold text-tertiary-600">
                                Personal Information
                            </h2>
                            <button
                                onClick={() => {
                                    if (isEditMode) {
                                        resetEditState();
                                    } else {
                                        setIsEditMode(true);
                                    }
                                }}
                                className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                                    isEditMode
                                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                                        : 'hover:bg-primary-50 text-primary-600'
                                }`}
                            >
                                {isEditMode ? 'Cancel' : 'Edit'}
                            </button>
                        </div>

                        {/* Profile Section */}
                        <div className="mb-10 flex flex-col items-start gap-6 md:flex-row md:items-center">
                            <div className="group relative">
                                <AvatarImage
                                    src={displayedAvatar}
                                    alt="Profile"
                                    className="h-24 w-24 rounded-full border-4 border-primary-500 object-cover text-primary-300 shadow-md"
                                />
                                {isEditMode && (
                                    <>
                                        <label
                                            htmlFor="profile-upload"
                                            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        >
                                            <Camera className="h-6 w-6 text-white" />
                                        </label>
                                        <input
                                            id="profile-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </>
                                )}
                            </div>
                            <div>
                                <p className="font-serif text-xl font-semibold text-neutral-800">
                                    {watchName || userData?.name}
                                </p>
                                <p className="text-sm text-neutral-600">
                                    {watchEmail || userData?.email}
                                </p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(onSubmit)(e);
                            }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold tracking-wider text-neutral-600 uppercase">
                                        Full Name
                                    </label>
                                    <input
                                        {...register('name', {
                                            required: 'Name is required',
                                            minLength: {
                                                value: 3,
                                                message:
                                                    'Name must be at least 3 characters',
                                            },
                                        })}
                                        type="text"
                                        disabled={!isEditMode}
                                        className={`w-full rounded-lg border px-4 py-2.5 transition-all duration-300 ${
                                            isEditMode
                                                ? 'border-neutral-300 bg-white focus:border-transparent focus:ring-2 focus:ring-primary-500'
                                                : 'cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-600'
                                        } ${errors.name ? 'border-red-500' : ''}`}
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-500">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold tracking-wider text-neutral-600 uppercase">
                                        Email Address
                                    </label>
                                    <input
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message:
                                                    'Invalid email address',
                                            },
                                        })}
                                        type="email"
                                        disabled={!isEditMode}
                                        className={`w-full rounded-lg border px-4 py-2.5 transition-all duration-300 ${
                                            isEditMode
                                                ? 'border-neutral-300 bg-white focus:border-transparent focus:ring-2 focus:ring-primary-500'
                                                : 'cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-600'
                                        } ${errors.email ? 'border-red-500' : ''}`}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Save Changes Button */}
                            {isEditMode && (isDirty || imageFile) && (
                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={resetEditState}
                                        disabled={isLoading}
                                        className="cursor-pointer rounded-lg px-6 py-2.5 font-semibold text-neutral-700 transition-colors duration-300 hover:bg-neutral-100 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary-600 px-8 py-2.5 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-primary-700 disabled:opacity-50"
                                    >
                                        {isLoading && (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        )}
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Account Security Section */}
                    <div
                        ref={securityRef}
                        className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
                    >
                        <h2 className="mb-8 font-serif text-2xl font-semibold text-tertiary-600">
                            Account Security
                        </h2>

                        <div className="space-y-6 divide-y divide-neutral-200">
                            {/* Password Section */}
                            <div className="flex items-center justify-between py-6">
                                <div>
                                    <p className="text-lg font-semibold text-neutral-800">
                                        Password
                                    </p>
                                    <p className="mt-1 text-sm text-neutral-600">
                                        {formatLastChanged(
                                            userData?.password_changed_at,
                                        )}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsPasswordModalOpen(true)}
                                    className="hover:bg-primary-50 cursor-pointer rounded-lg border-2 border-primary-600 px-6 py-2 text-xs font-semibold tracking-wider text-primary-600 uppercase transition-colors duration-300"
                                >
                                    Update
                                </button>
                            </div>

                            {/* 2FA Section */}
                            <div className="flex items-center justify-between py-6">
                                <div>
                                    <p className="text-lg font-semibold text-neutral-800">
                                        Two-Factor Authentication
                                    </p>
                                    <p className="mt-1 text-sm text-neutral-600">
                                        Add an extra layer of security to your
                                        account
                                    </p>
                                </div>
                                <button
                                    onClick={handleToggle2FA}
                                    className={`relative h-8 w-14 cursor-pointer rounded-full transition-all duration-300 ${
                                        is2FAEnabled
                                            ? 'bg-primary-600'
                                            : 'bg-neutral-300'
                                    }`}
                                >
                                    <div
                                        data-toggle-indicator
                                        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                                            is2FAEnabled
                                                ? 'translate-x-7'
                                                : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Logout Section */}
                            <div className="flex items-center justify-between py-6">
                                <div>
                                    <p className="text-lg font-semibold text-neutral-800">
                                        Logout Session
                                    </p>
                                    <p className="mt-1 text-sm text-neutral-600">
                                        Securely sign out from your account
                                    </p>
                                </div>
                                <button
                                    onClick={() => router.post('/logout')}
                                    className="cursor-pointer rounded-lg border-2 border-red-500 px-6 py-2 text-xs font-semibold tracking-wider text-red-500 uppercase transition-colors duration-300 hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Password Modal */}
                {isPasswordModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-xl">
                            <h3 className="mb-6 font-serif text-2xl font-semibold text-tertiary-600">
                                Change Password
                            </h3>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handlePasswordSubmit(handlePasswordUpdate)(
                                        e,
                                    );
                                }}
                                className="space-y-5"
                            >
                                {/* Current Password */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold tracking-wider text-neutral-600 uppercase">
                                        Current Password
                                    </label>
                                    <input
                                        {...registerPassword(
                                            'current_password',
                                            {
                                                required:
                                                    'Current password is required',
                                            },
                                        )}
                                        type="password"
                                        className={`w-full rounded-lg border px-4 py-2.5 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-primary-500 ${
                                            passwordFormErrors.current_password ||
                                            passwordErrors.current_password
                                                ? 'border-red-500'
                                                : 'border-neutral-300'
                                        }`}
                                    />
                                    {(passwordFormErrors.current_password ||
                                        passwordErrors.current_password) && (
                                        <p className="text-xs text-red-500">
                                            {passwordFormErrors.current_password
                                                ?.message ||
                                                passwordErrors.current_password}
                                        </p>
                                    )}
                                </div>

                                {/* New Password */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold tracking-wider text-neutral-600 uppercase">
                                        New Password
                                    </label>
                                    <input
                                        {...registerPassword('password', {
                                            required:
                                                'New password is required',
                                            minLength: {
                                                value: minPasswordLength,
                                                message: `Password must be at least ${minPasswordLength} characters`,
                                            },
                                        })}
                                        type="password"
                                        className={`w-full rounded-lg border px-4 py-2.5 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-primary-500 ${
                                            passwordFormErrors.password ||
                                            passwordErrors.password
                                                ? 'border-red-500'
                                                : 'border-neutral-300'
                                        }`}
                                    />
                                    {(passwordFormErrors.password ||
                                        passwordErrors.password) && (
                                        <p className="text-xs text-red-500">
                                            {passwordFormErrors.password
                                                ?.message ||
                                                passwordErrors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm New Password */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold tracking-wider text-neutral-600 uppercase">
                                        Confirm New Password
                                    </label>
                                    <input
                                        {...registerPassword(
                                            'password_confirmation',
                                            {
                                                required:
                                                    'Please confirm your new password',
                                            },
                                        )}
                                        type="password"
                                        className={`w-full rounded-lg border px-4 py-2.5 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-primary-500 ${
                                            passwordFormErrors.password_confirmation ||
                                            passwordErrors.password_confirmation
                                                ? 'border-red-500'
                                                : 'border-neutral-300'
                                        }`}
                                    />
                                    {(passwordFormErrors.password_confirmation ||
                                        passwordErrors.password_confirmation) && (
                                        <p className="text-xs text-red-500">
                                            {passwordFormErrors
                                                .password_confirmation
                                                ?.message ||
                                                passwordErrors.password_confirmation}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-4 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsPasswordModalOpen(false);
                                            resetPassword();
                                            setPasswordErrors({});
                                        }}
                                        disabled={isPasswordLoading}
                                        className="cursor-pointer rounded-lg px-6 py-2.5 font-semibold text-neutral-700 transition-colors duration-300 hover:bg-neutral-100 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isPasswordLoading}
                                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary-600 px-8 py-2.5 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-primary-700 disabled:opacity-50"
                                    >
                                        {isPasswordLoading && (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        )}
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}
