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
        <div className="w-full py-5">
          <h1 className="text-center text-4xl text-font-color font-sans font-bold">
            Captain Chef
          </h1>
        </div>

        <SearchBar
          search={search}
          value={searchQuery}
          setValue={setSearchQuery}
        />

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
  // // Search for recipes
  // const searchQuery = query.q;
  // const diet = query.diet;
  // const number = 6;

  // const res = await fetch(
  //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacular.apiKey}&query=${searchQuery}&addRecipeInformation=true&number=${number}&diet=${diet}`
  // );
  // const searchResults = await res.json();

  const searchResults = sampleSearchResults;

  return { props: { searchResults } };
};

export default Home;
