'use client';

import { router, usePage } from '@inertiajs/react';
import gsap from 'gsap';
import { Camera, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

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
    };
    errors?: Record<string, string>;
    toast?: {
        type: 'success' | 'error';
        message: string;
    };
}

export default function ProfilePage() {
    const { user: userData, toast } = usePage().props as PageProps;
    const [isEditMode, setIsEditMode] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [profileImage, setProfileImage] = useState(
        userData?.avatar || 'https://via.placeholder.com/96x96?text=Profile',
    );
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null); // ✅ Fix: state imageFile yang hilang

    const {
        register,
        handleSubmit,
        reset,
        control, // ✅ Fix: tambah control dari useForm
        formState: { isDirty, errors },
    } = useForm<ProfileFormData>({
        defaultValues: {
            name: userData?.name || 'User Name',
            email: userData?.email || 'user@example.com',
        },
    });

    // ✅ Fix: useWatch pakai { control, name } bukan string langsung
    const watchName = useWatch({ control, name: 'name' });
    const watchEmail = useWatch({ control, name: 'email' });

    const sectionRef = useRef<HTMLDivElement>(null);
    const personalInfoRef = useRef<HTMLDivElement>(null);
    const securityRef = useRef<HTMLDivElement>(null);
    const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // ✅ Fix: ganti NodeJS.Timeout

    // Show page toast if available
    useEffect(() => {
        if (toast) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setToastMessage(toast);
            toastTimeoutRef.current = setTimeout(() => {
                setToastMessage(null);
            }, 5000);
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

    const onSubmit = (data: ProfileFormData) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);

        if (imageFile) {
            formData.append('avatar', imageFile);
        }

        formData.append('_method', 'PATCH');

        router.post('/settings/profile', formData, {
            onSuccess: () => {
                setIsLoading(false);
                setIsEditMode(false);
                setImageFile(null);
                reset(data);
                setToastMessage({
                    type: 'success',
                    message: 'Profile updated successfully!',
                });
                toastTimeoutRef.current = setTimeout(
                    () => setToastMessage(null),
                    5000,
                );
            },
            onError: () => {
                setIsLoading(false);
                setToastMessage({
                    type: 'error',
                    message: 'Failed to update profile. Please try again.',
                });
                toastTimeoutRef.current = setTimeout(
                    () => setToastMessage(null),
                    5000,
                );
            },
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result;

                if (typeof result === 'string') {
                    setProfileImage(result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleToggle2FA = () => {
        setIs2FAEnabled(!is2FAEnabled);
        gsap.to('[data-toggle-indicator]', {
            x: is2FAEnabled ? 0 : 20,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    return (
        <div
            ref={sectionRef}
            className="to-primary-50 min-h-screen bg-linear-to-br from-neutral-50 via-neutral-100 py-12"
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
                                    reset();
                                    setProfileImage(
                                        userData?.avatar ||
                                            'https://via.placeholder.com/96x96?text=Profile',
                                    );
                                    setImageFile(null);
                                }

                                setIsEditMode(!isEditMode);
                            }}
                            className={`rounded-lg px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 cursor-pointer ${
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
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="h-24 w-24 rounded-full border-4 border-primary-500 object-cover shadow-md"
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
                            {/* ✅ Fix: pakai watchName & watchEmail yang sudah benar */}
                            <p className="font-serif text-xl font-semibold text-neutral-800">
                                {watchName}
                            </p>
                            <p className="text-sm text-neutral-600">
                                {watchEmail}
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
                                            message: 'Invalid email address',
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
                        {isEditMode && isDirty && (
                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        reset();
                                        setIsEditMode(false);
                                        setProfileImage(
                                            userData?.avatar ||
                                                'https://via.placeholder.com/96x96?text=Profile',
                                        );
                                        setImageFile(null);
                                    }}
                                    disabled={isLoading}
                                    className="rounded-lg px-6 py-2.5 font-semibold text-neutral-700 transition-colors duration-300 hover:bg-neutral-100 disabled:opacity-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-2.5 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-primary-700 disabled:opacity-50 cursor-pointer"
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
                                    Last changed 4 months ago
                                </p>
                            </div>
                            <button className="hover:bg-primary-50 rounded-lg border-2 border-primary-600 px-6 py-2 text-xs font-semibold tracking-wider text-primary-600 uppercase transition-colors duration-300">
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
                                className={`relative h-8 w-14 rounded-full transition-all duration-300 ${
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
                                className="rounded-lg border-2 border-red-500 px-6 py-2 text-xs font-semibold tracking-wider text-red-500 uppercase transition-colors duration-300 hover:bg-red-50 cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
