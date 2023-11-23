import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 px-[60px] pt-20 pb-10 bg-[#1A1A1A] sm:w-full  md:bg-[#1A1A1A] md:w-full md:h-96 md:grid md:grid-cols-4 md:gap-8 md:px-[50px] md:items-center md:justify-center">
        <div>
          <div className="mb-4  flex flex-row md:flex md:flex-row">
            <div className="text-white text-[25px] md:text-white md:text-[25px] md:pb-[25px]">
              Holiday
            </div>
            <div className="text-[#5C98F2] text-[25px]">Swap</div>
          </div>
          {/* <Image
            width={80}
            height={80}
            className=" mb-6 md:w-10 md:h-10 md:rounded-full md:mt-3 "
            src="/images/logo.png"
            alt="logo"
          /> */}
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="text-white text-[25px] mb-[25px]">Contact</div>
          <div className="pb-[30px]">
            <div className="text-[#A7A7A7] font-thin pb-[10px] md:text-[#A7A7A7]  md:font-thin md:pb-[1px] lg:pb-[10px]">
              T: 0856597778
            </div>
            <div className="text-[#A7A7A7] font-thin pb-[10px] md:text-[#A7A7A7]  md:font-thin md:pb-[1px]  lg:pb-[10px]">
              E: Holidayswap@email.com
            </div>
            <div className="text-[#A7A7A7] font-thin pb-[10px] md:text-[#A7A7A7]  md:font-thin md:pb-[1px]  lg:pb-[10px]">
              Page: Facebook.com/HolidaySwap
            </div>
          </div>
        </div>
        <div className="flex flex-col pb-[30px]">
          <div className="text-white text-[25px] mb-[25px]">Useful Links</div>
          <div>
            <p className="text-[#A7A7A7] font-thin pb-[10px] md:text-[#A7A7A7]  md:font-thin md:pb-[1px]  lg:pb-[10px] ">
              Travel Blog & Tip
            </p>
            <p className="text-[#A7A7A7] font-thin pb-[10px] md:text-[#A7A7A7]  md:font-thin  md:pb-[1px]  lg:pb-[10px]">
              Working With Us
            </p>
            <p className="text-[#A7A7A7] font-thin pb-[10px] md:text-[#A7A7A7]  md:font-thin md:pb-[1px]  lg:pb-[10px]">
              Be Our Partner
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-white text-[25px] mb-[25px]">Pay Safely With Us</div>
          <div className=" text-[#A7A7A7] font-thin pb-[65px]">
            The payment is encrypted and transmitted securely with an SSL protocol.
          </div>
        </div>
      </div>
      <div className="bg-black w-full h-20 flex justify-center items-center md:bg-black md:w-full md:h-16 md:px-[20px] md:flex md:justify-center">
        <div className="flex flex-col justify-center items-center md:flex md:flex-row md:items-center md:justify-around md:gap-20 md:text-[15px] lg:grid lg:grid-cols-2 lg:gap-96">
          <div className="flex flex-row items-center justify-start md:flex md:justify-start">
            <Link className="text-[#A7A7A7] font-light px-3 md:px-2" href="/Home">
              Home
            </Link>
            <Link className="text-[#A7A7A7] font-light px-3 md:px-2" href="/About">
              About
            </Link>
            <Link className="text-[#A7A7A7] font-light px-3 md:px-2" href="/Blog">
              Blog
            </Link>
            <Link className="text-[#A7A7A7] font-light px-3 md:px-2" href="/Contact">
              Contact
            </Link>
          </div>
          <div className="text-[#A7A7A7] flex flex-col  text-center items-center justify-center md:justify-start">
            Copyright © 2023 HolidaySwap. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
