import React from 'react';

const CookingInfo = ({ servings, readyInMinutes }) => {
  return (
    <div>
      <div className="bg-secondary-color text-font-color flex h-full">
        <div className="m-auto">
          <p className="">{servings}</p>
          <p>{readyInMinutes}</p>
        </div>
      </div>
    </div>
  );
};

export default CookingInfo;
