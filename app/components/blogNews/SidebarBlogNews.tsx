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
          <div className="font-bold text-[20px] mb-8">Write your blog</div>
          <div className="text-gray-500 text-[15px]">
            You can write a blog to advertise your aparment, it will be displayed on our site and
            help promote your aparment better.
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
      </div>
    </div>
  );
}
