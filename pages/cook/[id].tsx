import { useRef, useEffect, useState } from 'react';

import { Avatar, Grid, IconButton, Slider, Typography } from '@mui/material';
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
  ClearRounded,
  CheckRounded,
} from '@mui/icons-material';
import { cyan, green, orange, red } from '@mui/material/colors';

import Webcam from 'react-webcam';
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
      color: orange[500],
      sliderColor: 'secondary',
      array: recipe.ingredients,
      icon: 'number',
    },
    {
      name: 'Steps',
      color: cyan[500],
      sliderColor: 'primary',
      array: recipe.instructions,
      icon: 'number',
    },
    {
      name: 'Complete',
      color: green.A400,
      sliderColor: 'success',
      array: [],
      icon: <CheckRounded fontSize="large" />,
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
      <Grid
        container
        direction="column"
        alignItems="center"
        height="100%"
        columns={{ xs: 16 }}
        paddingY={1}
        paddingX={3}
      >
        <Webcam
          ref={webcamRef}
          onLoadedData={() => {
            setIsActive(true);
            estimateHands();
          }}
          style={{ width: 0, height: 0 }}
        />
        <Grid item width="100%" container alignItems="center" xs={2}>
          <Grid item>
            <Avatar
              style={{
                backgroundColor: currentSection.color,
                width: '2em',
                height: '2em',
                fontSize: '2em',
              }}
              alt={`${currentSection.name} ${
                currentSection.icon === 'number' ? step : ''
              }`}
            >
              {currentSection.icon === 'number' ? (
                <Typography fontWeight="fontWeightBold" variant="h4">
                  {step + 1}
                </Typography>
              ) : (
                currentSection.icon
              )}
            </Avatar>
          </Grid>

          <Grid
            item
            flexGrow={1}
            style={{ paddingLeft: '2em', paddingRight: '1em' }}
          >
            {
              <Slider
                value={step}
                max={currentSection.array.length - 1}
                step={1}
                marks
                color={currentSection.sliderColor}
              />
            }
          </Grid>
        </Grid>

        <Grid item width="100%" xs={12} container overflow="scroll">
          <Grid item marginTop="auto" marginBottom="auto">
            <Typography
              variant="h4"
              textAlign={!moreSectionsForward() ? 'center' : 'left'}
              sx={{ userSelect: 'none' }}
            >
              {!moreSectionsForward()
                ? 'Complete!'
                : currentSection.array[step]}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          width="100%"
          container
          alignItems="center"
          justifyContent="space-between"
          xs={2}
        >
          <Grid item>
            <IconButton onClick={back} disabled={isBackDisabled}>
              <ArrowBackIosRounded
                fontSize="large"
                style={{ color: isBackDisabled ? cyan[100] : cyan[500] }}
              />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton onClick={cancel}>
              <ClearRounded fontSize="large" style={{ color: red[500] }} />
            </IconButton>
          </Grid>

          {/* <Grid item>
          <IconButton>
            <ReplayRounded fontSize="large" style={{ color: blueGrey[500] }} />
          </IconButton>
        </Grid> */}

          <Grid item>
            <IconButton onClick={forward} disabled={isForwardDisabled}>
              <ArrowForwardIosRounded
                fontSize="large"
                style={{ color: isForwardDisabled ? cyan[100] : cyan[500] }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Search for recipes
  const id = query.id;
  const recipeDetails = sampleRecipeDetails;

  // const res = await fetch(
  //   `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacular.apiKey}`
  // );
  // const recipeDetails = await res.json();

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
