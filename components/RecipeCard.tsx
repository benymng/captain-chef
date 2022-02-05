import Link from 'next/link';
import { RecipeProps } from '../types';

const RecipeCard = ({ id, title, image }: RecipeProps) => {
  return (
    <Link href={`/recipes/${id}`}>
      <div>
        <img src={image} />
        {title}
      </div>
    </Link>
  );
};

export default RecipeCard;
