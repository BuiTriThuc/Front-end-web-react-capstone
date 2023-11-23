'use client';

import { differenceInDays, format } from 'date-fns';
import Image from 'next/image';
import React from 'react';
import { Card } from 'flowbite-react';
import useCreateReviewModal from '@/app/hooks/useCreateReviewModal';

interface BookingDetailProps {
  bookingDetail: any;
  ownerUser: any;
  ownerResort: any;
  currentUser: any;
}

const BookingDetail: React.FC<BookingDetailProps> = ({
  bookingDetail,
  ownerUser,
  ownerResort,
  currentUser,
}) => {
  const calculateNightDifference = (startDate: any, endDate: any) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nightDifference = differenceInDays(end, start);
    return nightDifference;
  };

  const createReviewModal = useCreateReviewModal();

  return (
    <div className="grid md:grid-cols-2 py-8 gap-10">
      <div className="w-full h-full">
        {/* Title */}
        <div className="py-3">
          <div className="text-3xl font-bold">Your booking is confirmed!</div>
          <div className="text-lg text-slate-500">You are going to {bookingDetail?.resortName}</div>
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
            <div>{ownerUser?.content[0].fullName}</div>
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
          <Image
            src={bookingDetail?.propertyImage}
            fill
            alt="resort"
            className="absolute rounded-lg"
          />
        </div>

        {/* Information apartment */}
        <div className="py-3">
          <div className="text-xl">{bookingDetail?.propertyName}</div>
          <div className="text-slate-400">Description</div>
        </div>

        {bookingDetail?.rating === true && (
          <div className="py-3">
            <button
              onClick={() =>
                createReviewModal.onOpen(bookingDetail?.availableTimeId, currentUser?.userId, bookingDetail?.id)
              }
              type="button"
              className="p-3 rounded-md bg-common hover:bg-hover text-white text-lg"
            >
              Review
            </button>
          </div>
        )}
      </div>

      <div className="w-full h-full py-5">
        {/* Check-in Check-out */}
        <div className="py-3 border-b border-slate-300 flex flex-row items-center justify-between">
          <div className="flex flex-col text-lg text-slate-500">
            <div>{format(new Date(bookingDetail?.dateCheckIn), 'E')}, </div>
            <div>{format(new Date(bookingDetail?.dateCheckIn), 'MMM dd, yyyy')}</div>
            <div>Check-in After 3PM</div>
          </div>
          <div className="flex flex-col text-lg text-slate-500">
            <div>{format(new Date(bookingDetail?.dateCheckOut), 'E')}, </div>
            <div>{format(new Date(bookingDetail?.dateCheckOut), 'MMM dd, yyyy')}</div>
            <div>Check-in After 3PM</div>
          </div>
        </div>

        {/* Guest */}
        <div className="py-3 flex flex-col text-slate-500 border-b border-slate-300">
          <div className="text-lg font-bold text-slate-600">Guests</div>
          <div>{bookingDetail?.userOfBooking.length}</div>
        </div>

        {/* Payment */}
        <div className="py-3 flex flex-col border-b border-slate-300">
          <div className="text-lg font-bold text-slate-600">Payment</div>
          <div className="flex flex-col gap-2 py-3">
            <div className="flex flex-row justify-between items-center text-slate-500">
              <div>
                {bookingDetail?.price /
                  calculateNightDifference(
                    bookingDetail?.dateCheckIn,
                    bookingDetail?.dateCheckOut
                  )}{' '}
                point x{' '}
                {calculateNightDifference(bookingDetail?.dateCheckIn, bookingDetail?.dateCheckOut)}{' '}
                nights
              </div>
              <div>{bookingDetail?.price}</div>
            </div>
          </div>
        </div>

        {/* Total payment */}
        <div className="py-3 flex flex-row items-center justify-between border-b border-slate-300">
          <div>Total</div>
          <div>{bookingDetail?.price}</div>
        </div>

        {/* Information guest */}
        <div className="py-3">
          <div className="text-lg font-bold text-slate-600">Information Guest</div>
          <div className="grid md:grid-cols-2 grid-cols-1 py-4">
            {bookingDetail?.userOfBooking.map((item: any, index: number) => (
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

export default BookingDetail;
