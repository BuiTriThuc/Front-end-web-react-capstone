import React from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { BsFileEarmarkText } from 'react-icons/bs';
import { CiClock2 } from 'react-icons/ci';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

export default function CardBlog() {
  return (
    <div className="bg-white w-full h-auto ">
      <div className="shadow-sm border border-gray-200 rounded-xl mb-10">
        <div className="overflow-hidden object-cover ">
          <img
            src="/images/resort3.jpg"
            alt="img News"
            className="w-[1080px] rounded-t-lg h-[380px] object-cover relative hover:scale-110 hover:transition-transform duration-500 hover:duration-500"
          />
        </div>
        <div className="px-10 my-8 flex flex-col ">
          <div className="flex flex-row">
            <div className="flex flex-row items-center mr-8">
              <CiClock2 size={15} color="gray" />
              <div className="text-[12px] font-thin ml-1 text-common">June 6, 2023</div>
            </div>
            <div className="flex flex-row items-center mr-8">
              <BsFileEarmarkText size={15} color="gray" />
              <div className="text-[12px] font-thin ml-1 text-common">Thuc Bui</div>
            </div>

            <div className="flex flex-row items-center mr-8">
              <FaRegHeart size={15} color="gray" />
              <div className="text-[12px] font-thin ml-1 text-common">1</div>
            </div>
          </div>
          <div className="text-[25px] pt-3 pb-5">Pack wisely before traveling</div>
          <div className="text-[13px] text-gray-500">
            A wonderful serenity has taken possession of my entire soul, like these sweet mornings
            of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence
            in this spot, which was created for the bliss of souls like mine. I am so happy, my dear
            friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my
            talents. I should be...
          </div>
          <div>
            <Link
              className="bg-[#5C98F2] hover:bg-blue-600  w-[130px] h-[51px] flex flex-row items-center justify-center rounded-md mt-5 text-white font-medium"
              href="./detailblog"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
      <div className="shadow-sm border border-gray-200 rounded-xl mb-10">
        <div className="overflow-hidden object-cover ">
          <img
            src="/images/resort1.jpg"
            alt="img News"
            className="w-[1080px] rounded-t-lg h-[380px] object-cover relative hover:scale-110 hover:transition-transform duration-500 hover:duration-500"
          />
        </div>
        <div className="px-10 my-8 flex flex-col ">
          <div className="flex flex-row">
            <div className="flex flex-row items-center mr-8">
              <CiClock2 size={15} color="gray" />
              <div className="text-[12px] font-thin ml-1 text-common">June 6, 2023</div>
            </div>
            <div className="flex flex-row items-center mr-8">
              <BsFileEarmarkText size={15} color="gray" />
              <div className="text-[12px] font-thin ml-1 text-common">Thuc Bui</div>
            </div>

            <div className="flex flex-row items-center mr-8">
              <AiOutlineLike size={15} color="gray" />
              <div className="text-[12px] font-thin ml-1 text-common">1</div>
            </div>
          </div>
          <div className="text-[25px] pt-3 pb-5">Pack wisely before traveling</div>
          <div className="text-[13px] text-gray-500">
            A wonderful serenity has taken possession of my entire soul, like these sweet mornings
            of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence
            in this spot, which was created for the bliss of souls like mine. I am so happy, my dear
            friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my
            talents. I should be...
          </div>
          <div>
            <Link
              className="bg-[#5C98F2] hover:bg-blue-600  w-[130px] h-[51px] flex flex-row items-center justify-center rounded-md mt-5 text-white font-medium"
              href="./detailblog"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
      <div className="shadow-sm border border-gray-200 rounded-xl mb-10">
        <div className="overflow-hidden object-cover ">
          <img
            src="/images/resort2.jpg"
            alt="img News"
            className="w-[1080px] rounded-t-lg h-[380px] object-cover relative hover:scale-110 hover:transition-transform duration-500 hover:duration-500"
          />
        </div>
        <div className="px-10 my-8 flex flex-col ">
          <div className="flex flex-row">
            <div className="flex flex-row items-center mr-8">
              <CiClock2 size={15} color="gray" />
              <div className="text-[12px] font-thin ml-1 text-common">June 6, 2023</div>
            </div>
            <div className="flex flex-row items-center mr-8">
              <BsFileEarmarkText size={15} color="gray" />
              <div className="text-[12px] font-thin ml-1 text-common">Thuc Bui</div>
            </div>

            <div className="flex flex-row items-center mr-8">
              <AiOutlineLike size={15} color="gray" />
              <div className="text-[12px] font-thin ml-1 text-common">1</div>
            </div>
          </div>
          <div className="text-[25px] pt-3 pb-5">Pack wisely before traveling</div>
          <div className="text-[13px] text-gray-500">
            A wonderful serenity has taken possession of my entire soul, like these sweet mornings
            of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence
            in this spot, which was created for the bliss of souls like mine. I am so happy, my dear
            friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my
            talents. I should be...
          </div>
          <div>
            <Link
              className="bg-[#5C98F2] hover:bg-blue-600  w-[130px] h-[51px] flex flex-row items-center justify-center rounded-md mt-5 text-white font-medium"
              href="./detailblog"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
