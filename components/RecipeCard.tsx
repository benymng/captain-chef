import Link from 'next/link';
import { RecipeProps } from '../types';

const RecipeCard = ({ id, title, image }: RecipeProps) => {
  // return (
  //   <Link href={`/recipes/${id}`}>
  //     <div>
  //       <img src={image} />
  //       <p className="text-font-color">{title}</p>
  //     </div>
  //   </Link>
  // );
  return (
    <div>
      <div className="lg:py-12 lg:flex lg:justify-center">
        <div className="bg-black rounded-xl lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-xl">
          <div className="lg:w-1/2">
            <div>
              <img className="rounded-xl w-max" src={image} />
            </div>
          </div>
          <div className="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
            <h2 className="text-3xl text-font-color font-bold">{title}</h2>
            {/* <p className="mt-4 text-white">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
              modi reprehenderit vitae exercitationem aliquid dolores ullam
              temporibus enim expedita aperiam mollitia iure consectetur dicta
              tenetur, porro consequuntur saepe accusantium consequatur.
            </p> */}
            {/* <Tag /> */}
            <div className="mt-8">
              <Link href={`/recipes/${id}`}>
                <a
                  href="#"
                  className="bg-primary-color text-font-color px-5 py-3 font-semibold rounded"
                >
                  Start Now
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
