import { useRouter } from 'next/router';

const HomeButton = () => {
  const router = useRouter();

  return (
    <button className="text-font-color" onClick={() => router.push('/')}>
      Home
    </button>
  );
};

export default HomeButton;
