'use client';

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import InputComponent from '../input/Input';
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
import ModalCreate from './ModalCreate';
import InputYear from '../input/InputYear';

dayjs.extend(isoWeek);

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
  const [yearCreate, setYearCreate] = useState<number>(new Date().getFullYear() + 1);
  const [dateOut, setDateOut] = useState<any>();

  useEffect(() => {
    if (detailCoOwner) {
      setTimeFramesId(detailCoOwner?.timeFrames[0]?.id);
    }
  }, [detailCoOwner]);

  const getWeekDates = (weekNumber: number, year: number) => {
    // const januaryFirst = new Date(year, 0, 1); // January is month 0 in JavaScript
    // const weekStart = startOfWeek(januaryFirst, { weekStartsOn: 1 }); // Assuming your week starts on Monday

    // // Calculate the number of days to add to reach the desired week
    // const daysToAdd = (weekNumber - 1) * 7;

    // const startDate = new Date(weekStart);
    // startDate.setDate(weekStart.getDate() + daysToAdd);

    // const endDate = new Date(startDate);
    // endDate.setDate(startDate.getDate() + 6); // A week is 7 days

    const startDate = dayjs().year(year).isoWeek(weekNumber).startOf('isoWeek');
    const endDate = dayjs().year(year).isoWeek(weekNumber).endOf('isoWeek');

    setDateRange({ ...dateRange, startDate: startDate.toDate(), endDate: endDate.toDate() });
    setPublicDateRange({
      ...publicDateRange,
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
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
    const yearRegex = new RegExp(`^2\\d{3}$`);
    if (timeFramesWeekNumber && !yearRegex.test(format(new Date(yearCreate), 'yyyy').trim())) {
      console.log('Check week', timeFramesWeekNumber);
      getWeekDates(timeFramesWeekNumber, yearCreate);
    }
  }, [timeFramesWeekNumber, yearCreate]);

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
        createPublicTime.onCreated();
        reset();
        createPublicTime.onClose();
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
    <div className="flex flex-col gap-4 overflow-x-hidden overflow-y-auto no-scrollbar h-[100%]">
      <div className="grid grid-cols-1">
        <InputYear
          id="yearCreate"
          label="Year to create"
          type="number"
          min={
            detailCoOwner?.startTime
              ? new Date(detailCoOwner?.startTime).getFullYear()
              : new Date().getFullYear()
          }
          max={
            detailCoOwner?.endTime
              ? new Date(detailCoOwner?.endTime).getFullYear()
              : new Date().getFullYear() + 49
          }
          maxLength={4}
          onKeyUp={(e: ChangeEvent<HTMLInputElement>) => {
            if (Number(e.target.value) === 0) {
              return 1;
            }
          }}
          value={yearCreate}
          register={register}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setYearCreate(Number(e.target.value))}
          errors={errors}
          required
        />
      </div>
      <div className="grid grid-cols-1">
        <Label value="Select week" />
        <Select
          value={timeFramesId}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            handleChangeTimeFrameId(e.target.value);
          }}
        >
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
        <InputComponent
          id="pricePerNight"
          label="Price/Night"
          type="number"
          min={1}
          register={register}
          errors={errors}
          required
        />
      </div>
    </div>
  );

  return (
    <ModalCreate
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
