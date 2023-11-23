'use client';
import Link from 'next/link';
import React from 'react';
import Container from '../Container';
import useWriteBlogModal from '@/app/hooks/useWriteBlogModal';

export default function SidebarBlogNews() {
  const writeBlogModal = useWriteBlogModal();

  return (
    <div>
      <div className="flex flex-col w-[470px] px-6">
        <div className="mb-10">
          <div className="font-bold text-[20px] mb-8">Text Widget</div>
          <div className="text-gray-500 text-[15px]">
            Nulla vitae elit libero, a pharetra augue. Nulla vitae elit libero, a pharetra augue.
            Nulla vitae elit libero, a pharetra augue. Donec sed odio dui. Etiam porta sem
            malesuada.
          </div>
          <div className="flex flex-row items-end justify-end w-full">
            <button
              onClick={writeBlogModal.onOpen}
              className="px-5 py-2 bg-common text-white hover:bg-blue-600 rounded-md"
            >
              Write blog
            </button>
          </div>
        </div>
        {/* <div>
          <div className="font-bold text-[20px] mb-8">Recent Comment</div>
          <div className="mb-3">
            <Link className="text-[15px] text-gray-500" href="#">
              John Doe on Pityful a rethoric question ran
            </Link>
            <div className="border border-gray-200 mt-4"></div>
          </div>
          <div className="mb-3">
            <Link className="text-[15px] text-gray-500" href="#">
              John Doe on Change your place and get the fresh air{" "}
            </Link>
            <div className="border border-gray-200 mt-4"></div>
          </div>
          <div className="mb-3">
            <Link className="text-[15px] text-gray-500" href="#">
              John Doe on Introducing this amazing city{" "}
            </Link>
            <div className="border border-gray-200 mt-4"></div>
          </div>
          <div className="mb-3">
            <Link className="text-[15px] text-gray-500" href="#">
              John Doe on How to travel with paper map{" "}
            </Link>
            <div className="border border-gray-200 mt-4"></div>
          </div>
          <div className="mb-3">
            <Link className="text-[15px] text-gray-500" href="#">
              John Doe on Pack wisely before traveling{" "}
            </Link>
            <div className="border border-gray-200 mt-4"></div>
          </div>
        </div>
        <div className="mt-7 mb-3 text-[20px] font-bold">Tag Cloud</div>
        <div className="grid grid-cols-4 gap-4 mb-3 ">
          <div className=" bg-gray-100 border border-gray-300 flex flex-row items-center justify-center py-1 text-gray-500 text-[15px]">
            Article
          </div>
          <div className=" bg-gray-100 border border-gray-300 flex flex-row items-center justify-center py-1 text-gray-500 text-[15px]">
            City
          </div>
          <div className=" bg-gray-100 border border-gray-300 flex flex-row items-center justify-center py-1 text-gray-500 text-[15px]">
            Nature
          </div>
          <div className=" bg-gray-100 border border-gray-300 flex flex-row items-center justify-center py-1 text-gray-500 text-[15px]">
            News
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-3 ">
          <div className=" bg-gray-100 border border-gray-300 flex flex-row items-center justify-center py-1 text-gray-500 text-[15px]">
            Article
          </div>
          <div className=" bg-gray-100 border border-gray-300 flex flex-row items-center justify-center py-1 text-gray-500 text-[15px]">
            City
          </div>
          <div className=" bg-gray-100 border border-gray-300 flex flex-row items-center justify-center py-1 text-gray-500 text-[15px]">
            Nature
          </div>
          <div className=" bg-gray-100 border border-gray-300 flex flex-row items-center justify-center py-1 text-gray-500 text-[15px]">
            News
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 ">
          <div className=" bg-gray-100 border border-gray-300 flex flex-row items-center justify-center py-1 text-gray-500 text-[15px]">
            Article
          </div>
          <div className=" bg-gray-100 border border-gray-300 flex flex-row items-center justify-center py-1 text-gray-500 text-[15px]">
            City
          </div>
        </div> */}
      </div>
    </div>
  );
}
