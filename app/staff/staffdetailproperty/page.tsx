import DropDownEditResort from '@/app/components/staff/DropDownEditResort';
import DropDownPropertyDetail from '@/app/components/staff/DropDownPropertyDetail';
import requireAuth from '@/app/libs/requireAuth';
import Image from 'next/image';
import React from 'react';
import { AiOutlineFundView } from 'react-icons/ai';
import { BsFillUmbrellaFill, BsTelephone } from 'react-icons/bs';
import { FaWifi } from 'react-icons/fa6';
import { FiSlack } from 'react-icons/fi';
import { GiSofa, GiWaterDrop } from 'react-icons/gi';
import { MdDry, MdOutlineBalcony, MdSportsBar } from 'react-icons/md';
import { PiTelevisionBold, PiToiletPaperFill } from 'react-icons/pi';
import { RxRadiobutton } from 'react-icons/rx';
import { TbDeviceAudioTape, TbWashEco } from 'react-icons/tb';

export default function StaffDetailResort() {
  return requireAuth(
    <div>
      <div>
        Staff {'>'} <span className="text-common">Detail Property</span>
      </div>
      <div className="">
        <div className="flex-col">
          <div className=" w-full flex flex-row items-center justify-between">
            <div>
              <div className="pt-10  text-[40px]">VIP property luxury</div>
              <div className="text-gray-500">Resort Phu Quoc</div>
            </div>
            <div>
              <DropDownPropertyDetail />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center w-[850px] justify-between pb-[10px]">
              <div className="flex flex-row items-center pt-8 ">
                <PiToiletPaperFill size={20} color="" className="mr-[10px]" />
                <span className="pl-1 text-gray-500 text-[17px]">Privates toilet</span>
              </div>
              <div className="flex flex-row items-center pt-8 ">
                <PiTelevisionBold size={22} color="" className="mr-[10px]" />
                <span className="pl-1 text-gray-500 text-[17px]">TV</span>
              </div>
              <div className="flex flex-row items-center pt-8 ">
                <MdOutlineBalcony size={22} color="" className="mr-[10px]" />
                <span className="pl-1 text-gray-500 text-[17px]">Balcony</span>
              </div>
              <div className="flex flex-row items-center pt-8 ">
                <FaWifi size={20} color="" className="mr-[10px]" />
                <span className="pl-1 text-gray-500 text-[17px]">Wifi</span>
              </div>
              <div className="flex flex-row items-center pt-8 ">
                <GiSofa size={20} color="" className="mr-[10px]" />
                <span className="pl-1 text-gray-500 text-[17px]">Sofa</span>
              </div>
              <div className="flex flex-row items-center pt-8 ">
                <TbDeviceAudioTape size={22} color="" className="mr-[10px]" />
                <span className="pl-1 text-gray-500 text-[17px]">Audio equiqment</span>
              </div>
            </div>
            <div className="flex flex-row items-center w-[850px] justify-between pb-[30px]">
              <div className="flex flex-row items-center  ">
                <BsFillUmbrellaFill size={20} color="" className="mr-[10px]" />
                <span className="pl-1 text-gray-500 text-[17px]">Umbrella</span>
              </div>
              <div className="flex flex-row items-center  ">
                <MdSportsBar size={22} color="" className="mr-[10px]" />
                <span className="pl-1 text-gray-500 text-[17px]">Mini bar</span>
              </div>
              <div className="flex flex-row items-center  ">
                <BsTelephone size={22} color="" className="mr-[10px]" />
                <span className="pl-1 text-gray-500 text-[17px]">Telephone</span>
              </div>
              <div className="flex flex-row items-center  ">
                <MdDry size={20} color="" className="mr-[10px]" />
                <span className="pl-1 text-gray-500 text-[17px]">Hair dryer</span>
              </div>
              <div className="flex flex-row items-center  ">
                <GiWaterDrop size={20} color="" className="mr-[10px]" />
                <span className="pl-1 text-gray-500 text-[17px]">Shampoo</span>
              </div>
              <div className="flex flex-row items-center  ">
                <TbWashEco size={22} color="" className="mr-[10px]" />
                <span className="pl-1 text-gray-500 text-[17px]">Body wash</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-row justify-between items-center">
        <div>
          <Image
            src="/images/amenity1.jpg"
            alt="destination"
            height={800}
            width={350}
            className="w-[620px] h-[318px] rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3 pl-[20px]">
            <Image
              src="/images/amenity2.jpg"
              alt="destination"
              height={800}
              width={350}
              className="w-[195px] h-[150px] rounded-xl"
            />
            <Image
              src="/images/amenity3.jpg"
              alt="destination"
              height={800}
              width={350}
              className="w-[195px] h-[150px] rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 pl-[20px]">
            <Image
              src="/images/amenity4.jpg"
              alt="destination"
              height={800}
              width={350}
              className="w-[195px] h-[150px] rounded-xl"
            />
            <Image
              src="/images/amenity5.jpg"
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
          <div className="text-[25px] py-[30px]">Description</div>
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
            <div className="ml-[40px] text-[30px] pt-3 pb-2">Property</div>
            <div className="ml-[40px]">
              <div className="flex flex-row items-center py-[20px]">
                <FiSlack size={25} className="mr-[10px]" />
                Queen
              </div>
              <div className="flex flex-row items-center pb-[10px]">
                <AiOutlineFundView size={25} className="mr-[10px]" />
                Beachfont view
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
