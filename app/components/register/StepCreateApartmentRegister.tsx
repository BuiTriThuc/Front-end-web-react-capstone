'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { message, Steps, theme } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UploadContract from './UploadContractApartment';
import { Label, Select } from 'flowbite-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FieldValues, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import InputComponent from '../input/Input';
import UploadContractApartment from './UploadContractApartment';
import useCreateApartmentRegister from '@/app/hooks/useCreateApartmentRegister';

export const type = [
  {
    id: 1,
    type: 'DEEDED',
    label: 'Owner forever',
  },
  {
    id: 2,
    type: 'RIGHT_TO_USE',
    label: 'Owner for a period of time',
  },
];

const Apartment = [
  {
    title: 'First',
    content: (handleRouter: () => void) => (
      <div className="grid grid-cols-2 bg-white pt-10 px-10 mt-10">
        <div>
          <div className="text-[30px] font-bold text-common">Step 1</div>
          <div className="py-3 text-[40px] font-bold">Share your apartment information with us</div>
          <div className="text-gray-500">
            In this step we will ask you what type of apartment you are renting and how long you
            have owned that apartment, then indicate the number of guests who can stay in the
            apartment.
          </div>
          <div className="flex flex-col">
            <div className="text-gray-500">
              If you do not want to apply for an apartment right now, you can{' '}
              <span className="underline text-black">skip</span> this step
            </div>
            <div className="py-4">
              <button
                onClick={handleRouter}
                type="button"
                className="bg-common hover:bg-hover p-3 text-white rounded-md"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end w-full">
          <img className="w-[80%] h-[90%] shadow-md " src="/images/apartmentstep1.jpg" alt="" />
        </div>
      </div>
    ),
  },

  {
    title: 'Second',
    content: (
      handleRouter: () => void,
      listResort: any,
      resortId: any,
      handleChangeResortId: (value: any) => void,
      properties: any,
      propertyValue: any,
      handleChangePropertyValue: (value: any) => void,
      register: UseFormRegister<FieldValues>,
      errors: any
    ) => (
      <div>
        <div className="grid grid-cols-2 bg-white pt-10 py-10 px-10 mt-10">
          <div>
            <div className="text-[30px] font-bold text-common">Step 2</div>
            <div className="py-3 text-[40px] font-bold">
              Please let us know which resort and property type your apartment belongs to
            </div>
            <div className="text-gray-500">
              In this step, click on select a resort that contains your apartment and then select
              the property type of your apartment
            </div>
            <div className="mt-10">
              <div>
                <Label value="Select resort" />
                <Select
                  id="resortId"
                  value={resortId}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleChangeResortId(e.target.value)
                  }
                >
                  {listResort?.content.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.resortName}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="mt-3">
              <Label value="Select property" />
              <Select
                id="propertyId"
                value={propertyValue}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleChangePropertyValue(e.target.value)
                }
              >
                {properties?.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.propertyName}
                  </option>
                ))}
              </Select>
            </div>
            <div className="mt-3">
              <InputComponent
                id="roomId"
                label="Apartment ID"
                register={register}
                errors={errors}
                required
              />
            </div>
          </div>
          <div className="flex flex-row justify-end w-full">
            <img className="w-[80%] h-[90%] shadow-md " src="/images/apartmentstep3.jpg" alt="" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Firth',
    content: (
      handleRouter: () => void,
      listResort: any,
      resortId: any,
      handleChangeResortId: (value: any) => void,
      properties: any,
      propertyValue: any,
      handleChangePropertyValue: (value: any) => void,
      register: UseFormRegister<FieldValues>,
      errors: any,
      typeValue: any,
      handleChangeTypeValue: (value: any) => void,
      startYear: any,
      handleChangeStartYear: (value: any) => void,
      endYear: any,
      handleChangeEndYear: (value: any) => void
    ) => (
      <div>
        <div className="grid grid-cols-2 gap-20">
          <div>
            <div className="text-[30px] font-bold text-common">Step 3</div>
            <div className="py-3 text-[40px] font-bold">
              Let us know what type of apartment owner you are
            </div>
            <div className="text-gray-500">
              In this step, if you are the owner of a Vinh Vien apartment, choose the Vinh Vien
              style or if you are the owner of an apartment by year, choose the yearly style.
            </div>
            <div className="grid grid-cols-1 pt-7">
              <Label value="Select type ownership" />
              <Select
                id="type"
                value={typeValue}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleChangeTypeValue(e.target.value)
                }
              >
                {type?.map((item: any) => (
                  <option key={item.id} value={item.type}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="pt-5">
              {typeValue === 'RIGHT_TO_USE' && (
                <div className="grid grid-cols-1 gap-4">
                  <div className={`grid grid-cols-2 rounded-lg border border-gray-600`}>
                    <div className={`p-2 border-r border-gray-600`}>
                      <div className="text-xs">Start year</div>
                      <input
                        type="number"
                        min={new Date().getFullYear() - 30}
                        max={new Date().getFullYear() + 25}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const selectedYear = parseInt(e.target.value);
                          const newStartDate = new Date(selectedYear, 0, 1); // Month is 0-based, so 0 represents January
                          handleChangeStartYear(newStartDate);
                        }}
                        className="border-0 text-base text-gray-600 focus:outline-none w-full focus:ring-0"
                        value={startYear.getFullYear()}
                      />
                    </div>
                    <div className={`p-2 border-gray-600  `}>
                      <div className="text-xs">End year</div>
                      <input
                        type="number"
                        min={new Date().getFullYear() - 30}
                        max={new Date().getFullYear() + 25}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const selectedYear = parseInt(e.target.value);
                          const newEndDate = new Date(selectedYear, 0, 1); // Month is 0-based, so 0 represents January
                          handleChangeEndYear(newEndDate);
                        }}
                        className="border-0 text-base text-gray-600 focus:outline-none w-full focus:ring-0"
                        value={endYear.getFullYear()}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <img className="w-[100%] h-[100%] shadow-md " src="/images/apartmentstep4.jpg" alt="" />
        </div>
      </div>
    ),
  },
  {
    title: 'Fisnish',
    content: (
      handleRouter: () => void,
      listResort: any,
      resortId: any,
      handleChangeResortId: (value: any) => void,
      properties: any,
      propertyValue: any,
      handleChangePropertyValue: (value: any) => void,
      register: UseFormRegister<FieldValues>,
      errors: any,
      typeValue: any,
      handleChangeTypeValue: (value: any) => void,
      startYear: any,
      handleChangeStartYear: (value: any) => void,
      endYear: any,
      handleChangeEndYear: (value: any) => void,
      handeChangeNewImages: (value: any) => void
    ) => (
      <div>
        <div className="grid grid-cols-2 bg-white pt-10 px-10 mt-10">
          <div>
            <div className="text-[30px] font-bold text-common">Step 4</div>
            <div className="py-3 text-[40px] font-bold">Prove that you are the apartment owner</div>
            <div className="text-gray-500">
              In this step, you need to prove that you are the owner of the apartment through sales
              contracts. Please take a photo of the contract and send it to our system.
            </div>
            <div className="mt-10">
              <UploadContractApartment handeChangeNewImages={handeChangeNewImages} />
            </div>
          </div>
          <div className="flex flex-row justify-end w-full">
            <img className="w-[80%] h-[90%] shadow-md " src="/images/apartmentstep5.jpg" alt="" />
          </div>
        </div>
      </div>
    ),
  },
];

