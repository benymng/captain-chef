import { useRouter } from 'next/router';

const HomeButton = () => {
  const router = useRouter();

  return <button onClick={() => router.push('/')}>Home</button>;
};

export default HomeButton;
