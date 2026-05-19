'use client';

import gsap from 'gsap';
import { Camera } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

interface ProfileFormData {
    fullName: string;
    email: string;
}

export default function ProfilePage() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [profileImage, setProfileImage] = useState(
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDTU3Gs0XipVTQCO603cL13a6n6O-jAk33_cfROAwgDS5Urkpmq44kJWtLOev_qRPOK9BSA2qjsmReEMfOQBrAXK2BvfOcUo0uvPUzKi2ZZTKG7zVjUZfy6zkS5BryFOSwHOkxbm-U4XzAUmiq53fMSZpD2kLQJAg3a8VvKXgQ0VsbcesAosn0RdbS8ToOKNelti1g91NWqXAZUnSgvQbiAfJ4QojklDVcArzzMxgM138ubanhYq_yj_iIbvk4lll2eeVnFUQgW-Zs',
    );

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { isDirty },
    } = useForm<ProfileFormData>({
        defaultValues: {
            fullName: 'Elena Thorne',
            email: 'elena.thorne@culinary.edu',
        },
    });

    const formValues = useWatch({ control });

    const sectionRef = useRef<HTMLDivElement>(null);
    const personalInfoRef = useRef<HTMLDivElement>(null);
    const securityRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(
                sectionRef.current?.querySelector('h1') as HTMLElement,
                { opacity: 0, y: -20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                },
            );

            // Sections stagger animation
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
        console.log('Form submitted:', data);
        // Dummy submit - integrasinya nanti
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
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
                                }

                                setIsEditMode(!isEditMode);
                            }}
                            className={`rounded-lg px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                                isEditMode
                                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                                    : 'hover:bg-primary-50 text-primary-600'
                            }`}
                        >
                            {isEditMode ? 'Done' : 'Edit'}
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
                            <p className="font-serif text-xl font-semibold text-neutral-800">
                                {formValues.fullName}
                            </p>
                            <p className="text-sm text-neutral-600">
                                {formValues.email}
                            </p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold tracking-wider text-neutral-600 uppercase">
                                    Full Name
                                </label>
                                <input
                                    {...register('fullName')}
                                    type="text"
                                    disabled={!isEditMode}
                                    className={`w-full rounded-lg border px-4 py-2.5 transition-all duration-300 ${
                                        isEditMode
                                            ? 'border-neutral-300 bg-white focus:border-transparent focus:ring-2 focus:ring-primary-500'
                                            : 'cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-600'
                                    }`}
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold tracking-wider text-neutral-600 uppercase">
                                    Email Address
                                </label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    disabled={!isEditMode}
                                    className={`w-full rounded-lg border px-4 py-2.5 transition-all duration-300 ${
                                        isEditMode
                                            ? 'border-neutral-300 bg-white focus:border-transparent focus:ring-2 focus:ring-primary-500'
                                            : 'cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-600'
                                    }`}
                                />
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
                                    }}
                                    className="rounded-lg px-6 py-2.5 font-semibold text-neutral-700 transition-colors duration-300 hover:bg-neutral-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-primary-600 px-8 py-2.5 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-primary-700"
                                >
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

                            {/* Toggle Switch */}
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
                    </div>
                </div>
            </div>
        </div>
    );
}
