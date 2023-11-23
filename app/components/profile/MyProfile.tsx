'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import CurrentBooking from './CurrentBooking';
import { format } from 'date-fns';

interface MyProfileProps {
  currentUser?: any | null;
}

const MyProfile: React.FC<MyProfileProps> = ({ currentUser }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue) {
      window.location.href = selectedValue;
    }
  };

  return (
    <div>
      <div>
        <div className="block lg:hidden xl:hidden">
          <select
            className="w-full rounded-lg my-4"
            name=""
            id=""
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="/dashboard">Dashboard</option>
            <option value="/dashboard/editProfile">Edit Profile</option>
            <option value="/dashboard/changePassword">Change password</option>
            <option value="/dashboard/ownership">Ownership</option>
            <option value="/dashboard/wallet">wallet</option>
            <option value="/dashboard/transfer">Transfer</option>
            <option value="/dashboard/myBooking">My Booking</option>
          </select>
        </div>
      </div>
      <div className="bg-gray-200 w-auto h-auto rounded-lg md:py-5 md:px-2   md:bg-gray-200 md:w-full md:h-auto md:rounded-lg  lg:bg-gray-200 lg:w-auto lg:h-auto lg:rounded-lg lg:px-20 lg:pt-14 xl:pt-14">
        <div className="flex flex-col justify-center items-center  md:flex md:flex-row md:justify-between md:items-center  lg:pb-10 xl:pb-10">
          <div className="text-[20px] mt-2 font-bold text-common md:pb-5 md:text-[20px] md:font-bold md:text-common lg:text-[20px] lg:font-bold lg:text-common lg:pb-0 xl:mt-0">
            My Profile
          </div>
        </div>
        <div className="w-full md:w-full md:flex md:flex-col xl:flex xl:flex-row lg:flex lg:flex-row">
          <div className="flex flex-row justify-center md:block ">
            <img
              className="rounded-full w-24 h-24 my-2 md:mr-24 lg:w-24 md:mb-5 lg:pb-0 lg:h-24 lg:mr-24 lg:rounded-full xl:my-0 xl:mr-16"
              src={currentUser?.avatar || '/images/placeholder.jpg'}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-3 px-4 py-4 md:hidden lg:hidden xl:hidden">
            <div>Name: {currentUser?.username}</div>
            <div>Birth Date: {format(new Date(currentUser?.dob), 'dd-MM-yyyy')}</div>
            <div>Email: {currentUser?.email}</div>
            <div>Gender: {currentUser?.gender}</div>
            <div>Phone: {currentUser?.phone}</div>
          </div>
          <div className="hidden md:flex md:flex-row md:mb-14  md:w-full">
            <div className="flex flex-col mr-10 text-gray-400  ">
              <div className="mb-5">Name</div>
              <div className="mb-5">Birth Date</div>
              <div className="mb-5">Email</div>
            </div>
            <div className="flex flex-col mr-16 text-gray-600 ">
              <div className="mb-5 ml-9">{currentUser?.username}</div>

              <div className="mb-5 ml-9">{format(new Date(currentUser?.dob), 'dd-MM-yyyy')}</div>
              <div className="mb-5 ml-9">{currentUser?.email}</div>
            </div>
            <div className="flex flex-col mr-10 text-gray-400   ">
              <div className="mb-5 ml-9">Gender</div>
              <div className="mb-5 ml-9"> Country</div>
              <div className="mb-5 ml-9"> Phone</div>
            </div>
            <div className="flex flex-col text-gray-600 ">
              <div className="mb-5 ml-9">{currentUser?.gender}</div>
              <div className="mb-5 ml-9">VietNam</div>
              <div className="mb-5 ml-9">{currentUser?.phone}</div>
            </div>
          </div>
        </div>
      </div>

      <CurrentBooking />
      {/* {selectedOption && (
        <Link href={selectedOption}>
          <div>Go to {selectedOption}</div>
        </Link>
      )} */}
    </div>
  );
};

export default MyProfile;
