import React from 'react';
import OwnerBookingDetail from './OwnerBookingDetail';
import GetOwnerHistoryBookingById from '@/app/actions/getOwnerHistoryBookingById';
import GetListUser from '@/app/actions/getListUser';
import GetListResort from '@/app/actions/getListResort';

interface IParams {
  bookingId: string;
}

export default async function OwnerBookingDetailPage({ params }: { params: IParams }) {
  const ownerBookingDetail = await GetOwnerHistoryBookingById(params);
  const memberBooking = await GetListUser({ email: ownerBookingDetail?.memberBookingEmail });
  const ownerResort = await GetListResort('0', { resortName: ownerBookingDetail?.resortName });

  return (
    <OwnerBookingDetail
      ownerBookingDetail={ownerBookingDetail}
      memberBooking={memberBooking}
      ownerResort={ownerResort}
    />
  );
}
