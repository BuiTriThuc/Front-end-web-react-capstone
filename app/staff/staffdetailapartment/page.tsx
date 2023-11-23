import TabRightSideBar from '@/app/components/detailResort/TabRightSideBar';
import requireAuth from '@/app/libs/requireAuth';
import Link from 'next/link';
import React from 'react';
import { BsFillHouseCheckFill } from 'react-icons/bs';
import { FaBath, FaBed, FaKitchenSet } from 'react-icons/fa6';
import { MdOutlineApartment } from 'react-icons/md';

export default function StaffDetailApartment() {
  return requireAuth(
    <div>
      <div>
        <div className="">
          <div className="bg-[#CDE0D2] w-full h-[400px] relative flex flex-col mb-5  ">
            <div className="flex flex-row">
              <div>
                <img
                  className=" border-[8px] border-b-[14px] border-gray-400 overflow-hidden absolute w-[150px] h-[150px] "
                  src="/images/resort1.jpg"
                  alt=""
                  style={{ transform: 'rotate(10deg)' }}
                />
              </div>
              <div className="bg-green-300 w-[200px] h-[30px] absolute right-0 mt-6"></div>
              <div className="pl-48 pt-7">
                <div className="text-[30px] text-common py-2">Khách sạn Nha Trang</div>
                <div>Thành Phố Nha Trang, Tỉnh Khánh Hòa</div>
              </div>
            </div>
            <div className="px-10">
              <div className=" flex flex-row mt-20">
                <div className="flex flex-row">
                  <div className="bg-white w-[50px] h-[50px] rounded-full  flex flex-row items-center justify-center">
                    <FaBed size={30} />
                  </div>
                  <div className="px-5">
                    <div>2 Bedrooms</div>
                    <div>Sleeps 8</div>
                    <div>Beds: 2 King, 2 Sofa beds</div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="bg-white w-[50px] h-[50px] rounded-full  flex flex-row items-center justify-center ml-[100px]">
                    <MdOutlineApartment size={30} />
                  </div>
                  <div className="px-5">
                    <div>2 Bedrooms</div>
                    <div>Sleeps 8</div>
                    <div>Beds: 2 King, 2 Sofa beds</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row  mt-10">
                <div className="flex flex-row items-center">
                  <div className="bg-white w-[50px] h-[50px] rounded-full  flex flex-row items-center justify-center ">
                    <FaBath size={30} />
                  </div>
                  <div className="px-5">
                    <div>2 Bathrooms</div>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <div className="bg-white w-[50px] h-[50px] rounded-full  flex flex-row items-center justify-center ml-[200px]">
                    <FaKitchenSet size={30} />
                  </div>
                  <div className="px-5">
                    <div>Full kitchen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center ">
          <div>
            <div>
              <div className="w-full h-auto border border-gray-300 flex flex-col items-center py-2 ">
                <div className="flex flex-row px-4 items-center py-3">
                  <BsFillHouseCheckFill size={50} color="orange" />
                  <div className="text-[27px] ml-2 text-common font-semibold">
                    $3,469 ($496/night)
                  </div>
                </div>
                <div className="px-[20px] text-[14px] py-3 text-[#1487A2]">
                  Monthly payments available with Affirm
                </div>
                <div className="text-[20px] font-bold pb-2]">7-Night stay</div>
                <div className="pb-2 text-[20px]">
                  Checkin: <span className="text-[20px] font-bold ]">Sat, Jan 20, 2024</span>
                </div>
                <div className="pb-2 text-[20px]">
                  Checkout: <span className="text-[20px] font-bold ]">Sat, Jan 27, 2024</span>
                </div>
                <div className="pb-2 text-[20px]">
                  Cancellation policy: <span className="text-[20px] font-bold ]">Moderate</span>
                </div>
                <button className="px-14 mb-2 text-white py-2 rounded-lg bg-common">
                  Request Exchange
                </button>

                <div className="w-[300px] my-3   h-[1px] bg-gray-300"></div>
                <div className="text-[35px] font-bold">
                  Holiday<span className="text-common font-bold">Swap</span>
                </div>
                <div className="text-[14px]">Full-service verified </div>
                <div className="flex flex-row mt-5 text-[15px]">
                  <div>Questions?</div>
                  <Link className="text-green-500" href="/#">
                    Get in touch »
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[387px] h-auto bg-white shadow-xl rounded-lg mb-[40px] mt-[50px] ml-10">
            <div className="px-[40px] ">
              <div className="py-2 text-[20px] font-bold text-common">Best Change</div>
              <TabRightSideBar />
            </div>
          </div>
        </div>

        <div className="flex flex-col ml-10 ">
          <button className="px-4 py-3 bg-red-500 text-white rounded-md mb-5 ">Delete</button>
          <button className="px-4 py-3 bg-common text-white rounded-md">Approve</button>
        </div>
      </div>
    </div>,
    [3]
  );
}
