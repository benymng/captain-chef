import React from 'react';
import Image from 'next/image';
import { FaBeer } from 'react-icons/fa';
import { RiPlantFill } from 'react-icons/ri';
import { GiFruitBowl } from 'react-icons/gi';
import { BsFillCloudHailFill } from 'react-icons/bs';

const CategoryBoxes = ({ search }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <CategoryBox text="Carbon Friendly" search={search}>
        <BsFillCloudHailFill />
      </CategoryBox>
      <CategoryBox text="Vegetarian">
        <RiPlantFill />
      </CategoryBox>
      <CategoryBox text="Vegan">
        <GiFruitBowl />
      </CategoryBox>
      {/* <CategoryBox />
      <CategoryBox /> */}
    </div>
  );
};

const CategoryBox = ({ text, children, search }) => {
  return (
    <div>
      <div
        onClick={search}
        className="flex h-16 box md:h-20 border-4 bg-secondary-color rounded-lg border-none hover:bg-accent-color hover:rounded-3xl transition-all duration-300 ease-linear cursor-pointer hover:shadow-accent-color hover:shadow-2xl"
      >
        <div className="m-auto">
          {/* clones the react component and adds to it*/}
          {React.cloneElement(children, {
            className: 'h-14 w-full text-white mx-auto p-1',
          })}
        </div>
      </div>
      <p className="mt-2 text-center font-sans font-bold text-xs md:text-base text-font-color">
        {text}
      </p>
    </div>
  );
};

export default CategoryBoxes;
