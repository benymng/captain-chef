import React from 'react';

const RecipePreview = ({ info }) => {
  return (
    <div className="pb-2 w-full">
      <div className="bg-secondary-color box-content p-5 rounded-lg">
        <div className="flex h-full">
          <div className="m-auto">
            <p className="text-font-color">{info}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePreview;
