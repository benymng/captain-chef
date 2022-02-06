import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useRef, useState, useCallback } from 'react';
import Webcam, { WebcamProps } from 'react-webcam';
// @ts-ignore
import { clarifai } from '../config';

// const app = new Clarifai.App({
//   apiKey: clarifai.apiKey,
// });

const Scan: NextPage = () => {
  const webcamRef = useRef<Webcam>(null);
  const [snapshot, setSnapshot] = useState<string | null>();
  const [captured, setCaptured] = useState(false);
  const [results, setResults] = useState([]);
  const router = useRouter();

  const capture = useCallback(() => {
    if (!webcamRef.current) return;

    const image = webcamRef.current.getScreenshot();

    setCaptured(true);
    setSnapshot(image);
  }, [webcamRef, setSnapshot]);

  const redo = () => {
    setCaptured(false);
  };

  const confirm = async () => {
    if (!snapshot) return;
    console.log('getting');

    const res = await fetch('/api/ingredients', {
      method: 'POST',
      body: JSON.stringify({
        snapshot,
      }),
    });
    const x = await res.json();

    if (x.ingredients && x.ingredients.length > 0) {
      const ingredientsString = x.ingredients.join('+');
      router.push('/?i=' + ingredientsString);
    }
  };

  return (
    <div>
      {captured && snapshot && <img src={snapshot} alt="snapshot" />}
      {!captured && (
        <div className="flex mx-auto w-4/5 lg:w-1/2 my-10">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'environment' }}
            style={{ width: '100%', height: '100%', borderRadius: '2em' }}
          />
        </div>
      )}
      <div className="mt-10 flex justify-center items-center h-screenflex mx-auto">
        <button
          className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={capture}
        >
          capture
        </button>
        <button
          className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={redo}
        >
          redo
        </button>
        <button
          className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={confirm}
        >
          confirm
        </button>
        <div>{JSON.stringify(results)}</div>
      </div>
    </div>
  );
};

export default Scan;
const x = {
  status: {
    code: 10000,
    description: 'Ok',
    req_id: 'af45a64ef1ef04a11f68aadeecb7a64c',
  },
  outputs: [
    {
      id: '67ba459c13974e7dbd14dba178c80afa',
      status: { code: 10000, description: 'Ok' },
      created_at: '2022-02-06T15:20:15.173309580Z',
      model: {
        id: 'food-item-v1-recognition',
        name: 'food-items-v1.0',
        created_at: '2016-09-17T22:18:59.955626Z',
        modified_at: '2021-10-20T06:53:05.568020Z',
        app_id: 'main',
        output_info: {
          output_config: {
            concepts_mutually_exclusive: false,
            closed_environment: false,
            max_concepts: 0,
            min_value: 0,
          },
          message: 'Show output_info with: GET /models/{model_id}/output_info',
          fields_map: { concepts: 'softmax' },
        },
        model_version: {
          id: 'dfebc169854e429086aceb8368662641',
          created_at: '2016-09-17T22:18:59.955626Z',
          status: { code: 21100, description: 'Model is trained and ready' },
          visibility: { gettable: 50 },
          app_id: 'main',
          user_id: 'clarifai',
          metadata: {},
        },
        display_name: 'food-items-v1-visual-classifier',
        user_id: 'clarifai',
        input_info: { fields_map: { image: 'images' } },
        train_info: {},
        model_type_id: 'visual-classifier',
        visibility: { gettable: 50 },
        notes: '',
        toolkits: [],
        star_count: 0,
        import_info: {},
      },
      input: {
        id: 'be08e847fc3d4141ab1456c82143218a',
        data: {
          image: {
            url: 'https://samples.clarifai.com/placeholder.gif',
            base64: 'dHJ1ZQ==',
          },
        },
      },
      data: {
        concepts: [
          {
            id: 'ai_fZsLlGwm',
            name: 'pizza',
            value: 0.92947465,
            app_id: 'main',
          },
          {
            id: 'ai_DlGsqbPZ',
            name: 'chocolate',
            value: 0.8955898,
            app_id: 'main',
          },
          { id: 'ai_skxkRfDl', name: 'cake', value: 0.8790071, app_id: 'main' },
          { id: 'ai_2GpnH7qr', name: 'pie', value: 0.83956903, app_id: 'main' },
          {
            id: 'ai_n4ZFFZ2x',
            name: 'cookie',
            value: 0.8225672,
            app_id: 'main',
          },
          {
            id: 'ai_JXCD9lx9',
            name: 'strawberry',
            value: 0.7150217,
            app_id: 'main',
          },
          { id: 'ai_53wgdjQM', name: 'candy', value: 0.708838, app_id: 'main' },
          {
            id: 'ai_TGpvW458',
            name: 'cupcake',
            value: 0.6853446,
            app_id: 'main',
          },
          {
            id: 'ai_2TfRbKFW',
            name: 'apple',
            value: 0.63243777,
            app_id: 'main',
          },
          {
            id: 'ai_T851HmVS',
            name: 'orange',
            value: 0.60906976,
            app_id: 'main',
          },
          {
            id: 'ai_jvVxlhLh',
            name: 'chicken',
            value: 0.59702134,
            app_id: 'main',
          },
          {
            id: 'ai_D44GTVT3',
            name: 'pumpkin',
            value: 0.595322,
            app_id: 'main',
          },
          {
            id: 'ai_FnZCSVMH',
            name: 'cheese',
            value: 0.59223574,
            app_id: 'main',
          },
          {
            id: 'ai_GNdVB8DV',
            name: 'banana',
            value: 0.5817946,
            app_id: 'main',
          },
          {
            id: 'ai_4Pj7JQVd',
            name: 'peanut butter',
            value: 0.5726924,
            app_id: 'main',
          },
          {
            id: 'ai_hh0lr5sh',
            name: 'peanut',
            value: 0.553522,
            app_id: 'main',
          },
          {
            id: 'ai_0wh0dJkQ',
            name: 'sweet',
            value: 0.53997016,
            app_id: 'main',
          },
          {
            id: 'ai_3gVJkTM2',
            name: 'cheesecake',
            value: 0.51413864,
            app_id: 'main',
          },
          {
            id: 'ai_Br1hm5jR',
            name: 'butter',
            value: 0.49503353,
            app_id: 'main',
          },
          {
            id: 'ai_r2Fbdv8L',
            name: 'beer',
            value: 0.47203708,
            app_id: 'main',
          },
        ],
      },
    },
  ],
};
