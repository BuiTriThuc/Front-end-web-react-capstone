'use client';
import ViewFullImage from '@/app/components/apartment/ViewFullImage';
import { Button, Drawer, DrawerProps, RadioChangeEvent, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { PiSquaresFourLight } from 'react-icons/pi';

interface ApartmentDetailHeaderProps {
  apartment?: any;
  rating?: any;
}

const ApartmentDetailHeader: React.FC<ApartmentDetailHeaderProps> = ({ apartment, rating }) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('bottom');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full">
      <div className="text-xl font-bold py-3 md:text-2xl md:font-bold md:py-3 lg:text-2xl lg:font-bold lg:py-3 xl:text-2xl xl:font-bold xl:py-3">
        {apartment.availableTime.coOwner.property.propertyName}
      </div>
      <div className="w-full py-3">
        <div className="font-normal text-base text-black flex flex-row gap-4">
          {apartment.availableTime.coOwner.property.rating && (
            <div className="flex flex-row items-center">
              <AiFillStar size={18} /> {apartment.availableTime.coOwner.property.rating} ·{' '}
              {rating ? `${rating?.content.length} reviews` : ''}
            </div>
          )}
          <div>·</div>
          <div>{apartment.availableTime.coOwner.property.resort.resortName}</div>
        </div>

        <div className="w-full  gap-2 py-4 md:grid md:grid-cols-2 md:h-[55vh] lg:h-[60vh] md:gap-2 md:py-4">
          <div className=" w-full h-80  relative md:w-full md:rounded-l-xl md:h-96 md:relative md:overflow-hidden lg:w-full lg:h-auto lg:rounded-l-xl lg:relative lg:overflow-hidden xl:h-auto xl:w-full xl:rounded-l-xl xl:relative xl:overflow-hidden ">
            <Image
              onClick={showDrawer}
              key={apartment.availableTime.coOwner.property.propertyImages[0].id}
              alt="image"
              fill
              src={apartment.availableTime.coOwner.property.propertyImages[0].link}
              className="w-[100%] md:object-cover md:h-full md:cursor-pointer lg:object-cover lg:h-full lg:cursor-pointer xl:object-cover xl:h-full xl:cursor-pointer"
            />
            <Link
              href="#"
              className="absolute bottom-2 right-2 flex flex-row  items-center gap-2 px-4 py-1 bg-white border border-black rounded-md cursor-pointer hover:bg-gray-200 md:hidden lg:hidden xl:hidden"
            >
              <PiSquaresFourLight size={25} onClick={showDrawer} />
              <button onClick={showDrawer}>View all image</button>
            </Link>
          </div>

          <div className="relative hidden md:block md:relative lg:block lg:relative xl:block xl:relative">
            <div className="hidden md:grid md:grid-cols-2 md:gap-2 md:rounded-r-xl lg:grid lg:grid-cols-2 lg:gap-2 lg:rounded-r-xl xl:grid xl:grid-cols-2 xl:gap-2 xl:rounded-r-xl">
              {apartment.availableTime.coOwner.property.propertyImages.slice(1, 5).map((item: any, index: number) => (
                <div
                  key={item.id}
                  className={`w-full md:h-[189px] lg:h-[220px] relative overflow-hidden  md:block ${
                    index === 1 ? 'rounded-tr-xl' : ''
                  } ${index === 3 ? 'rounded-br-xl' : ''}`}
                >
                  <Image
                    onClick={showDrawer}
                    key={item.id}
                    alt="image"
                    fill
                    src={item.link}
                    className="object-cover w-full cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <Link
              href="#"
              className="hidden xl:absolute xl:bottom-2 xl:right-2 xl:flex xl:flex-row  xl:items-center xl:gap-2 xl:px-4 xl:py-1 xl:bg-white xl:border xl:border-black xl:rounded-md xl:cursor-pointer xl:hover:bg-gray-200"
            >
              <PiSquaresFourLight size={25} onClick={showDrawer} />
              <button onClick={showDrawer}>View all image</button>
            </Link>
          </div>
        </div>
      </div>
      <Drawer placement={placement} width={500} onClose={onClose} open={open}>
        <ViewFullImage listImage={apartment.availableTime.coOwner.property.propertyImages} />
      </Drawer>
    </div>
  );
};

export default ApartmentDetailHeader;
