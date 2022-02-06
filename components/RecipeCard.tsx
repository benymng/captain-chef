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
      <div className="py-3 lg:py-4 h-full">
        <div className="bg-black rounded-xl lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-xl">
          <div className="lg:w-1/2">
            <div className="flex h-full">
              <div className="m-auto">
                <img className="rounded-xl w-max" src={image} />
              </div>
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
                  className="bg-primary-color hover:bg-accent-color text-font-color py-2 px-4 rounded hover:shadow-accent-color hover:shadow-2xl text-lg hover:rounded-2xl transition-all duration-300 ease-linear cursor-pointer"
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
