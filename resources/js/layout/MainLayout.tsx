// resources/js/layouts/main-layout.tsx
import type { ReactNode } from 'react';
import { Footer } from '@/shared/Footer/Footer';
import { Navbar } from '@/shared/Navbar/Navbar';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="text-on-background flex min-h-screen flex-col bg-background antialiased">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
