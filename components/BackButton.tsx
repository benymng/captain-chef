import { useRouter } from 'next/router';

const BackButton = () => {
  const router = useRouter();

  return (
    <button className="text-font-color pr-5" onClick={() => router.back()}>
      Back
    </button>
  );
};

export default BackButton;
