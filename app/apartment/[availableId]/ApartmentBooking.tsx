'use client';

import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { differenceInDays, format } from 'date-fns';
import CalendarAparment from '../CalendarAparment';
import { useRouter } from 'next/navigation';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useDateRange } from '../DateRangeContext';
import toast from 'react-hot-toast';
import { useGuest } from '../GuestContext';

interface ApartmentBookingProps {
  dateRange: any;
  apartment: any;
  dateOut: any;
  currentUser?: any;
  handleChangeDateRange: (value: any) => void;
  apartmentAllowGuest: number;
  dateRangeDefault: any;
}

const ApartmentBooking: React.FC<ApartmentBookingProps> = ({
  dateRange,
  apartment,
  dateOut,
  currentUser,
  handleChangeDateRange,
  apartmentAllowGuest,
  dateRangeDefault,
}) => {
  const initialDateRange = {
    startDate: new Date(apartment.availableTime.startTime),
    endDate: new Date(apartment.availableTime.endTime),
    key: 'selection',
  };
  const [visibleGuest, setVisibleGuest] = useState(false);
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [dateRangeBooking, setDateRangeBooking] = useState<Date[]>(dateRange);
  const [adultsGuest, setAdultsGuest] = useState(1);
  const [childrenGuest, setChildrenGuest] = useState(0);
  const [totalGuest, setTotalGuest] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const {
    adultGuestContext,
    childrenGuestContext,
    totalGuestContext,
    allowTotalGuestContext,
    setAdultGuestContext,
    setChildrenGuestContext,
    setTotalGuestContext,
    setAllowTotalGuestContext,
  } = useGuest();

  useEffect(() => {
    if (apartmentAllowGuest) {
      setAllowTotalGuestContext(apartmentAllowGuest);
    }
  }, [apartmentAllowGuest]);

  const loginModal = useLoginModal();
  const router = useRouter();
  const {
    dateRangeContext,
    setDateRangeContext,
    dateRangeDefaultContext,
    setDateRangeDefaultContext,
  } = useDateRange();

  const handleDescreaseAdultGuest = (value: number) => {
    if (value <= 1) {
      return 1;
    }

    setAdultGuestContext(value - 1);
    setTotalGuestContext(totalGuestContext - 1);
  };

  const handleInscreaseAdultGuest = (value: number) => {
    if (value >= allowTotalGuestContext || value + childrenGuestContext >= allowTotalGuestContext) {
      return value;
    }

    setAdultGuestContext(value + 1);
    setTotalGuestContext(totalGuestContext + 1);
  };

  const handldeDescreaseChildrenGuest = (value: number) => {
    if (value <= 0) {
      return 0;
    }

    setChildrenGuestContext(value - 1);
    setTotalGuestContext(totalGuestContext - 1);
  };

  const handleInscreaseChildrenGuest = (value: number) => {
    if (value >= allowTotalGuestContext || value + adultGuestContext >= allowTotalGuestContext) {
      return value;
    }

    setChildrenGuestContext(value + 1);
    setTotalGuestContext(totalGuestContext + 1);
  };

  const calculateNightDifference = (startDate: any, endDate: any) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    console.log('startDate', start);
    console.log('end date', end);
    const nightDifference = differenceInDays(end, start);
    return nightDifference;
  };

  const handleVisibleCalendar = () => {
    if (visibleGuest) {
      setVisibleGuest(false);
      setVisibleCalendar(!visibleCalendar);
    } else {
      setVisibleCalendar(!visibleCalendar);
    }
  };

  const handleVisibleGuest = () => {
    if (visibleCalendar) {
      setVisibleCalendar(false);
      setVisibleGuest(!visibleGuest);
    } else {
      setVisibleGuest(!visibleGuest);
    }
  };

  const startDateISOString = dateRange?.startDate?.toISOString();
  const endDateISOString = dateRange?.endDate?.toISOString();

  const fixedDateRange = {
    startDate: startDateISOString,
    endDate: endDateISOString,
    key: dateRange.key,
  };

  const handleBooking = () => {
    if (!currentUser) {
      loginModal.onOpen();
    } else if (currentUser.role.roleId !== 2) {
      toast('Only membership are allowed to booking!', {
        icon: '🚫',
      });
    } else if (totalPrice <= 0) {
      toast.error('Please choose check-in and check-out day to booking!');
    } else {
      router.push(
        `/booking?availableTimeId=${apartment.availableTime.id}&apartmentImage=${
          apartment.availableTime.coOwner.property.propertyImages[0].link
        }&aparmentName=${apartment.availableTime.coOwner.property.propertyName}&priceNight=${
          apartment.availableTime.pricePerNight
        }&userId=${
          currentUser.userId
        }&totalPrice=${totalPrice}&totalGuest=${totalGuest}&dateRangeBooking=${JSON.stringify(
          dateRangeBooking
        )}&dateRange=${JSON.stringify(
          fixedDateRange
        )}&apartmentAllowGuest=${apartmentAllowGuest}&avatar=${
          apartment.availableTime.coOwner.user.avatar
        }&fullName=${apartment.availableTime.coOwner.property.fullName}&rating=${
          apartment.availableTime.coOwner.property.rating
        }&resortName=${apartment.availableTime.coOwner.property.resort.resortName}&username=${
          apartment.availableTime.coOwner.property.username
        }`
      );
    }
  };

  useEffect(() => {
    // Calculate the number of nights
    const nightDifference = calculateNightDifference(
      dateRangeContext.startDate,
      dateRangeContext.endDate
    );

    // Calculate the price for the nights
    const nightsPrice = nightDifference * apartment.availableTime.pricePerNight;

    // Calculate the total price (nights price + cleaning fee + service fee)
    const total = nightsPrice;

    // Update the total price in the state
    setTotalPrice(total);
  }, [dateRangeContext, apartment]);

  return (
    <Fragment>
      <div className="hidden md:block md:sticky md:top-28">
        <div className="bg-white p-4 rounded-xl flex flex-col border border-gray-400 shadow-lg ">
          <span className="flex flex-row text-gray-800 text-lg py-5">
            <span className="font-bold text-2xl text-black">
              {totalPrice} point <span className="text-gray-600 text-lg">total</span>
            </span>
          </span>

          <div className="flex flex-col rounded-lg boder border-gray-600">
            {/* Check-in / Check-out */}
            {dateRangeContext ? (
              <div
                onClick={handleVisibleCalendar}
                className={`grid grid-cols-2 rounded-t-lg  ${
                  visibleCalendar ? 'border-2 border-black' : 'border border-gray-600'
                } `}
              >
                <div
                  className={`p-2 border-r  ${
                    visibleGuest ? 'border-b-2 border-black' : 'border-gray-600'
                  }`}
                >
                  <div className="text-xs">CHECK-IN</div>
                  <input
                    type="text"
                    readOnly
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChangeDateRange({
                        ...dateRangeContext,
                        startDate: new Date(e.target.value),
                      })
                    }
                    className="border-0 text-base text-gray-600 focus:outline-0 focus:outline-transparent focus:border-0 focus:border-transparent focus:ring-0 w-full"
                    value={`${format(new Date(dateRangeContext?.startDate), 'dd/MM/yyyy')}`}
                  />
                </div>
                <div
                  className={`p-2  ${visibleGuest ? 'border-b-2 border-black' : 'border-gray-600'}`}
                >
                  <div className="text-xs">CHECK-OUT</div>
                  <input
                    type="text"
                    readOnly
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChangeDateRange({
                        ...dateRangeContext,
                        endDate: new Date(e.target.value),
                      })
                    }
                    className="border-0 text-base text-gray-600 focus:outline-0 focus:outline-transparent focus:border-0 focus:border-transparent focus:ring-0 w-full"
                    value={`${format(new Date(dateRangeContext?.endDate), 'dd/MM/yyyy')}`}
                  />
                </div>
              </div>
            ) : (
              ''
            )}
            {visibleCalendar ? (
              <CalendarAparment
                value={dateRangeContext}
                onChange={(value: any) => {
                  handleChangeDateRange(value);
                  setDateRangeBooking(value.selection);
                  setDateRangeContext(value.selection);
                }}
                className="w-auto xl:w-[700px] xl:absolute xl:top-36 xl:-left-[352px] xl:z-30 xl:!text-[1em]"
                disabledDates={dateOut}
                minDate={dateRangeDefaultContext?.startDate}
                maxDate={dateRangeDefaultContext?.endDate}
              />
            ) : (
              ''
            )}

            {/* Guest */}
            <div
              onClick={handleVisibleGuest}
              className={`flex flex-row justify-between items-center p-2 rounded-b-lg border-t-0  ${
                visibleGuest ? 'border-black border-2' : 'border-gray-600 border'
              }`}
            >
              <div className="flex flex-col">
                <div className="text-xs">GUEST</div>
                <div className="text-gray-800 text-base">
                  {totalGuestContext === 1
                    ? `${totalGuestContext} guest`
                    : `${totalGuestContext} guests`}
                </div>
              </div>

              {visibleGuest ? <BsChevronUp size={25} /> : <BsChevronDown size={25} />}
            </div>
            {visibleGuest ? (
              <div className="w-full flex flex-col absolute top-[200px] left-0 z-30 p-5 rounded-md bg-white border border-gray-500">
                <div className="flex flex-row items-center justify-between py-3">
                  <div className="flex flex-col">
                    <div className="font-bold">Adults</div>
                    <div className="text-xs text-gray-700">Age 18+</div>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => handleDescreaseAdultGuest(adultGuestContext)}
                      type="button"
                    >
                      <MinusCircleOutlined
                        style={{
                          fontSize: 30,
                          color: `${adultGuestContext <= 1 ? 'gray' : ''}`,
                        }}
                      />
                    </button>
                    <div className="w-5 text-center">{adultGuestContext}</div>
                    <button
                      onClick={() => handleInscreaseAdultGuest(adultGuestContext)}
                      type="button"
                    >
                      <PlusCircleOutlined
                        style={{
                          fontSize: 30,
                          color: `${totalGuestContext >= allowTotalGuestContext ? 'gray' : ''}`,
                        }}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between py-3">
                  <div className="flex flex-col">
                    <div className="font-bold">Children</div>
                    <div className="text-xs text-gray-700">Ages 12 - 17</div>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => handldeDescreaseChildrenGuest(childrenGuestContext)}
                      type="button"
                    >
                      <MinusCircleOutlined
                        style={{
                          fontSize: 30,
                          color: `${childrenGuestContext <= 0 ? 'gray' : ''}`,
                        }}
                      />
                    </button>
                    <div className="w-5 text-center">{childrenGuestContext}</div>
                    <button
                      onClick={() => handleInscreaseChildrenGuest(childrenGuestContext)}
                      type="button"
                    >
                      <PlusCircleOutlined
                        style={{
                          fontSize: 30,
                          color: `${totalGuest >= allowTotalGuestContext ? 'gray' : ''}`,
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}

            {/* Button Booking */}
            <div className="py-4">
              <button
                onClick={handleBooking}
                className="w-full p-4 bg-common hover:bg-hover text-white text-center font-bold text-lg rounded-lg"
              >
                Booking
              </button>
            </div>
          </div>

          {/* Fee service */}
          <div className="py-5 flex flex-col gap-4 border-b border-gray-600">
            <div className="flex flex-row justify-between items-center text-base text-gray-800">
              <div className="">
                {apartment.availableTime.pricePerNight} point x{' '}
                {dateRangeContext && (
                  <Fragment>
                    {calculateNightDifference(
                      dateRangeContext?.startDate,
                      dateRangeContext?.endDate
                    ) === 1
                      ? `${calculateNightDifference(
                          dateRangeContext?.startDate,
                          dateRangeContext?.endDate
                        )} night`
                      : `${calculateNightDifference(
                          dateRangeContext?.startDate,
                          dateRangeContext?.endDate
                        )} nights`}
                  </Fragment>
                )}
              </div>

              <div>
                {dateRangeContext && (
                  <Fragment>
                    {calculateNightDifference(
                      dateRangeContext?.startDate,
                      dateRangeContext?.endDate
                    ) * apartment.availableTime.pricePerNight}
                  </Fragment>
                )}{' '}
                point
              </div>
            </div>
          </div>

          {/* Total */}

          <div className="pt-5 pb-4 flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center text-base text-black">
              <div className="">Total</div>

              <div>{totalPrice} point</div>
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden fixed bottom-0 w-[100%] bg-gray-900 ">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col px-2">
            <div className="text-white">{totalPrice} point</div>
            <div className="text-white text-[15px]">
              {new Date(dateRange.startDate).getTime() === new Date(dateRange.endDate).getTime()
                ? 'Add your travel dates for exact pricing'
                : `${format(new Date(dateRangeContext?.startDate), 'dd MMM yyyy')} - ${format(
                    new Date(dateRangeContext?.endDate),
                    'dd MMM yyyy'
                  )}`}
            </div>
          </div>
          <div className="px-5">
            <button onClick={handleBooking} className="bg-common px-5 py-2 text-white rounded-md">
              Booking
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ApartmentBooking;
