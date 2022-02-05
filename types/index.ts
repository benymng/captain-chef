export declare type Tag = 'vegan' | 'vegetarian';

export declare type RecipeProps = {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;

  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;

  instructions: string[];
};

export declare type SearchResults = {
  results: RecipeProps[];
  offset: number;
  number: number;
  totalResults: number;
};
