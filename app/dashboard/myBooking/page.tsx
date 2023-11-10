import GetBookingHistory from '@/app/actions/getBookingHistory';
import MyBookingList from '@/app/components/dashboard/MyBookingList';
import requireAuth from '@/app/libs/requireAuth';
import Link from 'next/link';
import React from 'react';

export default async function MyBooking() {
  const historyBooking = await GetBookingHistory();
  console.log('Check booking', historyBooking);
  return requireAuth(
    <div>
      <div className="mt-10">
        Dashboard {'>'} <span className="text-common">My Booking</span>
      </div>
      <div>
        <MyBookingList historyBooking={historyBooking} />
      </div>
    </div>,
    [2, 4]
  );
}
