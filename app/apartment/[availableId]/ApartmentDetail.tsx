'use client';

import React, { Fragment, useEffect, useState } from 'react';
import ApartmentDetailHeader from './ApartmentDetailHeader';
import ApartmentDetailBody from './ApartmentDetailBody';
import CalendarAparment from '../CalendarAparment';
import ApartmentBooking from './ApartmentBooking';
import { addDays, addMonths, differenceInDays, format, subDays } from 'date-fns';
import ApartmentReivew from './ApartmentReivew';
import ApartmentReivewBox from './ApartmentReivewBox';
import useAparmentReviewModal from '@/app/hooks/useApartmentReviewModal';
import { useParams, useSearchParams } from 'next/navigation';
import axios from 'axios';
import ApartmentDetailMap from './ApartmentDetailMap';
import moment from 'moment-timezone';
import { useDateRange } from '../DateRangeContext';
import useNewDateRange from '@/app/hooks/useNewDateRange';
import { useGuest } from '../GuestContext';

interface ApartmentDetailProps {
  apartment?: any;
  currentUser?: any;
}

const ApartmentDetail: React.FC<ApartmentDetailProps> = ({ apartment, currentUser }) => {
  const initialDateRange = {
    startDate: new Date(apartment.availableTime.startTime),
    endDate: new Date(apartment.availableTime.endTime),
    key: 'selection',
  };
  const apartmentReviewModal = useAparmentReviewModal();
  const params = useSearchParams();
  const propertyId = params?.get('propertyId');
  const roomId = params?.get('roomId');
  const newDateRange = useNewDateRange();
  const isNew = newDateRange.isNew;
  const isReload = newDateRange.isReload;
  const isBack = newDateRange.isBack;

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [initialDateRangeValue, setInitialDateRangeValue] = useState(initialDateRange);
  const [apartmentAllowGuest, setApartmentAllowGuest] = useState(
    apartment.property.numberKingBeds * 2 +
      apartment.property.numberQueenBeds * 2 +
      apartment.property.numberSingleBeds +
      apartment.property.numberDoubleBeds * 2 +
      apartment.property.numberTwinBeds * 2 +
      apartment.property.numberFullBeds * 2 +
      apartment.property.numberSofaBeds +
      apartment.property.numberMurphyBeds
  );

  const [checkInMap, setCheckInMap] = useState<Map<string, any>>(new Map());
  const [checkOutMap, setCheckOutMap] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    const updateCheckInAndOutMaps = () => {
      const newCheckInMap = new Map();
      const newCheckOutMap = new Map();

      if (
        apartment.timeHasBooked &&
        Array.isArray(apartment.timeHasBooked) &&
        apartment.timeHasBooked.length > 0
      ) {
        apartment.timeHasBooked.forEach((booking: any, index: number) => {
          const checkInDate = new Date(booking.checkIn);
          const checkOutDate = new Date(booking.checkOut);

          newCheckInMap.set(format(checkInDate, 'yyyy-MM-dd'), checkInDate);
          newCheckOutMap.set(format(checkOutDate, 'yyyy-MM-dd'), checkOutDate);
        });
      }

      setCheckInMap(newCheckInMap);
      setCheckOutMap(newCheckOutMap);
    };

    updateCheckInAndOutMaps();
  }, [apartment.timeHasBooked]);

  const {
    dateRangeContext,
    setDateRangeContext,
    dateRangeDefaultContext,
    setDateRangeDefaultContext,
    dateOut,
    setDateOut,
  } = useDateRange();

  const {
    setTotalGuestContext,
    setAdultGuestContext,
    setChildrenGuestContext,
    setAllowTotalGuestContext,
  } = useGuest();

  useEffect(() => {
    if (initialDateRangeValue) {
      setDateRangeDefaultContext(initialDateRangeValue);
    }
  }, [initialDateRangeValue]);

  useEffect(() => {
    if (isNew === true) {
      setDateRangeContext(initialDateRangeValue);
      setAdultGuestContext(1);
      setTotalGuestContext(1);
      setChildrenGuestContext(0);
      setAllowTotalGuestContext(apartmentAllowGuest);
    } else if (isReload === true && isBack === false) {
      setDateRangeContext(initialDateRangeValue);
      setAdultGuestContext(1);
      setTotalGuestContext(1);
      setChildrenGuestContext(0);
      setAllowTotalGuestContext(apartmentAllowGuest);
    } else if (isReload === true && isBack === true) {
      setDateRangeContext(dateRangeContext);
      // newDateRange.setBackReset();
    } else {
      setDateRangeContext(dateRangeContext);
    }

    // if (isReload === true) {
    //   setDateRangeContext(initialDateRangeValue);
    //   setAdultGuestContext(1);
    //   setTotalGuestContext(1);
    //   setChildrenGuestContext(0);
    //   setAllowTotalGuestContext(apartmentAllowGuest);
    // } else {
    //   setDateRangeContext(dateRangeContext);
    // }
  }, [dateRangeDefaultContext, dateRangeContext, initialDateRangeValue, isNew, isReload, isBack]);

  useEffect(() => {
    if (isNew === true && JSON.stringify(dateRangeContext) === JSON.stringify(initialDateRange)) {
      newDateRange.setNewReset();
    }

    if (
      isReload === true &&
      JSON.stringify(dateRangeContext) === JSON.stringify(initialDateRange)
    ) {
      newDateRange.setIsReloadReset();
    }
  }, [isNew, dateRangeContext, initialDateRange, newDateRange]);

  useEffect(() => {
    // Check if the page is reloaded (F5)
    if (performance.navigation.type === 1) {
      newDateRange.setIsReload();
    }
  }, []);

  useEffect(() => {
    if (JSON.stringify(dateRangeContext) === JSON.stringify(initialDateRangeValue)) {
      newDateRange.setNewReset();
    }
  }, [dateRangeContext, dateRangeDefaultContext]);

  const [rating, setRating] = useState<any>();

  const [dateRangeDefault, setDateRangeDefault] = useState(initialDateRange);

  const getDatesOutsideDateRange = (dateRange: any) => {
    const startDate = dateRange?.startDate;
    const endDate = dateRange?.endDate;

    const startDateOutsideDateRange = addDays(endDate, 1);
    const endDateOutsideDateRange = subDays(addMonths(startDate, 30), 1);

    const datesOutsideDateRange = [];
    for (
      let i = startDateOutsideDateRange.getTime();
      i <= endDateOutsideDateRange.getTime();
      i += 24 * 60 * 60 * 1000
    ) {
      datesOutsideDateRange.push(new Date(i));
    }

    if (
      apartment.timeHasBooked &&
      Array.isArray(apartment.timeHasBooked) &&
      apartment.timeHasBooked.length > 0
    ) {
      apartment.timeHasBooked.forEach((booking: any) => {
        const checkInDate = new Date(booking.checkIn);
        const checkOutDate = new Date(booking.checkOut);

        console.log('Check difference', differenceInDays(checkOutDate, checkInDate));

        if (differenceInDays(checkOutDate, checkInDate) < 2) {
          checkInMap.forEach((checkInDate) => {
            if (checkOutMap.has(format(checkInDate, 'yyyy-MM-dd'))) {
              datesOutsideDateRange.push(new Date(checkInDate));
            } else {
              console.log('Ko có');
            }
          });

          // Check if a date is beyond the general availability range
          if (startDate) {
            if (checkInMap.has(format(startDate, 'yyyy-MM-dd'))) {
              datesOutsideDateRange.push(new Date(startDate));
            }
          }

          if (endDate) {
            if (checkOutMap.has(format(endDate, 'yyyy-MM-dd'))) {
              datesOutsideDateRange.push(new Date(endDate));
            }
          }
        } else {
          for (
            let i = checkInDate.getTime() + 24 * 60 * 60 * 1000;
            i <= checkOutDate.getTime() - 24 * 60 * 60 * 1000;
            i += 24 * 60 * 60 * 1000
          ) {
            checkInMap.forEach((checkInDate) => {
              if (checkOutMap.has(format(checkInDate, 'yyyy-MM-dd'))) {
                datesOutsideDateRange.push(new Date(checkInDate));
              } else {
                console.log('Ko có');
              }
            });

            if (startDate) {
              if (checkInMap.has(format(startDate, 'yyyy-MM-dd'))) {
                datesOutsideDateRange.push(new Date(startDate));
              }
            }

            if (endDate) {
              if (checkOutMap.has(format(endDate, 'yyyy-MM-dd'))) {
                datesOutsideDateRange.push(new Date(endDate));
              }
            }
            datesOutsideDateRange.push(new Date(i));
          }
        }
      });
    }

    return datesOutsideDateRange;
  };

  console.log('Check in map', checkInMap);
  console.log('Check out map', checkOutMap);

  useEffect(() => {
    setDateOut(getDatesOutsideDateRange(dateRangeDefaultContext));
  }, [dateRangeDefaultContext]);

  const handleChangeDateRange = (value: any) => {
    setDateRange(value.selection);
  };

  useEffect(() => {
    if (propertyId && roomId) {
      const fetchRating = async () => {
        const rating = await axios.get(
          `https://holiday-swap.click/api/v1/rating?propertyId=${propertyId}&roomId=${roomId}&pageNo=0&pageSize=9999&sortDirection=asc&sortBy=id`
        );
        setRating(rating.data);
      };
      fetchRating();
    }
  }, [propertyId, roomId]);

  console.log('Check date Range context', dateOut);

  return (
    <div className="lg:mx-1 xl:mx-16 py-20">
      <div className="flex flex-col">
        <ApartmentDetailHeader apartment={apartment} rating={rating} />
      </div>

      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-16 md:pb-14 xl:py-10 border-b border-gray-500">
        <div className="col-span-8">
          <ApartmentDetailBody
            apartment={apartment}
            dateOut={dateOut}
            dateRange={dateRange}
            rating={rating}
            dateRangeDefault={dateRangeDefault}
            handleChangeDateRange={handleChangeDateRange}
          />
        </div>
        {dateRangeContext && (
          <div className="col-span-4 sticky top-0 h-full">
            <ApartmentBooking
              currentUser={currentUser}
              apartment={apartment}
              dateOut={dateOut}
              dateRange={dateRange}
              dateRangeDefault={dateRangeDefault}
              handleChangeDateRange={handleChangeDateRange}
              apartmentAllowGuest={apartmentAllowGuest}
            />
          </div>
        )}
      </div>

      <div className="py-20 border-b border-gray-500">
        <ApartmentDetailMap apartment={apartment} />
      </div>

      {rating && rating.content.length > 0 ? (
        <Fragment>
          <div className="grid grid-cols-6 py-20">
            <div className="pb-5 col-span-2">
              <ApartmentReivew apartment={apartment} rating={rating} />
            </div>
            <div className="col-span-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {rating.content.slice(0, 6).map((item: any, index: number) => (
                  <ApartmentReivewBox key={index} rating={item} />
                ))}

                {rating.content.length > 6 && (
                  <div className="">
                    <button
                      onClick={() => apartmentReviewModal.onOpen(rating, apartment)}
                      type="button"
                      className="text-center border border-slate-700 rounded-lg text-xl py-3 px-6 hover:bg-gray-100 transition-all duration-300 transform active:scale-95"
                    >
                      Show all {rating.content.length} reviews
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="py-20 border-b border-gray-500 text-2xl text-bold text-black">
          No reviews (yet)
        </div>
      )}
    </div>
  );
};

export default ApartmentDetail;
