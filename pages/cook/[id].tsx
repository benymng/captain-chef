// @ts-nocheck
import { useRef, useEffect, useState } from 'react';

import {
  MdCheck,
  MdChevronLeft,
  MdChevronRight,
  MdOutlineCancel,
} from 'react-icons/md';

import Webcam from 'react-webcam';

// @ts-ignore
import fp from 'fingerpose';
import { Left, Right } from '../../lib/gestures';
import { load } from '@tensorflow-models/handpose';

import useSound from 'use-sound';

import useStep from '../../hooks/useStep';
import { GetServerSideProps, NextPage } from 'next';
import { sampleRecipeDetails } from '../../sample/recipeDetails';
import { RecipeProps } from '../../types';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
  recipeDetails: RecipeProps;
}

const CookPage: NextPage<Props> = ({ recipeDetails }: Props) => {
  const recipe = recipeDetails;

  const router = useRouter();

  // Sound effects
  const [playBackWhoosh] = useSound('/sounds/backWhoosh.mp3');
  const [playForwardWhoosh] = useSound('/sounds/forwardWhoosh.mp3');

  // App
  const [step, setStep] = useState(0);
  const [
    section,
    nextSection,
    previousSection,
    moreSectionsForward,
    moreSectionsBackward,
  ] = useStep(2, 0);
  const sections = [
    {
      name: 'Ingredients',
      bgColor: 'bg-orange-400',
      color: 'bg-orange-500',
      sliderColor: 'secondary',
      array: recipe.ingredients,
      icon: 'number',
    },
    {
      name: 'Steps',
      bgColor: 'bg-cyan-500',
      sliderColor: 'primary',
      array: recipe.instructions,
      icon: 'number',
    },
    {
      name: 'Complete',
      bgColor: 'bg-green-500',
      sliderColor: 'success',
      array: [],
      icon: <MdCheck className="text-4xl" />,
    },
  ];

  const currentSection = sections[section];

  const isBackDisabled = !moreSectionsBackward() && step === 0;
  const isForwardDisabled = !moreSectionsForward();

  const forward = () => {
    if (isForwardDisabled) return;

    // attempt to move to next section
    if (step === currentSection.array.length - 1) {
      setStep(0);
      nextSection();
    } else {
      setStep(step + 1);
    }

    playForwardWhoosh();
  };

  const back = () => {
    if (isBackDisabled) return;

    // attempt to move to previous section
    if (step === 0) {
      setStep(sections[section - 1].array.length - 1);
      previousSection();
    } else {
      setStep(step - 1);
    }

    playBackWhoosh();
  };

  const cancel = () => {
    router.push('/');
  };

  // Air swipe
  const webcamRef = useRef(null);
  const [milliseconds, setMilliseconds] = useState(0);
  const [model, setModel] = useState(null);
  const [GE, setGE] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const estimateHands = async () => {
    if (!isActive) return;

    const predictions = await model.estimateHands(
      webcamRef.current.video,
      true
    );
    if (predictions.length === 0 || predictions.handInViewConfidence < 0.99)
      return;

    const est = GE.estimate(predictions[0].landmarks, 9);
    if (!est || !est.gestures[0]) return;

    const direction = est.gestures[0].name;
    if (direction === 'right') {
      forward();
    } else if (direction === 'left') {
      back();
    }
    console.log(est.gestures[0].name);

    setIsActive(false);
    setTimeout(() => {
      setIsActive(true);
    }, 800);
  };

  useEffect(() => {
    load().then((m) => {
      setModel(m);
    });
    setGE(new fp.GestureEstimator([Left, Right]));
  }, []);

  useEffect(() => {
    let interval = null;
    if (milliseconds >= 50 && isActive) {
      estimateHands();
      setMilliseconds(0);
    } else if (isActive) {
      interval = setInterval(() => {
        setMilliseconds((milliseconds) => milliseconds + 1);
      }, 1);
    } else if (!isActive && milliseconds !== 0) {
      setMilliseconds(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [isActive, milliseconds]);

  return (
    <>
      <Head>
        <script src="https://unpkg.com/@tensorflow/tfjs-core@3.7.0/dist/tf-core.js"></script>
        {/* <script src="https://unpkg.com/@tensorflow/tfjs-converter@3.7.0/dist/tf-converter.js"></script> */}
        <script src="https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.js"></script>
        {/* <script src="https://unpkg.com/@tensorflow-models/handpose@0.0.7/dist/handpose.js"></script> */}
      </Head>
      <div className="w-full lg:w-1/2 mx-auto">
        <Webcam
          ref={webcamRef}
          onLoadedData={() => {
            setIsActive(true);
            estimateHands();
          }}
          style={{ width: 0, height: 0 }}
        />
        <div className="p-5 md:p-10 h-screen flex flex-col">
          <div className="flex flex-row h-1/12">
            <div
              className={`font-bold text-white rounded-full ${currentSection.bgColor} flex items-center justify-center font-mono h-16 w-16 `}
              // style="height: 500px; width: 500px; font-size: 170px;"
            >
              {currentSection.icon === 'number' ? (
                <p className="font-bold text-2xl">{step + 1}</p>
              ) : (
                currentSection.icon
              )}
            </div>
            <div className="w-10/12 my-auto pl-6">
              <div className="bg-gray-100 h-5 rounded-xl">
                <div
                  className={`${
                    currentSection.bgColor
                  } h-5 rounded-l-xl transition-all duration-75 ease-linear ${
                    step === currentSection.array.length - 1 ||
                    !moreSectionsForward()
                      ? 'rounded-r-xl'
                      : ''
                  }`}
                  style={{
                    width: `${
                      !moreSectionsForward()
                        ? '100%'
                        : (step / (currentSection.array.length - 1)) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="w-full flex-1 flex">
            <div className="my-auto">
              <p className="text-font-color align-middle text-3xl">
                {!moreSectionsForward()
                  ? 'Complete!'
                  : currentSection.array[step]}
              </p>
            </div>
          </div>

          <div className="grid grid-rows-none grid-cols-3 text-center align-bottom">
            <div onClick={back}>
              <MdChevronLeft className="text-accent-color text-4xl mx-auto" />
            </div>
            <div onClick={cancel}>
              <MdOutlineCancel className="text-red-500 text-4xl mx-auto" />
            </div>
            <div onClick={forward}>
              <MdChevronRight className="text-accent-color text-4xl mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Search for recipes
  const id = query.id;
  // const recipeDetails = sampleRecipeDetails;

  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacular.apiKey}`
  );
  const recipeDetails = await res.json();

  const instructions = recipeDetails.analyzedInstructions.map((i) => {
    return i.steps.map((s) => s.step.replaceAll(/\.(?=[^ \n])/g, '. '));
  })[0];

  const ingredients = recipeDetails.extendedIngredients.map(
    ({ name, amount, unit }) => `${name} – ${amount} ${unit}`
  );

  return {
    props: {
      recipeDetails: {
        ...recipeDetails,
        instructions,
        ingredients,
      },
    },
  };
};

export default CookPage;
