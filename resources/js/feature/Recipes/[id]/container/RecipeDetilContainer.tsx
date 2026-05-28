import MainLayout from '@/layout/MainLayout';
import RecipeDetil from '../component/RecipeDetil';

interface RecipeShowProps {
    // datang dari backend Inertia props
    recipe: any;
}

const RecipeDetilContainer = ({ recipe }: RecipeShowProps) => {
    return (
        <MainLayout>
            <RecipeDetil recipe={recipe} />
        </MainLayout>
    );
};

export default RecipeDetilContainer;
