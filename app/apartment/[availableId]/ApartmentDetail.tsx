"use client";

import React, { useState } from "react";
import ApartmentDetailHeader from "./ApartmentDetailHeader";
import ApartmentDetailBody from "./ApartmentDetailBody";
import CalendarAparment from "../CalendarAparment";
import ApartmentBooking from "./ApartmentBooking";
import { addDays, addMonths, subDays } from "date-fns";

interface ApartmentDetailProps {
  apartment?: any;
}

const ApartmentDetail: React.FC<ApartmentDetailProps> = ({ apartment }) => {
  const initialDateRange = {
    startDate: new Date(apartment.availableTime.startTime),
    endDate: new Date(apartment.availableTime.endTime),
    key: "selection",
  };

  const [dateRange, setDateRange] = useState(initialDateRange);
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

  console.log("Check number off guest", apartmentAllowGuest);

  const getDatesOutsideDateRange = (dateRange: any) => {
    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;

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

    return datesOutsideDateRange;
  };

  const [dateOut, setDateOut] = useState(getDatesOutsideDateRange(dateRange));

  const handleChangeDateRange = (value: any) => {
    setDateRange(value.selection);
  };

  return (
    <div className="mx-16 py-20">
      <div className="flex flex-col">
        <ApartmentDetailHeader apartment={apartment} />
      </div>

      <div className="grid grid-cols-12 gap-16 py-14">
        <div className="col-span-8">
          <ApartmentDetailBody
            apartment={apartment}
            dateOut={dateOut}
            dateRange={dateRange}
            handleChangeDateRange={handleChangeDateRange}
          />
        </div>
        <div className="col-span-4 sticky top-0 h-full">
          <ApartmentBooking
            apartment={apartment}
            dateOut={dateOut}
            dateRange={dateRange}
            handleChangeDateRange={handleChangeDateRange}
            apartmentAllowGuest={apartmentAllowGuest}
          />
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetail;
