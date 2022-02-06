import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import styles from '../styles/Home.module.css';
import SearchBar from '../components/SearchBar';
import CategoryBoxes from '../components/CategoryBox';
import Logo from '../public/Logo.svg';
import Image from 'next/image';
import { SearchResults, Tag } from '../types';
import { spoonacular } from '../config';
import CategoryBox from '../components/CategoryBox';
import { RiPlantFill } from 'react-icons/ri';
import { GiFruitBowl } from 'react-icons/gi';
import { BsFillCloudHailFill } from 'react-icons/bs';
import Header from '../components/Header';

import { sampleSearchResults } from '../sample/searchResults2';

interface Props {
  searchResults: SearchResults;
}

interface Categories {
  vegan: boolean;
  vegetarian: boolean;
  dairyFree: boolean;
}

const Home: NextPage<Props> = ({ searchResults }: Props) => {
  const router = useRouter();

  const query = (router.query.q as string) || '';
  const [searchQuery, setSearchQuery] = useState<string>(query);
  const [categories, setCategories] = useState<Categories>({
    vegan: false,
    vegetarian: false,
    dairyFree: false,
  });
  console.log(searchResults);

  const search = () => {
    const trueCategories = Object.keys(categories).filter(
      (key) => categories[key as Tag]
    );
    const category = trueCategories.length > 0 ? trueCategories[0] : '';

    router.push(`/?q=${searchQuery}&diet=${category}`);
  };

  const toggleCategory = (c: Tag) => {
    const newCategories = {
      vegan: false,
      vegetarian: false,
      dairyFree: false,
    };
    newCategories[c] = !categories[c];

    setCategories(newCategories);
  };

  useEffect(search, [categories]);

  return (
    <div>
      <Head>
        <title>Captain Chef</title>
        <meta name="description" content="Recipe app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-5 lg:px-24 px-8">
        <Header />
        <SearchBar
          search={search}
          value={searchQuery}
          setValue={setSearchQuery}
        />

        <Link href="/scan">
          <div className="mb-5 w-full flex">
            <div className="m-auto">
              <button className="bg-accent-color hover:bg-secondary-color text-font-color font-bold py-2 px-4 rounded hover:shadow-accent-color hover:shadow-2xl text-lg">
                Scan Ingredients
              </button>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-3 gap-3">
          <CategoryBox
            text="Vegetarian"
            update={() => toggleCategory('vegetarian')}
            active={categories.vegetarian}
          >
            <RiPlantFill />
          </CategoryBox>
          <CategoryBox
            text="Vegan"
            update={() => toggleCategory('vegan')}
            active={categories.vegan}
          >
            <GiFruitBowl />
          </CategoryBox>
          <CategoryBox
            text="Carbon Neutral"
            update={() => toggleCategory('dairyFree')}
            active={categories.dairyFree}
          >
            <BsFillCloudHailFill />
          </CategoryBox>
        </div>

        <div className="mt-9">
          <p className="pb-3 font-sans font-bold text-font-color text-2xl italic">
            Recommended for you
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {searchResults?.results.map((r) => (
            <RecipeCard {...r} key={r.id} />
          ))}
        </div>
        <br></br>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Search for recipes
  const number = 6;
  const searchQuery = query.q;
  const diet = query.diet;
  const ingredients = query.i;

  let searchResults;

  // if (ingredients) {
  //   const res = await fetch(
  //     `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${spoonacular.apiKey}&ingredients=${ingredients}&addRecipeInformation=true&number=${number}&diet=${diet}`
  //   );
  //   searchResults = await res.json();
  // } else {
  //   const res = await fetch(
  //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacular.apiKey}&query=${searchQuery}&addRecipeInformation=true&number=${number}&diet=${diet}`
  //   );
  //   searchResults = await res.json();
  // }

  searchResults = sampleSearchResults;

  return { props: { searchResults } };
};

export default Home;
