'use client';

import React, { useState } from 'react';
import useAxiosAuthClient from '../hooks/useAxiosAuthClient';
import useLoginModal from '../hooks/useLoginModal';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { differenceInDays } from 'date-fns';
import TooltipCreatePoint from '../components/admin/tooltip/TooltipCreatePoint';
import TooltipFee from '../components/apartment/tooltip/ToolTipFee';

interface BookingPriceCardProps {
  apartmentImage: any;
  apartmentName: any;
  totalPrice: any;
  priceNight: any;
  dateRangeBooking: any;
}

const BookingPriceCard: React.FC<BookingPriceCardProps> = ({
  apartmentImage,
  apartmentName,
  totalPrice,
  priceNight,
  dateRangeBooking,
}) => {
  const dateRangeJSON = JSON.parse(dateRangeBooking);
  const [dateRangeValue, setDateRangeValue] = useState({
    startDate: new Date(dateRangeJSON?.startDate?.split('T', 1)[0] as string),

    endDate: new Date(dateRangeJSON?.endDate?.split('T', 1)[0] as string),
    key: 'selection',
  });

  const calculateNightDifference = (startDate: any, endDate: any) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nightDifference = differenceInDays(end, start);
    return nightDifference;
  };

  console.log('Check date range booking in booking price', dateRangeValue);
  return (
    <div className="bg-white p-4 flex flex-col rounded-xl shadow-xl border border-gray-200 sticky top-44">
      <div className="w-full py-4 border-b border-gray-400">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1 h-40 w-full relative">
            <Image src={apartmentImage} fill alt="image" className="object-cover rounded-lg" />
          </div>
          <div className="w-full">
            <div className="text-[10px]">Entire apartment</div>
            <div className="text-[20px] w-full py-1 font-bold">{apartmentName}</div>
            <div className="pb-1">Vung Bau Resort</div>
            <div className="py-1 flex flex-row items-center gap-1">
              <div className="flex flex-row items-center">
                <img className="w-5 h-5 rounded-full" src="./images/avt.jpg" alt="" />
              </div>
              <div className="text-[12px]">Owner by Pham Thanh Kien</div>
            </div>
            <div className="flex flex-row items-center">
              <AiFillStar color="orange" size={15} />
              4.8
            </div>
          </div>
        </div>
      </div>

      {/* Price Details */}
      <div className="flex flex-col py-8 w-full border-b border-gray-400">
        <div className="text-2xl font-bold py-3">Price Details</div>
        <div className="flex flex-row justify-between text-base text-gray-600">
          <div>
            {priceNight} x {''}
            {calculateNightDifference(dateRangeValue.startDate, dateRangeValue.endDate)} night
          </div>
          <div>
            {priceNight *
              calculateNightDifference(dateRangeValue.startDate, dateRangeValue.endDate)}{' '}
            point
          </div>
        </div>
        <div className="flex flex-row justify-between text-base text-gray-600">
          <div className="flex flex-row items-center gap-2">
            <div>Service fee HolidaySwap</div>
            <TooltipFee />
          </div>
          <div>10 point</div>
        </div>
      </div>

      {/* Total */}
      <div className="flex flex-row justify-between py-8 text-base font-bold">
        <div>Total</div>
        <div>{totalPrice} point</div>
      </div>
    </div>
  );
};

export default BookingPriceCard;
