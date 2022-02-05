import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

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
