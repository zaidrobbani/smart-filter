import React from 'react';
import RecipeDetilContainer from '@/feature/Recipes/[id]/container/RecipeDetilContainer';

interface RecipeShowPageProps {
    recipe: {
        id: string;
        title: string;
        image: string;
        description: string;
        cookingTime: number;
        difficulty: string;
        [key: string]: any;
    };
}

const show = ({ recipe }: RecipeShowPageProps) => {
    return <RecipeDetilContainer id={recipe.id} />;
};

export default show;
