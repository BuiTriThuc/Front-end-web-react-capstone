'use client';

import React, { Fragment, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import Input from '../components/input/Input';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import useEditDateBookingModal from '../hooks/useEditDateBookingModal';
import { addDays, addMonths, format, subDays } from 'date-fns';
import useEditGuestBookingModal from '../hooks/useEditGuestBookingMoadal';
import axios from 'axios';
import toast from 'react-hot-toast';

interface BookingInformationProps {
  totalGuest?: any;
  dateRangeBooking?: any;
  dateRange?: any;
  apartmentAllowGuest?: any;
  availableTimeId: any;
  userId: any;
}

const BookingInformation: React.FC<BookingInformationProps> = ({
  totalGuest,
  dateRangeBooking,
  dateRange,
  apartmentAllowGuest,
  availableTimeId,
  userId,
}) => {
  const router = useRouter();
  const [totalGuestValue, setTotalGuestValue] = useState(totalGuest);
  const valueDateJson = JSON.parse(dateRangeBooking);
  const dateRangeJson = JSON.parse(dateRange);
  const [dateRanges, setDateRanges] = useState({
    startDate: format(new Date(dateRangeJson.startDate), 'yyyy-MM-dd'),
    endDate: format(new Date(dateRangeJson.endDate), 'yyyy-MM-dd'),
    key: 'selection',
  });
  const [dateRangeValue, setDateRangeValue] = useState({
    startDate: new Date(valueDateJson.startDate),
    endDate: new Date(valueDateJson.endDate),
    key: 'selection',
  });
  const editDateBookingModal = useEditDateBookingModal();
  const editGuestBookingModal = useEditGuestBookingModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const bookingData = {
      availableTimeId: availableTimeId,
      userId: userId,
      checkInDate: format(dateRangeValue.startDate, 'yyyy-MM-dd'),
      checkOutDate: format(dateRangeValue.endDate, 'yyyy-MM-dd'),
      userOfBookingRequests: guests.map((item, index) => ({
        email: data[`email${index}`], // Use the indexed email field
        fullName: data[`fullName${index}`], // Use the indexed full name field
        phoneNumber: data[`phoneNumber${index}`], // Use the indexed phone number field
      })),
    };
    const config = {
      headers: { 'Content-type': 'application/json' },
    };
    axios
      .post('https://holiday-swap.click/api/booking/create', bookingData, config)
      .then(() => {
        router.push('/booking/success');
      })
      .catch((response) => {
        toast.error(response.response.data.message);
      });
  };

  const [guests, setGuests] = useState([{ email: '', fullName: '', phoneNumber: '' }]);

  const addGuest = () => {
    setGuests([...guests, { email: '', fullName: '', phoneNumber: '' }]);
  };

  console.log('Check date Ranges', dateRange);

  const handleChangeDateRange = (value: any) => {
    setDateRangeValue(value.selection);
  };

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center">
          <div
            onClick={() => router.back()}
            className="p-3 rounded-full bg-transparent hover:bg-gray-300 cursor-pointer"
          >
            <FiChevronLeft size={20} />
          </div>
          <div className="text-3xl font-bold">Confirm and Pay</div>
        </div>

        {/* Date and Guest */}
        <div className="flex flex-col gap-5 pt-12 pb-8 border-b border-gray-400">
          <div className="text-xl font-bold">Your booking</div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="text-base text-black font-semibold">Dates</div>
              <div className="text-gray-600">
                {format(dateRangeValue.startDate, 'd')} –{' '}
                {format(dateRangeValue.endDate, 'd MMM yyyy')}
              </div>
            </div>
            <div
              onClick={() => editDateBookingModal.onOpen(JSON.stringify(dateRange))}
              className="text-black font-semibold underline cursor-pointer"
            >
              Edit
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="text-base text-black font-semibold">Guests</div>
              <div className="text-gray-600">
                {`${
                  totalGuestValue === 1 ? `${totalGuestValue} guest` : `${totalGuestValue} guests`
                }`}
              </div>
            </div>
            <div
              onClick={() => editGuestBookingModal.onOpen(totalGuestValue, apartmentAllowGuest)}
              className="text-black font-semibold underline cursor-pointer"
            >
              Edit
            </div>
          </div>
        </div>

        {/* Information guest */}
        <div className="flex flex-col pt-12 pb-8 border-b border-gray-400">
          <div className="text-xl font-bold">Guest Info</div>
          <div className="flex flex-row justify-end gap-2 cursor-pointer">
            {totalGuestValue < 1 || guests.length === Number(totalGuestValue) ? (
              ''
            ) : (
              <div className="flex flex-row items-center" onClick={addGuest}>
                <AiOutlinePlusCircle size={15} />
                <div className="text-sm font-base">Add new guest</div>
              </div>
            )}
          </div>
          {guests.map((guest, index) => (
            <div key={index} className="flex flex-col">
              <div className="pt-5 text-lg font-bold">
                {index === 0 ? '' : `Guest ${index + 1}`}
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Input
                  type="text"
                  label={`Email`}
                  id={`email${index}`}
                  register={register}
                  required
                  errors={errors}
                />
                <Input
                  type="text"
                  label={`Full Name`}
                  id={`fullName${index}`}
                  register={register}
                  required
                  errors={errors}
                />
              </div>
              <div className="grid grid-cols-1">
                <Input
                  type="text"
                  label={`Phone Number`}
                  id={`phoneNumber${index}`}
                  register={register}
                  required
                  errors={errors}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="py-5">
          <div className="text-[20px] font-bold">General standards</div>
          <div className="py-3 text-gray-700">
            We ask all guests to remember a few simple rules to be a great guest.
          </div>
          <div className="text-gray-700">- Comply with house rules</div>
          <div className="text-gray-700">- Maintain the house as if it were your home</div>
        </div>
        {/* Request to book */}
        <div className="py-8">
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-8 py-5 text-center text-xl text-white bg-common hover:bg-hover rounded-lg"
            type="button"
          >
            Request to book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingInformation;
