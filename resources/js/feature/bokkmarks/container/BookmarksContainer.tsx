import { usePage } from '@inertiajs/react';
import React from 'react';
import MainLayout from '@/layout/MainLayout';
import BookmarksPage from '../component/Bookmarks';

interface BookmarksProps {
    recipes?: any[];
}

const BookmarksContainer = () => {
    const { recipes = [] } = usePage().props as BookmarksProps;

    return (
        <MainLayout>
            <BookmarksPage recipes={recipes} />
        </MainLayout>
    );
};

export default BookmarksContainer;
