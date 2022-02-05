import { NextPage } from 'next';
import { useRouter } from 'next/router';
import BackButton from '../../components/BackButton';
import HomeButton from '../../components/HomeButton';

const RecipePage: NextPage = () => {
  const router = useRouter();

  const id = router.query.id;

  return (
    <div>
      <div>Recipe ID: {id}</div>
      <BackButton />
      <HomeButton />
    </div>
  );
};

export default RecipePage;
