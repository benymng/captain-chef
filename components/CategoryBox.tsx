import React, { useState } from 'react';
import Image from 'next/image';

interface Props {
  text: string;
  children: React.ReactElement;
  update: Function;
  active: boolean;
}

const CategoryBox = ({ text, children, update, active }: Props) => {
  return (
    <div>
      <div
        onClick={() => update()}
        className={`flex h-16 box md:h-20 border-4 bg-secondary-color rounded-lg border-none ${
          active ? '' : 'hover:'
        }bg-accent-color hover:rounded-3xl transition-all duration-300 ease-linear cursor-pointer ${
          active ? '' : 'hover:'
        }shadow-accent-color ${active ? '' : 'hover:'}shadow-2xl d`}
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

export default CategoryBox;
