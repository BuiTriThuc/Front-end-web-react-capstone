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
import { elements } from 'chart.js';
import useEditDateBookingModal from '@/app/hooks/useEditDateBookingModal';

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
  const editDateBookingModal = useEditDateBookingModal();

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [initialDateRangeValue, setInitialDateRangeValue] = useState(initialDateRange);
  const [apartmentAllowGuest, setApartmentAllowGuest] = useState(
    apartment.availableTime.coOwner.property.numberKingBeds * 2 +
      apartment.availableTime.coOwner.property.numberQueenBeds * 2 +
      apartment.availableTime.coOwner.property.numberSingleBeds +
      apartment.availableTime.coOwner.property.numberDoubleBeds * 2 +
      apartment.availableTime.coOwner.property.numberTwinBeds * 2 +
      apartment.availableTime.coOwner.property.numberFullBeds * 2 +
      apartment.availableTime.coOwner.property.numberSofaBeds +
      apartment.availableTime.coOwner.property.numberMurphyBeds
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

      // if (!dateRangeContext) {
      //   setDateRangeContext(initialDateRangeValue);
      // }
      // newDateRange.setBackReset();
    } else {
      setDateRangeContext(dateRangeContext);
    }
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
  }, [isNew, dateRangeContext, initialDateRange, newDateRange, isReload]);

  useEffect(() => {
    // Check if the page is reloaded (F5)
    if (performance.navigation.type === 1) {
      newDateRange.setIsReload();
    } else if (performance.navigation.type === 0) {
      newDateRange.setIsReload();
    }
  }, [performance]);

  useEffect(() => {
    if (JSON.stringify(dateRangeContext) === JSON.stringify(initialDateRangeValue)) {
      newDateRange.setNewReset();
    }
  }, [dateRangeContext, dateRangeDefaultContext]);

  const [rating, setRating] = useState<any>();

  const [dateRangeDefault, setDateRangeDefault] = useState(initialDateRange);
  const [smallestDay, setSmallestDay] = useState<any>(null);

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

        // console.log('Check difference', differenceInDays(checkOutDate, checkInDate));

        if (differenceInDays(checkOutDate, checkInDate) < 2) {
          checkInMap.forEach((checkInDate, key) => {
            if (checkOutMap.has(format(checkInDate, 'yyyy-MM-dd'))) {
              datesOutsideDateRange.push(new Date(checkInDate));
            }
          });

          // Check if a date is beyond the general availability range
          if (startDate) {
            if (checkInMap.has(format(startDate, 'yyyy-MM-dd'))) {
              datesOutsideDateRange.push(new Date(startDate));
              // setDateRangeContext({
              //   ...dateRangeContext,
              //   startDate: new Date(startDate).getTime() + 24 * 60 * 60 * 1000,
              // });
            }
          }

          if (endDate) {
            if (checkOutMap.has(format(endDate, 'yyyy-MM-dd'))) {
              datesOutsideDateRange.push(new Date(endDate));
              // setDateRangeContext({
              //   ...dateRangeContext,
              //   endDate: new Date(endDate).getTime() - 24 * 60 * 60 * 1000,
              // });
            }
          }

          // for (
          //   let i = checkInDate.getTime();
          //   i <= checkOutDate.getTime();
          //   i += 24 * 60 * 60 * 1000
          // ) {
          //   datesOutsideDateRange.push(new Date(i));
          // }
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
                // console.log('Ko có');
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

  console.log('Check smallest day', checkInMap);

  useEffect(() => {
    setDateOut(getDatesOutsideDateRange(dateRangeDefaultContext));
  }, [dateRangeDefaultContext]);

  const handleChangeDateRange = (value: any) => {
    setDateRange(value.selection);
    handleOnChangeDateRangePicker(value);
    editDateBookingModal.onHandleDateRangePicker(handleOnChangeDateRangePicker);
  };

  const handleOnChangeDateRangePicker = (value: any) => {
    let timeBooked = apartment.timeHasBooked;
    let startDate = value.selection.startDate;

    let endDate = value.selection.endDate;

    let result: Date[] = [];
    timeBooked.forEach((element: { checkIn: Date; checkOut: Date }) => {
      let checkIn = new Date(element.checkIn);
      let checkOut = new Date(element.checkOut);
      if (startDate <= checkIn) {
        result.push(checkOut);
      } else if (startDate >= checkIn) {
        result.push(checkIn);
      }
    });

    var x: Date[] = dateDiffIsGreaterTwo(apartment.timeHasBooked);

    x.forEach((e) => {
      result.push(new Date(e));
    });

    setDateOut(result);
  };
  const dateDiffIsGreaterTwo = (array: any[]) => {
    var arr: Date[] = [];
    array.forEach((element) => {
      var checkIn = new Date(element.checkIn);
      var checkOut = new Date(element.checkOut);
      const timeDifference = checkOut.getTime() - checkIn.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference > 1) {
        var theDateStart = checkIn;
        theDateStart = new Date(theDateStart.getTime() + 24 * 60 * 60 * 1000);
        while (theDateStart.getTime() < checkOut.getTime()) {
          arr.push(theDateStart);
          theDateStart = new Date(theDateStart.getTime() + 24 * 60 * 60 * 1000);
        }
      }
    });
    return arr;
  };
  useEffect(() => {
    editDateBookingModal.onHandleDateRangePicker(handleOnChangeDateRangePicker);
  }, []);

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

  useEffect(() => {
    if (checkInMap && dateRangeDefaultContext) {
      checkInMap.forEach((checkIn, key) => {
        if (
          !smallestDay ||
          (key < smallestDay && new Date(smallestDay) !== dateRangeDefaultContext?.startDate)
        ) {
          setSmallestDay(key);
        }
      });
    }

    if (smallestDay && isBack === false) {
      const newDate = {
        startDate: dateRangeContext?.startDate,
        endDate: new Date(smallestDay),
        key: 'selection',
      };
      setDateRangeContext(newDate);
    }
  }, [checkInMap, smallestDay, dateRangeDefaultContext, isBack]);

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
