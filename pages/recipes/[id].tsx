// @ts-nocheck
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import BackButton from '../../components/BackButton';
import HomeButton from '../../components/HomeButton';
import RecipePreview from '../../components/RecipePreview';
import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import { RecipeProps } from '../../types';
import { spoonacular } from '../../config';
import CookingInfo from '../../components/CookingInfo';
import { sampleRecipeDetails } from '../../sample/recipeDetails';
import Header from '../../components/Header';
import Link from 'next/link';

interface Props {
  recipeDetails: RecipeProps;
}

const RecipePage: NextPage<Props> = ({ recipeDetails }: Props) => {
  const { title, image, instructions, ingredients } = recipeDetails;

  const router = useRouter();
  const id = router.query.id;
  const query = (router.query.q as string) || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const search = () => {
    router.push(`/recipes?q=${searchQuery}`);
  };
  console.log(recipeDetails);
  return (
    <div className={styles.container}>
      {/* <SearchBar
        search={search}
        value={searchQuery}
        setValue={setSearchQuery}
      /> */}
      <Header />
      {/* <div>Recipe ID: {id}</div> */}
      <BackButton />
      <HomeButton />
      <div className="flex">
        <div>
          <img className="mx-auto my-5" src={image} />
          <Link href={`/cook/${id}`}>
            <button className="flex mx-auto bg-accent-color hover:bg-secondary-color text-font-color font-bold py-2 px-4 rounded mt-10 hover:shadow-accent-color hover:shadow-2xl">
              Cook
            </button>
          </Link>
          <h1 className="flex justify-center text-2xl text-font-color pb-4 pt-4 font-extrabold">
            {/* {recipeDetails} */}
          </h1>
          {/* <CookingInfo servings={servings} readyInMinutes={readyInMinutes} /> */}
          <div className="lg:grid lg:grid-cols-2">
            <div className="pr-5">
              <h2 className="flex justify-center text-xl text-font-color pb-5 font-bold italic">
                Ingredients
              </h2>
              <div className="justify-center grid grid-cols-1">
                {ingredients.map((i) => (
                  <RecipePreview info={i} />
                ))}
              </div>
            </div>
            <div className="pr-5">
              <h2 className="flex justify-center text-xl text-font-color pt-10 lg:pt-0 pb-5 font-bold italic">
                Directions
              </h2>
              <div className="grid grid-cols-1">
                {instructions.map((instruction) => (
                  <RecipePreview info={instruction} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Search for recipes
  const id = query.id;
  // const recipeDetails = sampleRecipeDetails;

  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacular.apiKey}`
  );
  const recipeDetails = await res.json();

  const instructions = recipeDetails.analyzedInstructions.map((i) => {
    return i.steps.map((s) => s.step.replaceAll(/\.(?=[^ \n])/g, '. '));
  })[0];

  const ingredients = recipeDetails.extendedIngredients.map(
    ({ name, amount, unit }) => `${name} – ${amount} ${unit}`
  );

  return {
    props: {
      recipeDetails: {
        ...recipeDetails,
        instructions,
        ingredients,
      },
    },
  };
};

export default RecipePage;
