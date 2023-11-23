'use client';
import React, { useState } from 'react';
import { message, Steps, theme } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useAparmentReviewModal from '@/app/hooks/useApartmentReviewModal';

const Money = [
  {
    title: 'First',
    content: (
      <div className=" py-5 w-full bg-white grid grid-cols-2 gap-4 items-center px-4 justify-center">
        <div className="border border-gray-200 rounded-md px-4 py-5">
          <div>
            Hotel recomendado 100% El lugar fue perfecto, es económico, muy limpio y cómodo, está
            cerca a muchos almacenes y el lago, hay varios restaurantes en la zona. El dueño fue muy
            gentil, nos permitió guarda
          </div>
          <div className="flex flex-row items-center gap-2">
            <div>
              <img
                className="rounded-full my-5 w-14 h-14"
                src="/images/vung-tau.jpg"
                alt="avatar"
              />
            </div>
            <div>
              <div className="font-bold text-[18px]">Bui Tri Thuc</div>
              <div className="text-gray-500 text-[12px]">November 2023</div>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-md px-4 py-5">
          <div>
            Hotel recomendado 100% El lugar fue perfecto, es económico, muy limpio y cómodo, está
            cerca a muchos almacenes y el lago, hay varios restaurantes en la zona. El dueño fue muy
            gentil, nos permitió guarda
          </div>
          <div className="flex flex-row items-center gap-2">
            <div>
              <img
                className="rounded-full my-5 w-14 h-14"
                src="/images/vung-tau2.jpg"
                alt="avatar"
              />
            </div>
            <div>
              <div className="font-bold text-[18px]">Nguyen Trong Tin</div>
              <div className="text-gray-500 text-[12px]">December 2023</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Second',
    content: (
      <div className=" py-5 w-full bg-white grid grid-cols-2 gap-4 items-center px-4 justify-center">
        <div className="border border-gray-200 rounded-md px-4 py-5">
          <div>
            Hotel recomendado 100% El lugar fue perfecto, es económico, muy limpio y cómodo, está
            cerca a muchos almacenes y el lago, hay varios restaurantes en la zona. El dueño fue muy
            gentil, nos permitió guarda
          </div>
          <div className="flex flex-row items-center gap-2">
            <div>
              <img
                className="rounded-full my-5 w-14 h-14"
                src="/images/vung-tau3.jpg"
                alt="avatar"
              />
            </div>
            <div>
              <div className="font-bold text-[18px]">Bui Duc Thinh</div>
              <div className="text-gray-500 text-[12px]">August 2023</div>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-md px-4 py-5">
          <div>
            Hotel recomendado 100% El lugar fue perfecto, es económico, muy limpio y cómodo, está
            cerca a muchos almacenes y el lago, hay varios restaurantes en la zona. El dueño fue muy
            gentil, nos permitió guarda
          </div>{' '}
          <div className="flex flex-row items-center gap-2">
            <div>
              <img
                className="rounded-full my-5 w-14 h-14"
                src="/images/vung-tau4.jpg"
                alt="avatar"
              />
            </div>
            <div>
              <div className="font-bold text-[18px]">Bui Duy Thuong</div>
              <div className="text-gray-500 text-[12px]">February 2023</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Third',
    content: (
      <div className=" py-5 w-full bg-white grid grid-cols-2 gap-4 items-center px-4 justify-center">
        <div className="border border-gray-200 rounded-md px-4 py-5">
          <div>
            Hotel recomendado 100% El lugar fue perfecto, es económico, muy limpio y cómodo, está
            cerca a muchos almacenes y el lago, hay varios restaurantes en la zona. El dueño fue muy
            gentil, nos permitió guarda
          </div>
          <div className="flex flex-row items-center gap-2">
            <div>
              <img
                className="rounded-full my-5 w-14 h-14"
                src="/images/vung-tau.jpg"
                alt="avatar"
              />
            </div>
            <div>
              <div className="font-bold text-[18px]">Bui Tri Thuc</div>
              <div className="text-gray-500 text-[12px]">November 2023</div>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-md px-4 py-5">
          <div>
            Hotel recomendado 100% El lugar fue perfecto, es económico, muy limpio y cómodo, está
            cerca a muchos almacenes y el lago, hay varios restaurantes en la zona. El dueño fue muy
            gentil, nos permitió guarda
          </div>
          <div className="flex flex-row items-center gap-2">
            <div>
              <img
                className="rounded-full my-5 w-14 h-14"
                src="/images/vung-tau2.jpg"
                alt="avatar"
              />
            </div>
            <div>
              <div className="font-bold text-[18px]">Nguyen Trong Tin</div>
              <div className="text-gray-500 text-[12px]">December 2023</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const StepsRating: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const apartmentReviewModal = useAparmentReviewModal();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = Money.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <div className="w-full flex flex-row justify-end">
        <div className="mt-6 px-4">
          {current > 0 && (
            <button
              className="bg-common px-2  rounded-full text-white"
              style={{ margin: '0 8px' }}
              onClick={() => prev()}
            >
              {'<'}
            </button>
          )}
          {current < Money.length - 1 && (
            <button className="bg-common px-2  rounded-full text-white" onClick={() => next()}>
              {'>'}
            </button>
          )}
        </div>{' '}
      </div>

      <div>{Money[current].content}</div>
      <div className="">
        <button
          type="button"
          className="text-center border border-slate-700 rounded-lg text-xl py-3 px-6 hover:bg-gray-100 transition-all duration-300 transform active:scale-95"
        >
          Show all 39 reviews
        </button>
      </div>
    </>
  );
};

export default StepsRating;
