import { Head } from '@inertiajs/react';
import MainLayout from '@/layout/MainLayout';
import BentoSection from '../section/BentoSection';
import HeroSection from '../section/HeroSection';
import HowItWorks from '../section/HowItWorks';

const LandingPageContainer = () => {
    return (
        <MainLayout>
            <Head title="SmartFilter — Access the root of your kitchen" />
            <HeroSection />
            <HowItWorks />
            <BentoSection />
        </MainLayout>
    );
};

export default LandingPageContainer;
