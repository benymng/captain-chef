import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import HomeButton from '../../components/HomeButton';
import RecipeCard from '../../components/RecipeCard';
import { RecipeProps } from '../../types';

const sampleResults: RecipeProps[] = [
  {
    id: '1234',
    name: 'curry',
    ingredients: ['chickens', 'curry'],
    tags: ['vegan'],
  },
  {
    id: '42069',
    name: 'wings',
    ingredients: ['sauce', 'bread'],
    tags: ['vegetarian'],
  },
];

const Recipes: NextPage = () => {
  const router = useRouter();

  const searchQuery = router.query.q || 'No search term provided';

  const results = sampleResults;

  return (
    <div>
      <div>Recipe results for {searchQuery}</div>
      <HomeButton />

      <div>
        {results.map((r) => (
          <RecipeCard {...r} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
