import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = ({ value, setValue, search }) => {
  return (
    <div class="pb-8 pt-2 relative mx-auto text-gray-600">
      <input
        className="border-2 border-font-color bg-font-color h-10 w-full px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
        value={value}
        onChange={(x) => setValue(x.target.value)}
      />
      <button
        type="submit"
        className="absolute right-0 top-0 mt-5 mr-4"
        onClick={search}
      >
        <AiOutlineSearch />
      </button>
    </div>
  );
};

export default SearchBar;
