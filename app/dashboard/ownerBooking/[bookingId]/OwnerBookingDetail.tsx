'use client';

import { differenceInDays, format } from 'date-fns';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import React from 'react';

interface OwnerBookingDetailProps {
  ownerBookingDetail: any;
  memberBooking: any;
  ownerResort: any;
}

const OwnerBookingDetail: React.FC<OwnerBookingDetailProps> = ({
  ownerBookingDetail,
  memberBooking,
  ownerResort,
}) => {
  const calculateNightDifference = (startDate: any, endDate: any) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nightDifference = differenceInDays(end, start);
    return nightDifference;
  };

  return (
    <div className="grid md:grid-cols-2 py-8 gap-10">
      <div className="w-full h-full">
        {/* Title */}
        <div className="py-3">
          <div className="text-3xl font-bold">Your owner booking is successfully!</div>
          <div className="text-lg text-slate-500">
            You are going to {ownerBookingDetail?.resortName}
          </div>
        </div>

        {/* Information ownership */}
        <div className="flex flex-row gap-3 py-3">
          <div>
            <Image
              src="/images/placeholder.jpg"
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <div>{memberBooking?.content[0].fullName}</div>
            <div className="text-slate-500">
              {ownerResort?.content[0].addressLine
                .split(',')
                .map((part: any) => part.trim())
                .slice(-2)
                .join(', ')}
            </div>
            <div className="text-slate-500">On HolidaySwap since 2015</div>
          </div>
        </div>

        {/* Image apartment */}
        <div className="py-3 w-full h-80 relative rounded-lg">
          <Image src="/images/resort1.jpg" fill alt="resort" className="absolute rounded-lg" />
        </div>

        {/* Information apartment */}
        <div className="py-3">
          <div className="text-xl">{ownerBookingDetail?.propertyName}</div>
          <div className="text-slate-400">Description</div>
        </div>
      </div>

      <div className="w-full h-full py-5">
        {/* Check-in Check-out */}
        <div className="py-3 border-b border-slate-300 flex flex-row items-center justify-between">
          <div className="flex flex-col text-lg text-slate-500">
            <div>{format(new Date(ownerBookingDetail?.dateCheckIn), 'E')}, </div>
            <div>{format(new Date(ownerBookingDetail?.dateCheckIn), 'MMM dd, yyyy')}</div>
            <div>Check-in After 3PM</div>
          </div>
          <div className="flex flex-col text-lg text-slate-500">
            <div>{format(new Date(ownerBookingDetail?.dateCheckOut), 'E')}, </div>
            <div>{format(new Date(ownerBookingDetail?.dateCheckOut), 'MMM dd, yyyy')}</div>
            <div>Check-in After 3PM</div>
          </div>
        </div>

        {/* Guest */}
        <div className="py-3 flex flex-col text-slate-500 border-b border-slate-300">
          <div className="text-lg font-bold text-slate-600">Guests</div>
          <div>{ownerBookingDetail?.userOfBooking.length}</div>
        </div>

        {/* Payment */}
        <div className="py-3 flex flex-col border-b border-slate-300">
          <div className="text-lg font-bold text-slate-600">Income</div>
          <div className="flex flex-col gap-2 py-3">
            <div className="flex flex-row justify-between items-center text-slate-500">
              <div>
                {ownerBookingDetail?.price /
                  calculateNightDifference(
                    ownerBookingDetail?.dateCheckIn,
                    ownerBookingDetail?.dateCheckOut
                  )}{' '}
                point x{' '}
                {calculateNightDifference(
                  ownerBookingDetail?.dateCheckIn,
                  ownerBookingDetail?.dateCheckOut
                )}{' '}
                nights
              </div>
              <div>{ownerBookingDetail?.price}</div>
            </div>

            <div className="flex flex-row justify-between items-center text-slate-500">
              <div>HolidaySwap service fee</div>
              <div>{(ownerBookingDetail?.price * (10 / 100)).toFixed(1)}</div>
            </div>
          </div>
        </div>

        {/* Total payment */}
        <div className="py-3 flex flex-row items-center justify-between border-b border-slate-300">
          <div>Total received</div>
          <div>{ownerBookingDetail?.total}</div>
        </div>

        {/* Information guest */}
        <div className="py-3">
          <div className="text-lg font-bold text-slate-600">Information Guest</div>
          <div className="grid md:grid-cols-2 grid-cols-1 py-4">
            {ownerBookingDetail?.userOfBooking.map((item: any, index: number) => (
              <Card key={item.id} href="#" className="max-w-sm">
                <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.fullName}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">{item.email}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">{item.phoneNumber}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerBookingDetail;
