import type { NextApiRequest, NextApiResponse } from 'next';
import { clarifai } from '../../config';

type Data = {
  found?: boolean;
  ingredients?: string[];
  error?: boolean;
  message?: string;
};

interface Ingredient {
  value: number;
  name: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' });
    return;
  }

  const body = JSON.parse(req.body);
  const snapshot = body.snapshot;

  if (!snapshot) {
    res.status(400).json({ found: false, error: true });
    return;
  }

  const raw = JSON.stringify({
    user_app_id: {
      user_id: 'j2plwnxz3in8',
      app_id: '877af433038544b0b85b5a11f8b2a721',
    },
    inputs: [
      {
        data: {
          image: {
            base64: snapshot.replace('data:image/jpeg;base64,', ''),
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Key ${clarifai.apiKey}`,
    },
    body: raw,
  };

  const modelID = 'bd367be194cf45149e75f01d59f77ba7';
  const result = await fetch(
    `https://api.clarifai.com/v2/models/${modelID}/outputs`,
    requestOptions
  );
  const data = await result.json();
  const concepts: Ingredient[] = data.outputs[0]?.data?.concepts;
  const ingredients = concepts.filter((c) => c.value > 0.6).map((c) => c.name);

  if (!ingredients) {
    res.status(200).json({ found: false });
    return;
  }

  console.log('found stuff!');
  console.log(concepts);
  console.log(ingredients);

  res.status(200).json({ found: true, ingredients });
};

export default handler;
