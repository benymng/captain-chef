import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  search: Function;
}

const SearchBar = ({ value, setValue, search }: Props) => {
  return (
    <div className="pb-8 pt-8 relative mx-auto text-gray-600 w-full lg:w-3/4">
      <input
        className="border-2 border-font-color bg-font-color h-10 w-full px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
        value={value}
        onChange={(x) => setValue(x.target.value)}
        autoComplete="off"
        onKeyPress={(e) => e.key === 'Enter' && search()}
      />
      <button
        type="submit"
        className="absolute right-0 top-6 mt-5 mr-4"
        onClick={() => search()}
      >
        <AiOutlineSearch />
      </button>
    </div>
  );
};

export default SearchBar;
