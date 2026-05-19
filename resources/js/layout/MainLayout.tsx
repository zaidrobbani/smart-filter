// resources/js/layouts/main-layout.tsx
import type { ReactNode } from 'react';
import { Footer } from '@/shared/Footer/Footer';
import { Navbar } from '@/shared/Navbar/Navbar';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-on-background antialiased flex flex-col">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}