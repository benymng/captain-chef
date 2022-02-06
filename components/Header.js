import React from 'react';
import Logo from '../public/chef-hat.svg';

const Header = () => {
  return (
    <div className="w-full py-5 flex">
      <div className="mx-auto">
        <Logo className=" mx-auto h-14" />
        <h1 className="text-center text-4xl text-font-color font-sans font-bold">
          Captain Chef
        </h1>
      </div>
    </div>
  );
};

export default Header;
