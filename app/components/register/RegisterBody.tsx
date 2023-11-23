'use client';

import React, { useState, useMemo } from 'react';
import Input from '../input/Input';
import Link from 'next/link';
import BtnRegister from './BtnRegister';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Container from '../Container';
import { LuWarehouse } from 'react-icons/lu';
import {
  MdApartment,
  MdOutlineBedroomParent,
  MdOutlineBathroom,
  MdSingleBed,
  MdOutlineCrib,
} from 'react-icons/md';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { IoHomeOutline } from 'react-icons/io5';
import { LiaBedSolid } from 'react-icons/lia';
import { GiPersonInBed } from 'react-icons/gi';
import dynamic from 'next/dynamic';
import HeadingRegister from '../HeadingRegister';
import axios from 'axios';
import DateTimePicker from '../DateTimePicker';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import toast from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import StepCreateApartmentRegister from './StepCreateApartmentRegister';

enum STEPS {
  INFO = 0,
  REGISTERAPARTMENT = 1,
}

export const homeTypes = [
  {
    label: 'House',
    icon: LuWarehouse,
  },
  {
    label: 'Apartment',
    icon: MdApartment,
  },
];

export const residenceTypes = [
  {
    label: 'Primary',
    icon: HiOutlineHomeModern,
  },
  {
    label: 'Secondary',
    icon: IoHomeOutline,
  },
];

export const locations = [
  {
    label: 'In the heart of an international site',
  },
  {
    label: 'Less than 30 minutes away from an international site',
  },
  {
    label: 'Less than 30 minutes away from a national site',
  },
  {
    label: 'Less than 30 minutes away from a local site',
  },
  {
    label: 'More than 30 minutes away from all tourist sites',
  },
];

export const sizes = [
  {
    id: 'numberBedsRoom',
    label: 'Bedrooms',
    icon: '/images/icons/bed-room.png',
    count: 1,
  },
  {
    id: 'numberBathRoom',
    label: 'Bathrooms',
    icon: '/images/icons/bath-room.png',
    count: 1,
  },
];

export const peoples = [
  {
    id: 'numberKingBeds',
    label: 'King beds',
    icon: '/images/icons/king-bed.png',
    count: 0,
  },
  {
    id: 'numberQueenBeds',
    label: 'Queen beds',
    icon: '/images/icons/queen-bed.png',
    count: 0,
  },
  {
    id: 'numberSingleBeds',
    label: 'Single Beds',
    icon: '/images/icons/single-bed.png',
    count: 0,
  },
  {
    id: 'numberDoubleBeds',
    label: 'Double Beds',
    icon: '/images/icons/double-bed.png',
    count: 0,
  },
  {
    id: 'numberTwinBeds',
    label: 'Twin Beds',
    icon: '/images/icons/twin-bed.png',
    count: 0,
  },
  {
    id: 'numberFullBeds',
    label: 'Full Beds',
    icon: '/images/icons/double-bed.png',
    count: 0,
  },
  {
    id: 'numberSofaBeds',
    label: 'Sofa Beds',
    icon: '/images/icons/sofa-bed.png',
    count: 0,
  },
  {
    id: 'numberMurphyBeds',
    label: 'Murphy Beds',
    icon: '/images/icons/murphy-bed.png',
    count: 0,
  },
];

export const basics = [
  {
    label: 'Wheelchair accessible',
    icon: '/images/icons/accessibility.png',
  },
  {
    label: 'Dishwasher',
    icon: '/images/icons/dishwasher.png',
  },
  {
    label: 'Dryer',
    icon: '/images/icons/dryer.png',
  },
  {
    label: 'Washing machine',
    icon: '/images/icons/washing-machine.png',
  },
  {
    label: 'Microwave oven',
    icon: '/images/icons/oven.png',
  },
  {
    label: 'Freezer',
    icon: '/images/icons/freezer.png',
  },
  {
    label: 'Oven',
    icon: '/images/icons/gas-stove.png',
  },
  {
    label: 'Fridge',
    icon: '/images/icons/fridge.png',
  },
  {
    label: 'Bathtub',
    icon: '/images/icons/bathtub.png',
  },
  {
    label: 'Heating System',
    icon: '/images/icons/heating.png',
  },
  {
    label: 'Eletric car plug',
    icon: '/images/icons/energy.png',
  },
  {
    label: 'TV',
    icon: '/images/icons/tv.png',
  },
  {
    label: 'Computer',
    icon: '/images/icons/computer.png',
  },
  {
    label: 'Internet',
    icon: '/images/icons/browser.png',
  },
  {
    label: 'Wifi',
    icon: '/images/icons/wifi.png',
  },
  {
    label: 'In-home movie theater',
    icon: '/images/icons/movie.png',
  },
  {
    label: 'Satellite / cable',
    icon: '/images/icons/satellite.png',
  },
  {
    label: 'Phone',
    icon: '/images/icons/landline.png',
  },
  {
    label: 'Video game console',
    icon: '/images/icons/game-controller.png',
  },
  {
    label: 'Smart TV',
    icon: '/images/icons/smart-tv.png',
  },
];

