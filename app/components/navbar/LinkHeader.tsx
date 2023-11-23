'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter, usePathname, redirect } from 'next/navigation';
import React, { useEffect } from 'react';

import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import MainMap from '../map/MainMap';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LinkHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-row space-x-9 text-gray-500">
      <div
        onClick={() => router.push('/')}
        className={`hover:text-black cursor-pointer flex flex-col items-center ${
          pathname === '/' ? 'text-black' : ''
        }`}
      >
        Home
        {pathname === '/' ? (
          <span className="bg-gray-300 rounded-full w-2 h-2"></span>
        ) : (
          <span></span>
        )}
      </div>
      <div
        onClick={() => router.push('/apartment')}
        className={`hover:text-black cursor-pointer flex flex-col items-center ${
          pathname === '/apartment' ? 'text-black' : ''
        }`}
      >
        Aparment
        {pathname === '/apartment' ? (
          <span className="bg-gray-300 rounded-full w-2 h-2"></span>
        ) : (
          <span></span>
        )}
      </div>
      <div
        onClick={() => router.push('/blog')}
        className={`hover:text-black cursor-pointer flex flex-col items-center ${
          pathname === '/blog' ? 'text-black' : ''
        }`}
      >
        Blogs
        {pathname === '/blog' ? (
          <span className="bg-gray-300 rounded-full w-2 h-2"></span>
        ) : (
          <span></span>
        )}
      </div>
      <div onClick={handleClickOpen} className="hover:text-black cursor-pointer list-none">
        <li className="rounded-full cursor-pointer">
          <p className="flex font-medium items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                clipRule="evenodd"
              />
            </svg>
            Map View
          </p>
        </li>
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <button
          className="bg-black text-white py-2 px-8 rounded my-2 hover:bg-gray-600 transition ease-in duration-100 fixed right-16 bottom-3.5 w-fit z-10"
          // OnClick - Router Routes Back to the last page
          onClick={handleClose}
        >
          <p>Close Map View</p>
        </button>
        <MainMap data={undefined}></MainMap>
      </Dialog>
    </div>
  );
};

export default LinkHeader;
