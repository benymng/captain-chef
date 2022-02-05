import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import SearchBar from '../components/SearchBar';
import CategoryBoxes from '../components/CategoryBoxes';
import RecommendedForYou from '../components/RecommendedForYou';
import Logo from '../public/Logo.svg';
import Image from 'next/image';

const Home: NextPage = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  const search = () => {
    router.push(`/recipes?q=${searchQuery}`);
  };

  return (
    <div className={styles.container}>
      <div className="w-full">
        <h1 className="text-center text-4xl text-font-color font-sans font-bold">
          Captain Chef
        </h1>
      </div>
      {/* <div className="flex mx-auto">
        <Image className="text-font-color h-10" src={Logo} />
      </div> */}
      <SearchBar
        search={search}
        value={searchQuery}
        setValue={setSearchQuery}
      />
      <CategoryBoxes search={search} />
      <br></br>
      <p className="pb-3 font-sans font-bold text-font-color text-3xl">
        Recommended for you:
      </p>
      <RecommendedForYou />
      <br></br>
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
        <SearchBar
          search={search}
          value={searchQuery}
          setValue={setSearchQuery}
        />
        <Link href={`/recipes?q=${searchQuery}`}>
          <button onClick={() => router.push(`/recipes?q=${searchQuery}`)}>
            search
          </button>
        </Link>
      </main>
    </div>
  );
};

export default Home;
