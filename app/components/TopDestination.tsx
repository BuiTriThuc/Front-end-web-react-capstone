'use client';
import React from 'react';
import TopDestinationCard from './TopDestinationCard';
import { FaArrowRight } from 'react-icons/fa6';
import CaroselResortAndApartment from './CaroselResortAndApartment';

interface TopDestinationProps {
  listResort: any;
}

const TopDestination: React.FC<TopDestinationProps> = ({ listResort }) => {
  return (
    <div className="py-32 flex flex-col items-center">
      <div className="md:text-5xl text-3xl font-bold">
        Top <span className="text-common">Destinations</span>
      </div>
      {/* <div className="text-[#8c8c8c] text-base flex flex-col items-center md:w-full w-auto py-10">
        <span>
          Explore our top destinations voted by more than 100,000+ customers around the world.
        </span>
      </div> */}

      {/* Carosel resort & apartment */}
      {/* <CaroselResortAndApartment listResort={listResort} /> */}
      <div className="flex gap-4 items-center my-10 p-2 border-b-2 border-slate-600 hover:border-[#5C98F2] cursor-pointer">
        All Destination
        <FaArrowRight size={15} />
      </div>

      <div>
        <TopDestinationCard />
      </div>
    </div>
  );
};

export default TopDestination;
