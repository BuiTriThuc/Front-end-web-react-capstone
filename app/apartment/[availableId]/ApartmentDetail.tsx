"use client";

import React, { useState } from "react";
import ApartmentDetailHeader from "./ApartmentDetailHeader";
import ApartmentDetailBody from "./ApartmentDetailBody";
import CalendarAparment from "../CalendarAparment";
import ApartmentBooking from "./ApartmentBooking";

interface ApartmentDetailProps {
  apartment?: any;
}

const ApartmentDetail: React.FC<ApartmentDetailProps> = ({ apartment }) => {
  const initialDateRange = {
    startDate: new Date(apartment.availableTime.startTime),
    endDate: new Date(new Date(apartment.availableTime.endTime)),
    key: "selection",
  };

  const [dateRange, setDateRange] = useState(initialDateRange);

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
            dateRange={dateRange}
            handleChangeDateRange={handleChangeDateRange}
          />
        </div>
        <div className="col-span-4 sticky top-0 h-full">
          <ApartmentBooking
            apartment={apartment}
            dateRange={dateRange}
            handleChangeDateRange={handleChangeDateRange}
          />
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetail;