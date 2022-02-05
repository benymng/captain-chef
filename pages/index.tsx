import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import styles from '../styles/Home.module.css';
import { SearchResults } from '../types';
import { spoonacular } from '../config';

import { sampleSearchResults } from '../sample/searchResults';

interface Props {
  searchResults: SearchResults;
}

const Home: NextPage<Props> = ({ searchResults }: Props) => {
  const router = useRouter();

  const query = router.query.q || '';
  const [searchQuery, setSearchQuery] = useState(query);

  return (
    <div className={styles.container}>
      <Head>
        <title>Captain Chef</title>
        <meta name="description" content="Recipe app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <input
          type="text"
          value={searchQuery}
          onChange={(x) => setSearchQuery(x.target.value)}
        />
        <Link href={`/?q=${searchQuery}`}>
          <button onClick={() => router.push(`/?q=${searchQuery}`)}>
            search
          </button>
        </Link>
        {JSON.stringify(searchResults)}
        {searchResults?.results.map((r) => (
          <RecipeCard {...r} key={r.id} />
        ))}
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
