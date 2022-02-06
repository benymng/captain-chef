import React from 'react';

const RecipePreview = ({ info }) => {
  return (
    <div className="pb-2">
      <div className="bg-secondary-color box-content h-12 w-full rounded-lg">
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
