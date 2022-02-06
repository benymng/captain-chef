export declare type Tag = 'vegan' | 'vegetarian' | 'dairyFree';

export declare type RecipeProps = {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;

  vegetarian: boolean;
  vegan: boolean;
  dairyFree: boolean;

  instructions: string[];
};

export declare type SearchResults = {
  results: RecipeProps[];
  offset: number;
  number: number;
  totalResults: number;
};