export const facilities = [
  {
    label: 'Private garden',
    icon: '/images/icons/fence.png',
  },
  {
    label: 'Pool',
    icon: '/images/icons/pools.png',
  },
  {
    label: 'BBQ',
    icon: '/images/icons/bbq.png',
  },
  {
    label: 'A/C',
    icon: '/images/icons/a-c.png',
  },
  {
    label: 'Elevator',
    icon: '/images/icons/elevator.png',
  },
  {
    label: 'Fireplace',
    icon: '/images/icons/fireplace.png',
  },
  {
    label: 'Private parking space',
    icon: '/images/icons/parking.png',
  },
  {
    label: 'Car',
    icon: '/images/icons/car.png',
  },
  {
    label: 'Bicycle',
    icon: '/images/icons/bicycle.png',
  },
  {
    label: 'Motorcycle',
    icon: '/images/icons/motorbike.png',
  },
  {
    label: 'Doorman inclueded',
    icon: '/images/icons/doorman.png',
  },
  {
    label: 'Cleaning person',
    icon: '/images/icons/cleaning-person.png',
  },
  {
    label: 'Private tennis court',
    icon: '/images/icons/court.png',
  },
  {
    label: 'Ping-pong table',
    icon: '/images/icons/ping-pong-table.png',
  },
  {
    label: 'Balcony / terrace',
    icon: '/images/icons/balcony.png',
  },
  {
    label: 'Piano',
    icon: '/images/icons/piano.png',
  },
  {
    label: 'Jacuzzi',
    icon: '/images/icons/jacuzzi.png',
  },
  {
    label: 'Private sauna',
    icon: '/images/icons/sauna.png',
  },
  {
    label: 'Private gym',
    icon: '/images/icons/gym.png',
  },
  {
    label: 'Pool table',
    icon: '/images/icons/pool-table.png',
  },
  {
    label: 'Motor scooter',
    icon: '/images/icons/scooter.png',
  },
  {
    label: 'Motorboat',
    icon: '/images/icons/motorboat.png',
  },
  {
    label: 'Sailboat',
    icon: '/images/icons/sailboat.png',
  },
  {
    label: 'Eletric car',
    icon: '/images/icons/electric-car.png',
  },
  {
    label: 'Babysitter included',
    icon: '/images/icons/milk-bottle.png',
  },
];

export const kids = [
  {
    label: 'Kids toys',
    icon: '/images/icons/kid-toys.png',
  },
  {
    label: 'Kids playground',
    icon: '/images/icons/playground.png',
  },
  {
    label: 'Baby gear',
    icon: '/images/icons/baby-gear.png',
  },
  {
    label: 'Secured pool',
    icon: '/images/icons/secured-pool.png',
  },
];

export const remotes = [
  {
    label: 'High speed connection',
    icon: '/images/icons/high-speed.png',
  },
  {
    label: 'Dedicated work space',
    icon: '/images/icons/workplace.png',
  },
];

export const ecos = [
  {
    label: 'Renewable energy provider',
    icon: '/images/icons/renewable-energy.png',
  },
  {
    label: 'Low consumption machines',
    icon: '/images/icons/energy-consumption.png',
  },
  {
    label: 'Selective waste sorting',
    icon: '/images/icons/waste-bin.png',
  },
  {
    label: 'Vegetable Garden',
    icon: '/images/icons/vegetables.png',
  },
  {
    label: 'Public transport access',
    icon: '/images/icons/public-transport.png',
  },
  {
    label: 'Solar panels',
    icon: '/images/icons/solar-panel.png',
  },
];

export const allergies = [
  {
    label: 'Cat',
    icon: '/images/icons/cat.png',
  },
  {
    label: 'Dog',
    icon: '/images/icons/dog.png',
  },
  {
    label: 'Other animals',
    icon: '/images/icons/animals.png',
  },
];

