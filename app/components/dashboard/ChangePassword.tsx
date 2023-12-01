'use client';
import React, { useState } from 'react';
import HeadingDashboard from '../HeadingDashboard';
export default function ChangePassword() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue) {
      window.location.href = selectedValue;
    }
  };
  return (
    <div className="px-10">
      <div className="w-full lg:w-[600px] xl:w-[600px]">
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
        <div className="mt-8">
          <HeadingDashboard
            routerDashboard="/dashboard"
            pageCurrentContent="Change password"
            pageCurrentRouter="/dashboard/changePassword"
          />
        </div>

        <div className="mt-10">
          <div className=" flex flex-col mb-10  md:flex md:flex-row md:mb-14">
            <div className="w-[277px] text-gray-700">Old Password*</div>
            <input
              type="email"
              className=" text-gray-800 px-1 w-full bg-[#F8F8F8] border-b border-gray-500 focus:outline-none focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent rounded-md"
            />
          </div>
          <div className=" flex flex-col mb-10  md:flex md:flex-row md:mb-14">
            <div className="w-[277px] text-gray-700">New Password*</div>
            <input
              type="email"
              className=" text-gray-800 px-1 w-full bg-[#F8F8F8] border-b border-gray-500 focus:outline-none focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent rounded-md"
            />
          </div>{' '}
          <div className=" flex flex-col mb-10  md:flex md:flex-row md:mb-14">
            <div className="w-[277px] text-gray-700">Confirm Password*</div>
            <input
              type="email"
              className=" text-gray-800 px-1 w-full bg-[#F8F8F8] border-b border-gray-500 focus:outline-none focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent rounded-md"
            />
          </div>
          <button className=" text-[15px] bg-common px-4 py-2 rounded-md text-white md:bg-[#5C98F2] md:px-4 md:py-3 md:text-white md:rounded-md md:ml-56">
            Update Password
          </button>
        </div>
      </div>
      ,
    </div>
  );
}
