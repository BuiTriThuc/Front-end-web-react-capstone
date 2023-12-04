'use client';

import React from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import dayjs from 'dayjs';

interface CalendarApartmentProps {
  value: Range | any;
  onChange: (value: RangeKeyDict | any) => void;
  disabledDates?: Date[];
  className?: string;
  minDate: Date;
  maxDate?: Date;
}

const CalendarAparment: React.FC<CalendarApartmentProps> = ({
  value,
  onChange,
  disabledDates,
  className,
  minDate,
  maxDate,
}) => {
  return (
    <DateRange
      dateDisplayFormat="yyyy-MM-dd"
      showDateDisplay={false}
      rangeColors={['#5C98F2']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      months={2}
      direction="horizontal"
      minDate={minDate}
      maxDate={maxDate}
      disabledDates={disabledDates}
      className={`${className}`}
    />
  );
};

export default CalendarAparment;
