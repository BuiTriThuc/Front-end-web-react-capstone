import GetOwnerHistoryBooking from '@/app/actions/getOwnerHistoryBooking';
import OwnerBooking from '@/app/components/dashboard/OwnerBooking'
import requireAuth from '@/app/libs/requireAuth';
import React from 'react'

export default async function OwnerBookingPage() {
    const historyOwnerBooking = await GetOwnerHistoryBooking();

  return requireAuth(
    <div>
      <div className="mt-10">
        Dashboard {'>'} <span className="text-common">Owner Booking</span>
      </div>
      <div>
        <OwnerBooking historyOwnerBooking={historyOwnerBooking} />
      </div>
    </div>,
    [2]
  );
}
