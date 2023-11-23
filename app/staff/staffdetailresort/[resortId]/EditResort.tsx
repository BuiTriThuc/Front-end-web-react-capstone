'use client';

import DropDownEditResort from '@/app/components/staff/DropDownEditResort';
import Image from 'next/image';
import React, { Fragment, useState } from 'react';
import MapResort from '../MapResort';
import { RxRadiobutton } from 'react-icons/rx';
import { FiPhoneCall } from 'react-icons/fi';
import { BiMailSend } from 'react-icons/bi';
import { PiSquaresFourLight } from 'react-icons/pi';
import Link from 'next/link';
import { Drawer, DrawerProps } from 'antd';
import ViewFullImage from '@/app/components/apartment/ViewFullImage';

interface EditResortProps {
  resortDetail: any;
}

const EditResort: React.FC<EditResortProps> = ({ resortDetail }) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('bottom');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <div className="">
        <div className="flex-col">
          <div className="pb-6 w-full flex flex-row items-center justify-between">
            <div className="flex flex-col gap-3">
              <div className="pt-10  text-[40px]">{resortDetail.resortName}</div>
              <div className="flex flex-row items-center gap-1">
                <div className="font-bold text-[20px]">Address: </div>
                <div>{resortDetail.addressLine}</div>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="font-bold text-[20px]">Property type: </div>
                <div>
                  {resortDetail.propertyTypes.map((row: any, index: any) => (
                    <React.Fragment key={index}>
                      <span className="inline-block">{row.propertyTypeName}</span>
                      {index < resortDetail.propertyTypes.length - 1 && <span>, </span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="flex flex-row  gap-1">
                <div className="font-bold text-[20px]">Amenity: </div>
                <div>
                  {resortDetail.resortAmenityTypes.map((row: any, index: any) => (
                    <React.Fragment key={index}>
                      <span className="inline-block">{row.resortAmenityTypeName}</span>
                      {index < resortDetail.propertyTypes.length - 1 && <span>, </span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <DropDownEditResort resortId={resortDetail.id} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  gap-2 py-4 md:grid md:grid-cols-2 md:h-[55vh] lg:h-[60vh] md:gap-2 md:py-4">
        <div className=" w-full h-80  relative md:w-full md:rounded-l-xl md:h-96 md:relative md:overflow-hidden lg:w-full lg:h-auto lg:rounded-l-xl lg:relative lg:overflow-hidden xl:h-auto xl:w-full xl:rounded-l-xl xl:relative xl:overflow-hidden ">
          <Image
            onClick={showDrawer}
            key={resortDetail.resortImages[0].id}
            alt="image"
            fill
            src={resortDetail.resortImages[0].link}
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
            {resortDetail.resortImages.slice(1, 5).map((item: any, index: number) => (
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

      <div className="w-full h-[700px] my-10 ">
        <MapResort
          latitude={resortDetail.latitude}
          id={resortDetail.id}
          resortName={resortDetail.resortName}
          longitude={resortDetail.longitude}
        />
      </div>
      <div className="flex flex-row items-center">
        <div className=" w-full">
          <div className="text-[25px] py-[30px]">Detail</div>
          <div className="pr-[30px]">
            <div className="pb-[10px]">{resortDetail.resortDescription}</div>
          </div>
          {/* 
          <div className="py-5 ">
            <div className="flex flex-row items-center  mb-[10px]">
              <RxRadiobutton className="mr-[10px]" />
              <div>View the City Walls</div>
            </div>
            <div className="flex flex-row items-center mb-[10px] ">
              <RxRadiobutton className="mr-[10px]" />
              <div>Hiking in the forest</div>
            </div>
            <div className="flex flex-row items-center mb-[10px] ">
              <RxRadiobutton className="mr-[10px]" />
              <div>Discover the famous view point “The Lark”</div>
            </div>
            <div className="flex flex-row items-center mb-[10px] ">
              <RxRadiobutton className="mr-[10px]" />
              <div>Sunset on the cruise</div>
            </div>
          </div> */}
          <div className="h-[0.5px] bg-gray-300 mb-[20px] mr-[430px]"></div>
        </div>
        <div className="flex flex-col">
          <div className="w-[387px] h-auto bg-white border border-black rounded-lg flex flex-col justify-center mb-[40px]">
            <div className="ml-[40px] text-[30px] pt-3 pb-2">Need help?</div>
            <div className="ml-[40px]">
              <div className="flex flex-row items-center py-[20px]">
                <FiPhoneCall size={25} className="mr-[10px]" />
                085659778
              </div>
              <div className="flex flex-row items-center pb-[10px]">
                <BiMailSend size={25} className="mr-[10px]" />
                Holidayswap@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer placement={placement} width={500} onClose={onClose} open={open}>
        <ViewFullImage listImage={resortDetail.resortImages} />
      </Drawer>
    </Fragment>
  );
};

export default EditResort;
