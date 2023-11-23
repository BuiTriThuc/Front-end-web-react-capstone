'use client';

import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { differenceInDays, format } from 'date-fns';
import { GrSubtractCircle } from 'react-icons/gr';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import CalendarAparment from '../CalendarAparment';
import { useRouter } from 'next/navigation';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useDateRange } from '../DateRangeContext';
import toast from 'react-hot-toast';

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
  const [visibleGuest, setVisibleGuest] = useState(false);
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [dateRangeBooking, setDateRangeBooking] = useState<Date[]>(dateRange);
  const [adultsGuest, setAdultsGuest] = useState(1);
  const [childrenGuest, setChildrenGuest] = useState(0);
  const [totalGuest, setTotalGuest] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const loginModal = useLoginModal();
  const router = useRouter();
  const { dateRangeContext, setDateRangeContext } = useDateRange();

  const handleDescreaseAdultGuest = (value: number) => {
    if (value <= 1) {
      return 1;
    }

    setAdultsGuest(value - 1);
    setTotalGuest(totalGuest - 1);
  };

  const handleInscreaseAdultGuest = (value: number) => {
    if (value >= apartmentAllowGuest || value + childrenGuest >= apartmentAllowGuest) {
      return value;
    }

    setAdultsGuest(value + 1);
    setTotalGuest(totalGuest + 1);
  };

  const handldeDescreaseChildrenGuest = (value: number) => {
    if (value <= 0) {
      return 0;
    }

    setChildrenGuest(value - 1);
    setTotalGuest(totalGuest - 1);
  };

  const handleInscreaseChildrenGuest = (value: number) => {
    if (value >= apartmentAllowGuest || value + adultsGuest >= apartmentAllowGuest) {
      return value;
    }

    setChildrenGuest(value + 1);
    setTotalGuest(totalGuest + 1);
  };

  const calculateNightDifference = (startDate: any, endDate: any) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
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

  const startDateISOString = dateRange.startDate.toISOString();
  const endDateISOString = dateRange.endDate.toISOString();

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
    } else {
      router.push(
        `/booking?availableTimeId=${apartment.availableTime.id}&apartmentImage=${
          apartment.property.propertyImage[0].link
        }&aparmentName=${apartment.property.propertyName}&priceNight=${
          apartment.availableTime.pricePerNight
        }&userId=${
          currentUser.userId
        }&totalPrice=${totalPrice}&totalGuest=${totalGuest}&dateRangeBooking=${JSON.stringify(
          dateRangeBooking
        )}&dateRange=${JSON.stringify(fixedDateRange)}&apartmentAllowGuest=${apartmentAllowGuest}`
      );
    }
  };

  useEffect(() => {
    // Calculate the number of nights
    const nightDifference = calculateNightDifference(dateRange.startDate, dateRange.endDate);

    // Calculate the price for the nights
    const nightsPrice = nightDifference * apartment.availableTime.pricePerNight;

    // Calculate the total price (nights price + cleaning fee + service fee)
    const total = nightsPrice;

    // Update the total price in the state
    setTotalPrice(total);
  }, [dateRange, apartment]);

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
                      ...dateRange,
                      startDate: new Date(e.target.value),
                    })
                  }
                  className="border-0 text-base text-gray-600 focus:outline-0 focus:outline-transparent focus:border-0 focus:border-transparent focus:ring-0 w-full"
                  value={`${format(new Date(dateRange.startDate), 'dd/MM/yyyy')}`}
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
                      ...dateRange,
                      endDate: new Date(e.target.value),
                    })
                  }
                  className="border-0 text-base text-gray-600 focus:outline-0 focus:outline-transparent focus:border-0 focus:border-transparent focus:ring-0 w-full"
                  value={`${format(new Date(dateRange.endDate), 'dd/MM/yyyy')}`}
                />
              </div>
            </div>
            {visibleCalendar ? (
              <CalendarAparment
                value={dateRange}
                onChange={(value: any) => {
                  handleChangeDateRange(value);
                  setDateRangeBooking(value.selection);
                  setDateRangeContext(value.selection);
                }}
                className="w-auto xl:w-[700px] xl:absolute xl:top-36 xl:-left-[352px] xl:z-30 xl:!text-[1em]"
                disabledDates={dateOut}
                minDate={dateRangeDefault.startDate}
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
                  {totalGuest === 1 ? `${totalGuest} guest` : `${totalGuest} guests`}
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
                    <button onClick={() => handleDescreaseAdultGuest(adultsGuest)} type="button">
                      <MinusCircleOutlined
                        style={{
                          fontSize: 30,
                          color: `${adultsGuest <= 1 ? 'gray' : ''}`,
                        }}
                      />
                    </button>
                    <div className="w-5 text-center">{adultsGuest}</div>
                    <button onClick={() => handleInscreaseAdultGuest(adultsGuest)} type="button">
                      <PlusCircleOutlined
                        style={{
                          fontSize: 30,
                          color: `${totalGuest >= apartmentAllowGuest ? 'gray' : ''}`,
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
                      onClick={() => handldeDescreaseChildrenGuest(childrenGuest)}
                      type="button"
                    >
                      <MinusCircleOutlined
                        style={{
                          fontSize: 30,
                          color: `${childrenGuest <= 0 ? 'gray' : ''}`,
                        }}
                      />
                    </button>
                    <div className="w-5 text-center">{childrenGuest}</div>
                    <button
                      onClick={() => handleInscreaseChildrenGuest(childrenGuest)}
                      type="button"
                    >
                      <PlusCircleOutlined
                        style={{
                          fontSize: 30,
                          color: `${totalGuest >= apartmentAllowGuest ? 'gray' : ''}`,
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
                {calculateNightDifference(dateRange.startDate, dateRange.endDate) === 1
                  ? `${calculateNightDifference(dateRange.startDate, dateRange.endDate)} night`
                  : `${calculateNightDifference(dateRange.startDate, dateRange.endDate)} nights`}
              </div>

              <div>
                {calculateNightDifference(dateRange.startDate, dateRange.endDate) *
                  apartment.availableTime.pricePerNight}{' '}
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
                : `${format(new Date(dateRange.startDate), 'dd MMM yyyy')} - ${format(
                    new Date(dateRange.endDate),
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
