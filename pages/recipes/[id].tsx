import { NextPage } from 'next';
import { useRouter } from 'next/router';
import BackButton from '../../components/BackButton';
import HomeButton from '../../components/HomeButton';
import RecipePreview from '../../components/RecipePreview';
import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import styles from '../../styles/Home.module.css';
import Image from 'next/image';

const RecipePage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const query = (router.query.q as string) || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const search = () => {
    router.push(`/recipes?q=${searchQuery}`);
  };

  return (
    <div className={styles.container}>
      <SearchBar
        search={search}
        value={searchQuery}
        setValue={setSearchQuery}
      />
      {/* <div>Recipe ID: {id}</div> */}
      <BackButton />
      <HomeButton />
      <div className="flex">
        <div className="m-auto">
          <img src="https://spoonacular.com/recipeImages/659015-636x393.jpg" />
          <h1 className="flex justify-center text-2xl text-font-color pb-4 pt-4 font-extrabold">
            Chicken and Cauliflower Salad
          </h1>
          <h2 className="flex justify-center text-xl text-font-color pb-5 font-bold">
            Ingredients
          </h2>
          <div className="justify-center grid grid-cols-1">
            <RecipePreview info="Carrot - 2 cups (chopped)" />
            <RecipePreview info="Carrot - 2 cups (chopped)" />
            <RecipePreview info="Carrot - 2 cups (chopped)" />
          </div>
          <h2 className="flex justify-center text-xl text-font-color pb-5 pt-10 font-bold">
            Directions
          </h2>
          <div className="justify-center grid grid-cols-1">
            <RecipePreview info="Carrot - Wash the vegetables for 30 seconds" />
            <RecipePreview info="Carrot - Wash the vegetables for 30 seconds" />
            <RecipePreview info="Carrot - Wash the vegetables for 30 seconds" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