interface StepCreateApartmentRegisterProps {
  listResort: any;
}

const StepCreateApartmentRegister: React.FC<StepCreateApartmentRegisterProps> = ({
  listResort,
}) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const [ownershipType, setOwnershipType] = useState(''); // Thêm state để lưu lựa chọn của người dùng
  const [isLoading, setIsLoading] = useState(false);
  const createApartmentRegister = useCreateApartmentRegister();
  const user = createApartmentRegister.user;
  const [file, setFile] = useState<any[]>([]);
  const [resortId, setResortId] = useState<any>();
  const [properties, setProperties] = useState<any[]>([]);
  const [propertyValue, setPropertyValue] = useState();
  const [typeValue, setTypeValue] = useState<any>(type[0].type);
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [startYear, setStartYear] = useState(new Date());
  const [endYear, setEndYear] = useState(new Date());
  const [weekNumberValue, setWeekNumberValue] = useState<any>([]);
  const [weekNumberSingle, setWeekNumberSingle] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const axiosAuthClient = useAxiosAuthClient();
  const [previewImages, setPreviewImages] = useState<{ src: string; index: number }[]>([]);
  const [contractImage, setContractImage] = useState<any[]>([]);

  const handeChangeNewImages = (image: any) => {
    if (image) {
      setContractImage((old) => [...old, image]);
    }
  };

  const [weekNumbers, setWeekNumbers] = useState([{ id: 1 }]);

  // Thêm một tuần mới
  const addWeekNumber = () => {
    const newWeekNumbers = [...weekNumbers];
    newWeekNumbers.push({ id: newWeekNumbers.length + 1 });
    setWeekNumbers(newWeekNumbers);
  };

  const removeWeekNumber = (index: number) => {
    const newWeekNumbers = weekNumbers.filter((_, i) => i !== index);
    setWeekNumbers(newWeekNumbers);
  };

  const handleDeleteImage = (index: number) => {
    setFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewImages((prevImages) => prevImages.filter((image) => image.index !== index));
  };

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

  const handleChangeResortId = (value: any) => {
    setResortId(value);
  };

  const handleChangePropertyValue = (value: any) => {
    setPropertyValue(value);
  };

  const handleChangeTypeValue = (value: any) => {
    setTypeValue(value);
  };

  const handleVisibleCalendar = () => {
    setVisibleCalendar(!visibleCalendar);
  };

  const handleChangeWeekNumberValue = (value: string) => {
    if (value.includes(',')) {
      const newArray = value.split(',');
      setWeekNumberValue(newArray);
    } else {
      setWeekNumberValue((prev: any) => [...prev, value]);
    }
  };

  const handleChangeStartYear = (value: any) => {
    setStartYear(value);
  };

  const handleChangeEndYear = (value: any) => {
    setEndYear(value);
  };

  useEffect(() => {
    const fetchProperty = async () => {
      if (resortId) {
        const data = await axios.get(
          `https://holiday-swap.click/api/v1/properties?resortId=${resortId}&numberGuest=0&pageNo=0&pageSize=10&sortBy=id`
        );
        setProperties(data.data.content);
      }
    };
    fetchProperty();
  }, [resortId]);

  useEffect(() => {
    setCustomeValue('propertyId', propertyValue);
  }, [propertyValue, file]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (user !== null) {
      setIsLoading(true);
      const formData = new FormData();

      const coOwnerId = {
        propertyId: data.propertyId as number,
        userId: user.userId,
        roomId: data.roomId,
      };
      const coOwner = {
        endTime: typeValue === 'DEEDED' ? null : endYear,
        startTime: typeValue === 'DEEDED' ? null : startYear,
        type: typeValue,
        timeFrames: weekNumberValue?.map((element: any) => ({ weekNumber: element as number })),
      };
      const coOwnerIdBlob = new Blob([JSON.stringify(coOwnerId)], {
        type: 'application/json',
      });
      const coOwnerBlob = new Blob([JSON.stringify(coOwner)], {
        type: 'application/json',
      });
      formData.append('coOwnerId', coOwnerIdBlob);
      formData.append('coOwner', coOwnerBlob);
      contractImage.forEach((element) => {
        formData.append('contractImages', element);
      });

      axiosAuthClient
        .post('https://holiday-swap.click/api/co-owners', formData)
        .then(() => {
          toast.success('Create ownership success!');
          setOpenModal(false);
          reset();
        })
        .catch((response) => {
          toast.error(response.response.data.message);
          setOpenModal(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = Apartment.map((item) => ({ key: item.title, title: item.title }));

  const handleDone = () => {
    setTimeout(() => {
      router.push('/dashboard/wallet');
    }, 3000);
  };

  const handleRouter = () => {
    router.push('/');
  };

  // Hàm xử lý khi thay đổi lựa chọn "Select type ownership"
  const handleOwnershipTypeChange = (value: any) => {
    setOwnershipType(value);
  };

  return (
    <div className="px-10 py-10 bg-white">
      <Steps className="pt-20" current={current} items={items} />
      <div>
        {Apartment[current].content(
          handleRouter,
          listResort,
          resortId,
          handleChangeResortId,
          properties,
          propertyValue,
          handleChangePropertyValue,
          register,
          errors,
          typeValue,
          handleChangeTypeValue,
          startYear,
          handleChangeStartYear,
          endYear,
          handleChangeEndYear,
          handeChangeNewImages
        )}
      </div>
      <div className="mt-10">
        <div className="bg-white px-10 py-10">
          {/* {current === 3 && (
            <div className="grid grid-cols-2 gap-20">
              <div>
                <div className="text-[30px] font-bold text-common">Step 3</div>
                <div className="py-3 text-[40px] font-bold">
                  Let us know what type of apartment owner you are
                </div>
                <div className="text-gray-500">
                  In this step, if you are the owner of a Vinh Vien apartment, choose the Vinh Vien
                  style or if you are the owner of an apartment by year, choose the yearly style.
                </div>
                <div className="mt-10">
                  Select type ownership<span className="text-red-500">*</span>
                </div>
                <select
                  className="w-full rounded-md mt-2"
                  name=""
                  id=""
                  value={ownershipType}
                  onChange={(e) => handleOwnershipTypeChange(e.target.value)}
                >
                  <option value="Owner forever">Owner forever</option>
                  <option value="Owner for a period of time">Owner for a period of time</option>
                </select>
                <div className="mt-5">
                  <div>
                    Which week of the year? <span className="text-red-500">*</span>
                  </div>
                  <input className="w-full rounded-md px-2 mt-2" type="text" />
                </div>
                {current === 3 && ownershipType === 'Owner for a period of time' && (
                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <div className="w-full">
                      <div className="mb-2">Start year</div>
                      <input className="rounded-md px-2 w-full" type="text" />
                    </div>
                    <div className="w-full">
                      <div className="mb-2">End year</div>
                      <input className="rounded-md px-2 w-full" type="text" />
                    </div>
                  </div>
                )}
              </div>
              <img
                className="w-[100%] h-[100%] shadow-md "
                src="/images/apartmentstep4.jpg"
                alt=""
              />
            </div>
          )} */}
        </div>
      </div>
      <div className="-mt-10">
        {current < Apartment.length - 1 && (
          <button
            className="bg-common hover:bg-hover px-5 py-2 rounded-md text-white"
            onClick={() => next()}
          >
            Next
          </button>
        )}
        {current === Apartment.length - 1 && (
          <Link
            href="./dashboard/ownership"
            className="bg-common hover:bg-hover px-5 py-2 rounded-md text-white"
            onClick={() => message.success('Processing complete!', handleDone)}
          >
            Done
          </Link>
        )}
        {current > 0 && (
          <button
            className="bg-common hover:bg-hover px-5 py-2 rounded-md text-white"
            style={{ margin: '0 8px' }}
            onClick={() => prev()}
          >
            Previous
          </button>
        )}
      </div>
    </div>
  );
};

export default StepCreateApartmentRegister;
