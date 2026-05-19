import MainLayout from '@/layout/MainLayout';
import RecipeDetil from '../component/RecipeDetil'

interface RecipeShowProps {
    id: string;
}

const RecipeDetilContainer = ({ id }: RecipeShowProps) => {
  return (
    <MainLayout>
      <RecipeDetil id={id} />
    </MainLayout>
  )
}

export default RecipeDetilContainer
