import { useRouter } from 'next/router';

const BackButton = () => {
  const router = useRouter();

  return <button onClick={() => router.back()}>Back</button>;
};

export default BackButton;
