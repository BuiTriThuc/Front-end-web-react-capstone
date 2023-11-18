import DropDownEditResort from '@/app/components/staff/DropDownEditResort';
import ListActionApproveApartment from '@/app/components/staff/ListActionApproveApartment';
import requireAuth from '@/app/libs/requireAuth';
import Image from 'next/image';
import React from 'react';
import { AiOutlineCheck, AiOutlineClose, AiTwotoneStar } from 'react-icons/ai';
import { BiDollarCircle, BiMailSend } from 'react-icons/bi';
import { BsCalendarDate, BsClock } from 'react-icons/bs';
import { FaWifi } from 'react-icons/fa6';
import { FiPhoneCall } from 'react-icons/fi';
import { IoIosPeople } from 'react-icons/io';
import { RxRadiobutton } from 'react-icons/rx';

export default function StaffDetailResort() {
  return requireAuth(
    <div>
      <div className="mt-10">
        Staff {'>'} <span className="text-common">Detail Resort</span>
      </div>
      <div className="">
        <div className="flex-col">
          <div className="pb-6 w-full flex flex-row items-center justify-between">
            <div>
              <div className="pt-10  text-[40px]">
                JW Marriott Phu Quoc Emerald Bay Resort & Spa
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="font-bold text-[20px]">Address: </div>
                <div>Kien Giang Phu Quoc</div>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="font-bold text-[20px]">Property type: </div>
                <div>Deluxe, site</div>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="font-bold text-[20px]">Amenity: </div>
                <div>Sports, Dining services, Public area, health & wellness</div>
              </div>
            </div>
            <div>
              <DropDownEditResort />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-row justify-between items-center">
        <div>
          <Image
            src="/images/resort1.jpg"
            alt="destination"
            height={800}
            width={350}
            className="w-[628px] h-[318px] rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3 pl-[20px]">
            <Image
              src="/images/resortdetail1.jpg"
              alt="destination"
              height={800}
              width={350}
              className="w-[195px] h-[150px] rounded-xl"
            />
            <Image
              src="/images/resortdetail2.jpg"
              alt="destination"
              height={800}
              width={350}
              className="w-[195px] h-[150px] rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 pl-[20px]">
            <Image
              src="/images/resortdetail3.jpg"
              alt="destination"
              height={800}
              width={350}
              className="w-[195px] h-[150px] rounded-xl"
            />
            <Image
              src="/images/resortdetail4.jpg"
              alt="destination"
              height={800}
              width={350}
              className="w-[195px] h-[150px] rounded-xl"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className=" w-full">
          <div className="text-[25px] py-[30px]">Detail</div>
          <div className="pr-[30px]">
            <div className="pb-[10px]">
              Leave your guidebooks at home and dive into the local cultures that make each
              destination so special. Well connect you with our exclusive experiences. Each trip is
              carefully crafted to let enjoy your vacation.
            </div>
            <div>
              A wonderful serenity has taken possession of my entire soul, like these sweet mornings
              of spring which I enjoy with my whole heart. I am alone, and feel the charm of
              existence in this spot, which was created for the bliss of souls like mine. I am so
              happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence,
              that I neglect my talents.
            </div>
          </div>

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
          </div>
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
      {/* <ListActionApproveApartment /> */}
    </div>,
    [3]
  );
}
