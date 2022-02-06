import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
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

import { sampleSearchResults } from '../sample/searchResults';

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

  const search = () => {
    router.push(`/?q=${searchQuery}`);
  };

  const toggleCategory = (c: Tag) => {
    const newCategories = {
      vegan: false,
      vegetarian: false,
      dairyFree: false,
    };
    newCategories[c] = !categories[c];

    setCategories(newCategories);
    search();
  };

  return (
    <div>
      <Head>
        <title>Captain Chef</title>
        <meta name="description" content="Recipe app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-5">
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
            text="Dairy Free"
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
        <div className="grid-cols-1">
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
  // const number = 1;

  // const res = await fetch(
  // `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacular.apiKey}&query=${searchQuery}&addRecipeInformation=true&number=${number}`
  // );
  // const searchResults = await res.json();

  const searchResults = sampleSearchResults;

  return { props: { searchResults } };
};

export default Home;
