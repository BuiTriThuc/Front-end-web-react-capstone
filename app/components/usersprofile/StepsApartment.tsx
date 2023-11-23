'use client';
import React, { useState } from 'react';
import { message, Steps, theme } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';

const Money = [
  {
    title: 'First',
    content: (
      <div className=" py-5 w-full bg-white grid grid-cols-3 gap-4 items-center px-4 justify-center">
        <Link href="#">
          <div className="flex flex-col gap-1">
            <img className="rounded-t-md h-[120px]" src="./images/dak-lak.jpg" alt="" />
            <div className="grid grid-cols-2 gap-1">
              <img className="rounded-b-md h-[100px]" src="./images/vung-tau.jpg" alt="" />
              <img className="rounded-b-md h-[100px]" src="./images/vung-tau2.jpg" alt="" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-row w-full justify-between">
              <div className="font-bold">Garden view center</div>
              <div className="flex flex-row items-center">
                <AiFillStar color="orange" />
                <div>4.9</div>
              </div>
            </div>
            <div className="text-[12px] text-gray-500">Vung Bau resort</div>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col gap-1">
            <img className="rounded-t-md h-[120px]" src="./images/resort2.jpg" alt="" />
            <div className="grid grid-cols-2 gap-1">
              <img className="rounded-b-md h-[100px]" src="./images/vung-tau5.jpg" alt="" />
              <img className="rounded-b-md h-[100px]" src="./images/vung-tau6.jpg" alt="" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-row w-full justify-between">
              <div className="font-bold">Garden view center</div>
              <div className="flex flex-row items-center">
                <AiFillStar color="orange" />
                <div>4.9</div>
              </div>
            </div>
            <div className="text-[12px] text-gray-500">Vung Bau resort</div>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col gap-1">
            <img className="rounded-t-md h-[120px]" src="./images/resort1.jpg" alt="" />
            <div className="grid grid-cols-2 gap-1">
              <img className="rounded-b-md h-[100px]" src="./images/vung-tau4.jpg" alt="" />
              <img className="rounded-b-md h-[100px]" src="./images/vung-tau8.jpg" alt="" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-row w-full justify-between">
              <div className="font-bold">Garden view center</div>
              <div className="flex flex-row items-center">
                <AiFillStar color="orange" />
                <div>4.9</div>
              </div>
            </div>
            <div className="text-[12px] text-gray-500">Vung Bau resort</div>
          </div>
        </Link>
      </div>
    ),
  },
  {
    title: 'Second',
    content: (
      <div className=" py-5 w-full bg-white grid grid-cols-3 gap-4 items-center px-4 justify-center">
        <Link href="#">
          <div className="flex flex-col gap-1">
            <img className="rounded-t-md h-[120px]" src="./images/amenity1.jpg" alt="" />
            <div className="grid grid-cols-2 gap-1">
              <img className="rounded-b-md h-[100px]" src="./images/amenity2.jpg" alt="" />
              <img className="rounded-b-md h-[100px]" src="./images/amenity3.jpg" alt="" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-row w-full justify-between">
              <div className="font-bold">Garden view center</div>
              <div className="flex flex-row items-center">
                <AiFillStar color="orange" />
                <div>4.9</div>
              </div>
            </div>
            <div className="text-[12px] text-gray-500">Vung Bau resort</div>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col gap-1">
            <img className="rounded-t-md h-[120px]" src="./images/resort2.jpg" alt="" />
            <div className="grid grid-cols-2 gap-1">
              <img className="rounded-b-md h-[100px]" src="./images/resort3.jpg" alt="" />
              <img className="rounded-b-md h-[100px]" src="./images/resort4.jpg" alt="" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-row w-full justify-between">
              <div className="font-bold">Garden view center</div>
              <div className="flex flex-row items-center">
                <AiFillStar color="orange" />
                <div>4.9</div>
              </div>
            </div>
            <div className="text-[12px] text-gray-500">Vung Bau resort</div>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col gap-1">
            <img className="rounded-t-md h-[120px]" src="./images/resort1.jpg" alt="" />
            <div className="grid grid-cols-2 gap-1">
              <img className="rounded-b-md h-[100px]" src="./images/resort5.jpg" alt="" />
              <img className="rounded-b-md h-[100px]" src="./images/resort6.jpg" alt="" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-row w-full justify-between">
              <div className="font-bold">Garden view center</div>
              <div className="flex flex-row items-center">
                <AiFillStar color="orange" />
                <div>4.9</div>
              </div>
            </div>
            <div className="text-[12px] text-gray-500">Vung Bau resort</div>
          </div>
        </Link>
      </div>
    ),
  },
  {
    title: 'Third',
    content: (
      <div className=" py-5 w-full bg-white grid grid-cols-3 gap-4 items-center px-4 justify-center">
        <Link href="#">
          <div className="flex flex-col gap-1">
            <img className="rounded-t-md h-[120px]" src="./images/ho-chi-minh.jpeg" alt="" />
            <div className="grid grid-cols-2 gap-1">
              <img className="rounded-b-md h-[100px]" src="./images/gia-lai-img.jpg" alt="" />
              <img className="rounded-b-md h-[100px]" src="./images/phan-thiet.jpg" alt="" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-row w-full justify-between">
              <div className="font-bold">Garden view center</div>
              <div className="flex flex-row items-center">
                <AiFillStar color="orange" />
                <div>4.9</div>
              </div>
            </div>
            <div className="text-[12px] text-gray-500">Vung Bau resort</div>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col gap-1">
            <img className="rounded-t-md h-[120px]" src="./images/resort2.jpg" alt="" />
            <div className="grid grid-cols-2 gap-1">
              <img className="rounded-b-md h-[100px]" src="./images/vung-tau5.jpg" alt="" />
              <img className="rounded-b-md h-[100px]" src="./images/vung-tau6.jpg" alt="" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-row w-full justify-between">
              <div className="font-bold">Garden view center</div>
              <div className="flex flex-row items-center">
                <AiFillStar color="orange" />
                <div>4.9</div>
              </div>
            </div>
            <div className="text-[12px] text-gray-500">Vung Bau resort</div>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col gap-1">
            <img className="rounded-t-md h-[120px]" src="./images/resort6.jpg" alt="" />
            <div className="grid grid-cols-2 gap-1">
              <img className="rounded-b-md h-[100px]" src="./images/vung-tau4.jpg" alt="" />
              <img className="rounded-b-md h-[100px]" src="./images/vung-tau8.jpg" alt="" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-row w-full justify-between">
              <div className="font-bold">Garden view center</div>
              <div className="flex flex-row items-center">
                <AiFillStar color="orange" />
                <div>4.9</div>
              </div>
            </div>
            <div className="text-[12px] text-gray-500">Vung Bau resort</div>
          </div>
        </Link>
      </div>
    ),
  },
];

const StepsApartment: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const router = useRouter();

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
    </>
  );
};

export default StepsApartment;
