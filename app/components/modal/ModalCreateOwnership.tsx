'use client';

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../input/Input';
import { toast } from 'react-hot-toast';
import { Select, Textarea, Label, FileInput } from 'flowbite-react';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import useCreateOwnershipModal from '@/app/hooks/useCreateOwnershipModal';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ModalCreate from './ModalCreate';

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

export default function ModalCreateOwnership() {
  const { data: session } = useSession();
  const router = useRouter();
  const createOwnershipModal = useCreateOwnershipModal();
  const dataResort = createOwnershipModal.dataResort;
  const currentUser = createOwnershipModal.currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any[]>([]);
  const [resortId, setResortId] = useState();
  const [properties, setProperties] = useState<any[]>([]);
  const [propertyValue, setPropertyValue] = useState();
  const [typeValue, setTypeValue] = useState<any>(type[0].type);
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [startYear, setStartYear] = useState(new Date());
  const [endYear, setEndYear] = useState(new Date());
  const [weekNumberValue, setWeekNumberValue] = useState<any>([]);
  const [weekNumberSingle, setWeekNumberSingle] = useState<any>();
  const axiosAuthClient = useAxiosAuthClient();
  const [previewImages, setPreviewImages] = useState<{ src: string; index: number }[]>([]);

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

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return null;
    } else {
      const selectedFile = Array.from(e.target.files);

      if (selectedFile) {
        setFile((prevFiles) => [...prevFiles, ...selectedFile]);

        // Assuming only one file is selected, update the preview image
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages((prevImages) => [
            ...prevImages,
            { src: reader.result as string, index: prevImages.length },
          ]);
        };
        reader.readAsDataURL(selectedFile[0]);
      }
    }
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
      setWeekNumberSingle(value);
    }
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
    setIsLoading(true);
    const formData = new FormData();

    const coOwnerId = {
      propertyId: data.propertyId as number,
      userId: currentUser.userId as number,
      roomId: data.roomId,
    };
    const coOwner = {
      endTime: typeValue === 'DEEDED' ? null : endYear,
      startTime: typeValue === 'DEEDED' ? null : startYear,
      type: typeValue,
      timeFrames:
        weekNumberValue.length === 1
          ? { weekNumber: weekNumberSingle }
          : weekNumberValue?.map((element: any) => ({ weekNumber: element as number })),
    };
    const coOwnerIdBlob = new Blob([JSON.stringify(coOwnerId)], {
      type: 'application/json',
    });
    const coOwnerBlob = new Blob([JSON.stringify(coOwner)], {
      type: 'application/json',
    });
    formData.append('coOwnerId', coOwnerIdBlob);
    formData.append('coOwner', coOwnerBlob);
    file.forEach((element) => {
      formData.append('contractImages', element);
    });

    axiosAuthClient
      .post('https://holiday-swap.click/api/co-owners', formData)
      .then(() => {
        toast.success('Create ownership success!');
        createOwnershipModal.onClose();

        reset();
      })
      .catch((response) => {
        toast.error(response.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  console.log('Check length', weekNumberValue.length);

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label value="Select resort" />
          <Select
            id="resortId"
            value={resortId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeResortId(e.target.value)}
          >
            {dataResort?.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.resortName}
              </option>
            ))}
          </Select>
        </div>

        <div>
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
      </div>

      <div className="grid grid-cols-1">
        <Label value="Select type ownership" />
        <Select
          id="type"
          value={typeValue}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeTypeValue(e.target.value)}
        >
          {type?.map((item: any) => (
            <option key={item.id} value={item.type}>
              {item.label}
            </option>
          ))}
        </Select>
      </div>

      {typeValue === 'RIGHT_TO_USE' && (
        <div onClick={handleVisibleCalendar} className="grid grid-cols-1 gap-4">
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
                  setStartYear(newStartDate);
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
                  setEndYear(newEndDate);
                }}
                className="border-0 text-base text-gray-600 focus:outline-none w-full focus:ring-0"
                value={endYear.getFullYear()}
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Input
          id="weekNumber"
          label="Number of week in a year"
          disabled={isLoading}
          register={register}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeWeekNumberValue(e.target.value)
          }
          errors={errors}
          required
          tooltipContent="This is the week you own in the year, for example if you own the 6th week in 2023, you enter 6. You can enter multiple weeks by separating the weeks with a comma. For example: 6, 10, 11"
        />
        <Input
          id="roomId"
          label="Apartment ID"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label>Contract Image</label>
        <FileInput
          {...register('contractImages', {
            required: 'Recipe picture is required',
          })}
          id="contractImages"
          onChange={handleChangeImage}
          multiple
        />
        <div className="grid grid-cols-2">
          {previewImages.map((image) => (
            <div key={image.index} className="relative w-full">
              <img
                src={image.src}
                alt="Preview"
                style={{ width: '100%', maxHeight: '200px', marginTop: '10px' }}
              />

              <AiOutlineCloseCircle
                size={20}
                className="absolute top-5 right-3"
                onClick={() => handleDeleteImage(image.index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ModalCreate
      disabled={isLoading}
      isOpen={createOwnershipModal.isOpen}
      title="Create Ownership"
      actionLabel="Submit"
      onClose={createOwnershipModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}
