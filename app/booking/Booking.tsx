'use client';

import React, { useState } from 'react';
import Container from '../components/Container';
import Calendar from '../components/input/Calendar';
import SearchBooking from './SearchBooking';
import ListRoom from './ListRoom';
import BookingPriceCard from './BookingPriceCard';
import BookingInformation from './BookingInformation';
import { usePathname, useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';

interface BookingProps {
  currentUser?: any;
}

const Booking: React.FC<BookingProps> = ({ currentUser }) => {
  const [selectedRoomData, setSelectedRoomData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const availableTimeId = searchParams?.get('availableTimeId');
  const userId = searchParams?.get('userId');
  const apartmentImage = searchParams?.get('apartmentImage');
  const apartmentName = searchParams?.get('aparmentName');
  const totalGuest = searchParams?.get('totalGuest');
  const dateRangeBooking = searchParams?.get('dateRangeBooking');
  const dateRange = searchParams?.get('dateRange');
  const apartmentAllowGuest = searchParams?.get('apartmentAllowGuest');
  const totalPrice = searchParams?.get('totalPrice');
  const priceNight = searchParams?.get('priceNight');

  return (
    <Container className="bg-white">
      <div className="grid grid-cols-2 gap-28 py-32 px-20">
        <div className="w-full">
          <BookingInformation
            totalGuest={totalGuest}
            apartmentAllowGuest={apartmentAllowGuest}
            dateRangeBooking={dateRangeBooking}
            dateRange={dateRange}
            availableTimeId={availableTimeId}
            userId={userId}
          />
        </div>
        <div className="w-full sticky">
          <BookingPriceCard
            apartmentImage={apartmentImage}
            apartmentName={apartmentName}
            totalPrice={totalPrice}
            priceNight={priceNight}
            dateRangeBooking={dateRangeBooking}
          />
        </div>
      </div>
    </Container>
  );
};

export default Booking;
