'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
// import { Select, Option } from '@material-tailwind/react';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import toast from 'react-hot-toast';
import { peoples, sizes } from '@/app/components/register/RegisterBody';
import SizeHomeInput from '@/app/components/register/SizeHomeInput';
import Image from 'next/image';
import ButtonRegister from '@/app/components/register/BtnRegister';
import Input from '@/app/components/input/Input';
import InputInRoomAmenities from './InputInRoomAmenities';
import SelectRouterStaff from '@/app/components/staff/SelectRouterStaff';
import { Select } from 'antd';
import HeadingDashboard from '@/app/components/HeadingDashboard';
import axios from 'axios';

enum STEPS {
  BEDS = 0,
  SIZE = 1,
}

interface CreatePropertyProps {
  propertyTypes: any;
  propertyViews: any;
  inRoomAmenities: any;
  listResort: any;
}

const CreateProperty: React.FC<CreatePropertyProps> = ({
  propertyTypes,
  propertyViews,
  inRoomAmenities,
  listResort,
}) => {
  const router = useRouter();

  const [propertyTypesInput, setPropertyTypesInput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const axiosAuthClient = useAxiosAuthClient();
  const [step, setStep] = useState(STEPS.BEDS);
  const [propertyTypeValue, setPropertyTypeValue] = useState<any>();
  const [propertyViewValue, setPropertyViewValue] = useState<any>();
  const [resortIdValue, setResortIdValue] = useState<any>();
  const [file, setFile] = useState<any[]>([]);
  const [totalGuests, setTotalGuests] = useState<number>(0);

  const handleChange = (e: any) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles) {
      setFile(selectedFiles);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({});

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const setCustomeValue = (id: string, value: any[]) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleChangePropertyType = (value: any) => {
    setPropertyTypeValue(value);
  };

  const handleChangePropertyView = (value: any) => {
    setPropertyViewValue(value);
  };

  const handleAmenitiesChange = (value: any[]) => {
    setCustomeValue('inRoomAmenities', value);
  };

  const handelChangeResortId = (value: any) => {
    setCustomeValue('resortId', value);
    fetchPropertyType(value);
  };
  const fetchPropertyType = (resortId: number) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://holiday-swap.click/api/v1/property-types/listPropertyTypeInResort/${resortId}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setPropertyTypesInput(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    // Calculate totalGuests whenever relevant form fields change
    setTotalGuests(
      Number(getValues('numberKingBeds')) * 2 +
        Number(getValues('numberQueenBeds')) * 2 +
        Number(getValues('numberSingleBeds')) +
        Number(getValues('numberDoubleBeds')) * 2 +
        Number(getValues('numberTwinBeds')) * 2 +
        Number(getValues('numberFullBeds')) * 2 +
        Number(getValues('numberSofaBeds')) +
        Number(getValues('numberMurphyBeds'))
    );
  }, [getValues]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.SIZE) {
      const totalBeds =
        Number(data.numberKingBeds) +
        Number(data.numberQueenBeds) +
        Number(data.numberDoubleBeds) +
        Number(data.numberTwinBeds) +
        Number(data.numberFullBeds) +
        Number(data.numberSofaBeds) +
        Number(data.numberMurphyBeds);
      if (totalBeds === 0) {
        toast.error('You must have at least 1 type of bed');
        return null;
      } else {
        return onNext();
      }
    }
    setIsLoading(true);
    const formData = new FormData();

    console.log('Check data', data.inRoomAmenities);
    const property = {
      propertyName: data.propertyName,
      propertyDescription: data.propertyDescription,
      numberKingBeds: data.numberKingBeds,
      numberQueenBeds: data.numberQueenBeds,
      numberSingleBeds: data.numberSingleBeds,
      numberDoubleBeds: data.numberDoubleBeds,
      numberTwinBeds: data.numberTwinBeds,
      numberFullBeds: data.numberFullBeds,
      numberSofaBeds: data.numberSofaBeds,
      numberMurphyBeds: data.numberMurphyBeds,
      numberBedsRoom: data.numberBedsRoom,
      numberBathRoom: data.numberBathRoom,
      roomSize: data.roomSize,
      resortId: data.resortId,
      propertyTypeId: propertyTypeValue,
      propertyViewId: propertyViewValue,
      inRoomAmenities: data.inRoomAmenities,
    };

    const propertyBlod = new Blob([JSON.stringify(property)], {
      type: 'application/json ',
    });
    formData.append('property', propertyBlod);
    file.forEach((element) => {
      formData.append('propertyImages', element);
    });

    axiosAuthClient
      .post('/properties', formData)
      .then(() => {
        toast.success('Create Property Success!');
        reset();
        router.push('/staff/listproperty'); // Navigate to the listproperty page
      })
      .catch((response) => {
        toast.error(response.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  console.log('Check total guest', totalGuests);

  let bodyContent = (
    <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex flex-col">
        <div className="pb-8">
          {peoples.map((item, index) => (
            <SizeHomeInput
              key={index}
              label={item.label}
              count={item.count}
              icon={item.icon}
              id={item.id}
              register={register}
              setCustomeValue={setCustomeValue}
            />
          ))}

          {totalGuests !== 0 ? (
            <div className="pb-14">Your home can accommodate up to {totalGuests} people.</div>
          ) : (
            ''
          )}
        </div>

        <div className="flex justify-center">
          <ButtonRegister label="Continue" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>

      <Image
        className="hidden md:block"
        src="/images/size.png"
        alt="Home"
        width={600}
        height={720}
      />
    </div>
  );

  if (step === STEPS.SIZE) {
    bodyContent = (
      <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col py-4">
          <div>
            <input
              {...register('propertyImages', {
                required: 'Recipe picture is required',
              })}
              type="file"
              id="propertyImages"
              multiple
              onChange={handleChange}
            />
          </div>
          <Input
            register={register}
            errors={errors}
            type="text"
            id="propertyName"
            label="Property Name*"
            placeholder="Property Name"
          />
          <Input
            register={register}
            errors={errors}
            type="text"
            id="propertyDescription"
            label="Property Description*"
            placeholder="Property Description"
          />
          <Input
            register={register}
            errors={errors}
            type="number"
            min={10}
            id="roomSize"
            label="Size*"
            placeholder="30"
          />

          <div className="mt-8 mb-5 w-full">
            <div>Select resort*</div>
            <Select
              className="w-full h-[44px] border-2 border-gray-400 rounded-md focus:border-transparent"
              value={resortIdValue}
              onChange={handelChangeResortId}
              showSearch
              optionFilterProp="children"
              filterOption={(input: string, option?: { children: string }) =>
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
              }
            >
              {listResort.content.map((item: any, index: any) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.resortName}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="w-full py-4 grid grid-cols-2 gap-4">
            <div>
              <div>Select property types*</div>
              <Select
                className="w-full h-[44px] border-2  border-gray-400 rounded-md "
                value={propertyTypeValue}
                onChange={handleChangePropertyType}
                showSearch
                optionFilterProp="children"
                filterOption={(input: string, option?: { children: string }) =>
                  (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                }
              >
                {propertyTypesInput.map((item: any, index: any) => (
                  <Select.Option value={item.id} key={item.id}>
                    {item.propertyTypeName}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div>
              <div>Select property view*</div>
              <Select
                className="w-full h-[44px] border-2 border-gray-400 rounded-md "
                value={propertyViewValue}
                onChange={handleChangePropertyView}
                showSearch
                optionFilterProp="children"
                filterOption={(input: string, option?: { children: string }) =>
                  (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                }
              >
                {propertyViews.map((item: any, index: any) => (
                  <Select.Option value={item.id} key={item.id}>
                    {item.propertyViewName}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <InputInRoomAmenities
              inRoomAmenities={inRoomAmenities}
              handleAmenitiesChange={handleAmenitiesChange}
            />
          </div>
          <div className="py-14">
            {sizes.map((item, index) => (
              <SizeHomeInput
                key={index}
                label={item.label}
                count={item.count}
                icon={item.icon}
                id={item.id}
                register={register}
                setCustomeValue={setCustomeValue}
              />
            ))}
          </div>

          <div className="grid grid-cols-2">
            <div className="flex flex-row items-center justify-center">
              <button
                onClick={onBack}
                className="bg-gray-500 px-24 py-2 my-2 text-white rounded-md"
              >
                Back
              </button>
            </div>
            <ButtonRegister label="Continue" onClick={handleSubmit(onSubmit)} />
          </div>
        </div>

        <Image
          className="hidden md:block"
          src="/images/size.png"
          alt="Home"
          width={600}
          height={720}
        />
      </div>
    );
  }
  return (
    <div>
      <div className="mt-2">
        <HeadingDashboard
          routerDashboard="/staff"
          pageCurrentContent="Create property"
          pageCurrentRouter="/staff/createproperty"
        />
      </div>
      <SelectRouterStaff />

      {bodyContent}
    </div>
  );
};

export default CreateProperty;
