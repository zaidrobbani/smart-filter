import { createInertiaApp } from '@inertiajs/react';
import ReactDOM from 'react-dom/client';
import { Toaster } from '@/component/ui/sonner';
import { TooltipProvider } from '@/component/ui/tooltip';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });

        // Coba beberapa kemungkinan path
        const candidates = [
            `./pages/${name}.tsx`,
            `./pages/${name.split('.').join('/')}.tsx`,
            `./pages/${name.toLowerCase()}.tsx`,
            `./pages/${name.toLowerCase().split('.').join('/')}.tsx`,
        ];

        for (const path of candidates) {
            const page = pages[path] as any;

            if (page) {
                return page.default ?? page;
            }
        }
    },
    setup({ el, App, props }) {
        const root = ReactDOM.createRoot(el);
        root.render(
            <TooltipProvider delayDuration={0}>
                <App {...props} />
                <Toaster />
            </TooltipProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
