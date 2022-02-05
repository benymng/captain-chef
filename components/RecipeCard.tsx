import Link from 'next/link';
import { RecipeProps } from '../types';

const RecipeCard = ({ id, name, ingredients, tags }: RecipeProps) => {
  return (
    <Link href={`/recipes/${id}`}>
      <div>
        <div>name: {name}</div>
        <div>
          ingredients
          <ul>
            {ingredients.map((i) => (
              <li>{i}</li>
            ))}
          </ul>
        </div>
        <div>
          tags
          <ul>
            {tags.includes('vegan') && <li>leaf</li>}
            {tags.includes('vegetarian') && <li>thing</li>}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
