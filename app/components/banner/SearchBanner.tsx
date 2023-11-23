'use client';

import React from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchBanner = () => {
  return (
    <div className="bg-white rounded-3xl md:w-[830px] w-auto flex-row relative z-20 grid md:grid-cols-4 sm:grid-cols-1">
      <div className="flex flex-col gap-2 p-8">
        <p>Keywords</p>
        <input placeholder="Type Your Keyword" className="py-3 outline-none" />
      </div>

      <div className="flex flex-col gap-2 p-8">
        <p>Destinations</p>
        <select className="py-3 outline-0 outline-transparent border-0 focus:border-0 focus:outline-0 focus:border-transparent focus:outline-transparent focus:ring-0 rounded-b-lg">
          <option value="">Any</option>
          <option value="">Vung Tau</option>
          <option value="">Nha Trang</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 p-8">
        <p>Duration</p>
        <select className="py-3 outline-0 outline-transparent border-0 focus:border-0 focus:outline-0 focus:border-transparent focus:outline-transparent focus:ring-0 rounded-b-lg">
          <option value="">Any</option>
          <option value="">1 day</option>
          <option value="">2 - 4 days</option>
        </select>
      </div>

      <div className="bg-common w-full md:rounded-r-3xl md:rounded-l-none rounded-b-3xl py-5 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:bg-sky-500">
        <BiSearch size={18} color="white" />
        <button>Search now</button>
      </div>
    </div>
  );
};

export default SearchBanner;
