import dotenv from 'dotenv';

dotenv.config();

const env = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV === 'staging',
  production: process.env.NODE_ENV === 'production',
};

const spoonacular = {
  apiKey: process.env.SPOONACULAR_API_KEY,
};

export { env, spoonacular };