const RegisterBody = () => {
  const [step, setStep] = useState(STEPS.INFO);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const axiosAuthClient = useAxiosAuthClient();
  const loginModal = useLoginModal();
  const router = useRouter();
  const dateFormat = 'YYYY/MM/DD';

  const handleChangeDate = (value: any) => {
    setDate(value);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      phone: '',
      gender: '',
      role: { roleId: 2 },
      dob: date,
    },
  });

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  // const homeType = watch("homeType");
  // const residenceType = watch("residenceType");
  // const location = watch("location");
  // const size = watch("size");
  const gender = watch('gender');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.REGISTERAPARTMENT) {
      setIsLoading(true);
      axios
        .post('https://holiday-swap.click/api/v1/auth/register', data)
        .then(() => {
          toast.success('Register Success');
          onNext();
          // loginModal.onOpen();
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  let bodyContent = (
    <>
      <HeadingRegister label="Register" width="w-1/12" />
      <div className="px-4 md:px-20 flex-col w-full bg-white">
        <div className="flex items-center py-12 w-full text-3xl">You fill information of you</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            register={register}
            errors={errors}
            type="text"
            id="username"
            label="Username*"
            placeholder="Username"
          />
          <Input
            register={register}
            errors={errors}
            type="text"
            id="email"
            label="Email*"
            placeholder="Email"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            register={register}
            errors={errors}
            type="password"
            id="password"
            label="Password"
            placeholder="Password"
          />
          <Input
            register={register}
            errors={errors}
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full flex flex-col">
            <div className="py-3">Birth Date*</div>

            {/* <DateTimePicker
              id="dob"
              date={date}
              onChange={(value: any) => handleChangeDate(value)}
            /> */}
            <div>
              <DatePicker
                className="p-4 border-2 border-gray-400"
                id="dob"
                onChange={(value: any) => {
                  handleChangeDate(value);
                  setCustomValue('dob', value);
                }}
                defaultValue={dayjs('2001/01/01', dateFormat)}
                format={dateFormat}
              />
            </div>
          </div>

          <div className="w-full flex flex-col">
            <label className="py-3">Gender</label>
            <select
              onChange={(e) => setCustomValue('gender', e.target.value)}
              className="peer  p-4 pt-6 font-light bg-white border rounded-md outline-none transition disabled:opacity-70"
            >
              <option value="">Any</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            register={register}
            errors={errors}
            type="text"
            id="phone"
            label="Phone"
            placeholder="Phone"
          />
          {/* <Input
            type="text"
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
          /> */}
        </div>
        <div className="flex flex-row w-full items-center justify-center pt-10 pb-4    ">
          <input type="checkbox" />
          <div>
            * Creating an account means you&apos;re okay with our Terms of Service and Privacy
            Statement.
          </div>
        </div>
        <BtnRegister onClick={handleSubmit(onSubmit)} label="Continue" />
        <div className="bg-[#A7A7A7] w-full h-[0.5px] my-[50px]"></div>
        <div className="w-full flex flex-col items-center  justify-center">
          <div className="text-[20px] font-bold pb-2">Already Member?</div>
          <button onClick={loginModal.onOpen} className="text-blue-300 pb-[60px]">
            Login
          </button>
        </div>
      </div>
    </>
  );

  if (step === STEPS.REGISTERAPARTMENT) {
    bodyContent = (
      <>
        <StepCreateApartmentRegister />
      </>
    );
  }

  // if (step === STEPS.HOMETYPE) {
  //   bodyContent = (
  //     <HomeType
  //       onClick={(homeType) => setCustomValue("homeType", homeType)}
  //       selected={homeType}
  //       handleSubmit={handleSubmit(onSubmit)}
  //     />
  //   );
  // }

  // if (step === STEPS.HOMESIZE) {
  //   bodyContent = (
  //     <HomeSize
  //       register={register}
  //       errors={errors}
  //       handleSubmit={handleSubmit(onSubmit)}
  //     />
  //   );
  // }

  // if (step === STEPS.PEOPLE) {
  //   bodyContent = <People handleSubmit={handleSubmit(onSubmit)} />;
  // }

  // if (step === STEPS.AMENITIES) {
  //   bodyContent = <Amenities handleSubmit={handleSubmit(onSubmit)} />;
  // }

  // if (step === STEPS.DESCRIBE) {
  //   bodyContent = (
  //     <Describe
  //       register={register}
  //       errors={errors}
  //       handleSubmit={handleSubmit(onSubmit)}
  //     />
  //   );
  // }

  // if (step === STEPS.TIMEAVAILABLE) {
  //   bodyContent = <TimeAvailable handleSubmit={handleSubmit(onSubmit)} />;
  // }

  // if (step === STEPS.IMAGES) {
  //   bodyContent = <Images handleSubmit={handleSubmit(onSubmit)} />;
  // }

  // if (step === STEPS.CREATED) {
  //   bodyContent = <Created handleSubmit={handleSubmit(onSubmit)} />;
  // }
  return <div>{bodyContent}</div>;
};

export default RegisterBody;
