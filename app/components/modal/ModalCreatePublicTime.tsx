'use client';

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../input/Input';
import Modal from './Modal';
import { toast } from 'react-hot-toast';
import useCreatePlanModal from '@/app/hooks/useCreatePlanModal';
import { Label, Select, Textarea, FileInput } from 'flowbite-react';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import useCreatePublicTimeModal from '@/app/hooks/useCreatePublicTimeModal';
import CalendarAparment from '@/app/apartment/CalendarAparment';
import { startOfWeek, endOfWeek, format, addDays, addMonths, subDays } from 'date-fns';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

export default function ModalCreatePublicTime() {
  const { data: session } = useSession();
  const router = useRouter();
  const createPublicTime = useCreatePublicTimeModal();
  const detailCoOwner = createPublicTime.detailCoOwner;
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any[]>([]);
  const [priceTypeValue, setPriceTypeValue] = useState<any>();
  const [planPriceIntervalValue, setPlanPriceIntervalValue] = useState<any>();
  const axiosAuthClient = useAxiosAuthClient();

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [publicDateRange, setPublicDateRange] = useState(dateRange);
  const [timeFramesId, setTimeFramesId] = useState();
  const [timeFramesWeekNumber, setTimeFramesWeekNumber] = useState();
  const [dateOut, setDateOut] = useState<any>();

  const getWeekDates = (weekNumber: number, year: number) => {
    const januaryFirst = new Date(year, 0, 1); // January is month 0 in JavaScript
    const weekStart = startOfWeek(januaryFirst, { weekStartsOn: 1 }); // Assuming your week starts on Monday

    // Calculate the number of days to add to reach the desired week
    const daysToAdd = (weekNumber - 1) * 7;

    const startDate = new Date(weekStart);
    startDate.setDate(weekStart.getDate() + daysToAdd);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // A week is 7 days

    setDateRange({ ...dateRange, startDate: startDate, endDate: endDate });
    setPublicDateRange({
      ...publicDateRange,
      startDate: startDate,
      endDate: endDate,
    });
  };

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

  const handleChangeTimeFrameId = (value: any) => {
    setTimeFramesId(value);
  };

  useEffect(() => {
    if (timeFramesWeekNumber) {
      console.log('Check week', timeFramesWeekNumber);
      getWeekDates(timeFramesWeekNumber, 2024);
    }
  }, [timeFramesWeekNumber]);

  useEffect(() => {
    if (dateRange) {
      const newDateOUt = getDatesOutsideDateRange(dateRange);
      setDateOut(newDateOUt);
    }
  }, [dateRange]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const setCustomeValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const body = {
      startTime: format(publicDateRange.startDate, 'yyyy-MM-dd'),
      endTime: format(publicDateRange.endDate, 'yyyy-MM-dd'),
      pricePerNight: data.pricePerNight,
    };

    const config = {
      headers: { Authorization: `Bearer ${session?.user.access_token}` },
      'Content-type': 'application/json',
    };

    axios
      .post(`https://holiday-swap.click/api/v1/available-times/${timeFramesId}`, body, config)
      .then(() => {
        toast.success('Create public success');
        reset();
      })
      .catch((response) => {
        toast.error(response.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    createPublicTime.onClose();
  }, [createPublicTime]);

  useEffect(() => {
    if (timeFramesId) {
      const fetchData = async () => {
        const timeFrame = await axios.get(
          `https://holiday-swap.click/api/v1/time-frames/${timeFramesId}`
        );
        setTimeFramesWeekNumber(timeFrame.data.weekNumber);
      };
      fetchData();
    }
  }, [timeFramesId]);

  const bodyContent = (
    <div className="flex flex-col gap-4 overflow-x-hidden overflow-y-auto no-scrollbar h-[90%]">
      <div className="grid grid-cols-1">
        <Label value="Select week" />
        <Select
          value={timeFramesId}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            handleChangeTimeFrameId(e.target.value);
          }}
        >
          <option value="">Any</option>
          {detailCoOwner?.timeFrames.map((item: any, index: number) => (
            <option key={item.id} value={item.id}>
              {item.weekNumber}
            </option>
          ))}
        </Select>
      </div>
      {timeFramesId && (
        <div className="w-full">
          <Label value="Select dates within that date range to create public" />
          <CalendarAparment
            value={publicDateRange}
            onChange={(value: any) => {
              setPublicDateRange(value.selection);
            }}
            minDate={dateRange.startDate}
            disabledDates={dateOut}
            className="w-full"
          />
        </div>
      )}
      <div className="grid grid-cols-1">
        <Input
          id="pricePerNight"
          label="Price/Night"
          register={register}
          errors={errors}
          required
        />
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={createPublicTime.isOpen}
      title="Create Public Time"
      actionLabel="Submit"
      onClose={createPublicTime.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}
