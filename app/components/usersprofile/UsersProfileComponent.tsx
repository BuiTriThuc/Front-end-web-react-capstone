import Image from 'next/image';
import React from 'react';
import Container from '../Container';
import { BsShieldFillCheck } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import StepsRating from './StepsRating';
import StepsApartment from './StepsApartment';
import Link from 'next/link';

export default function UsersProfileComponent() {
  return (
    <Container className="py-36 bg-white">
      <div className="flex flex-row w-full gap-20">
        <div className="w-[30%] sticky col-span-4 top-[134px] h-full">
          <div className="bg-white shadow-2xl rounded-xl border gap-10 border-gray-200 py-4 px-3 items-center flex flex-row justify-center">
            <div className="flex flex-col items-center">
              <Image
                width={100}
                height={100}
                className="rounded-full"
                src="/images/avt.jpg"
                alt="avatar"
              />
              <div className="font-bold text-[25px] py-3">Thanh Kien</div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <div className="font-bold text-[20px]">91</div>
                <div className="text-[12px]">Ratings</div>
              </div>
              <div className="bg-gray-400 w-full h-[1px]"></div>
              <div>
                <div className="font-bold text-[20px]">12</div>
                <div className="text-[12px]">Total apartment</div>
              </div>
              <div className="bg-gray-400 w-full h-[1px]"></div>
              <div>
                <div className="font-bold text-[20px]">10</div>
                <div className="text-[12px]">Apartment available</div>
              </div>
              <div className="bg-gray-400 w-full h-[1px]"></div>
              <div>
                <div className="font-bold text-[20px]">2</div>
                <div className="text-[12px]">Apartment unavailable</div>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 rounded-xl mt-10 py-4 px-4 ">
            <div className="font-bold text-[20px]">
              The information has been confirmed by Thanh Kien
            </div>
            <div className="flex flex-col gap-5 mt-5">
              <div className="flex flex-row items-center gap-2">
                <AiOutlineCheck />
                <div>Infomation</div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <AiOutlineCheck />
                <div>Email address</div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <AiOutlineCheck />
                <div>Phone number</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[70%] col-span-8">
          <div className="flex flex-row items-center justify-between">
            <div className="text-[25px] font-bold">Infomation about Thanh Kien</div>
            <Link
              href="./chat"
              className="border border-gray-400 px-5 py-3 rounded-md hover:bg-common hover:text-white"
            >
              Contact the apartment owner
            </Link>
          </div>
          <div className="mt-5">
            <div className="font-bold">Hi!</div>
            <div className="text-gray-700 w-[70%]">
              I'm Thanh Kien, I'm very passionate about traveling everywhere, to meet new people,
              and approach new cultures. Since I have a family and young children, we don't have
              time to travel much anymore, so I host on HolidaySwap to meet people. I hope everyone
              will support me Sincerely thank
            </div>
            <div className="bg-gray-400 w-full h-[1px] my-10"></div>
            <div>
              <div className="font-bold text-[20px]">
                Ratings of <span>Thanh Kien</span>
              </div>
              <StepsRating />
            </div>
            <div className="bg-gray-400 w-full h-[1px] my-10"></div>

            <div>
              <div className="font-bold text-[20px]">
                Apartment for rent by <span>Thanh Kien</span>
              </div>
              <StepsApartment />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
