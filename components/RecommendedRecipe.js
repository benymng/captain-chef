import React from 'react';
import Image from 'next/image';
import { RiPlantFill } from 'react-icons/ri';
import { GiFruitBowl } from 'react-icons/gi';
import { BsFillCloudHailFill } from 'react-icons/bs';

const RecommendedRecipe = ({ ImgLink, title }) => {
  return (
    <div>
      <div class="lg:py-12 lg:flex lg:justify-center">
        <div class="bg-black rounded-xl lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-xl">
          <div class="lg:w-1/2">
            <div>
              <img className="rounded-xl" src={ImgLink} />
            </div>
          </div>
          <div class="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
            <h2 class="text-3xl text-font-color font-bold">{title}</h2>
            {/* <p class="mt-4 text-white">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
              modi reprehenderit vitae exercitationem aliquid dolores ullam
              temporibus enim expedita aperiam mollitia iure consectetur dicta
              tenetur, porro consequuntur saepe accusantium consequatur.
            </p> */}
            <Tag />
            <div class="mt-8">
              <a
                href="#"
                class="bg-primary-color text-font-color px-5 py-3 font-semibold rounded"
              >
                Start Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Tag = () => {
  return (
    <div className="pt-5">
      <div className="flex h-10 w-20 box border-4 bg-accent-color rounded border-none hover:bg-accent-color transition-all duration-300 ease-linear ">
        <p className="text-center font-sans font-bold text-xs md:text-base text-font-color"></p>
      </div>
    </div>
  );
};

export default RecommendedRecipe;
