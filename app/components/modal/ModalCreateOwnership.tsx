'use client';

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import InputComponent from '../input/Input';
import { toast } from 'react-hot-toast';
import { Select, Textarea, Label, FileInput, Modal, Button } from 'flowbite-react';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import useCreateOwnershipModal from '@/app/hooks/useCreateOwnershipModal';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ModalCreate from './ModalCreate';
import ToolTipCreateOwnership from '../tooltip/ToolTipCreateOwnership';
import UploadImageCreateOwnership from './UploadImageCreateOwnership';

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
  const [resortId, setResortId] = useState<any>();
  const [properties, setProperties] = useState<any[]>([]);
  const [propertyValue, setPropertyValue] = useState<any>();
  const [typeValue, setTypeValue] = useState<any>(type[0].type);
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [startYear, setStartYear] = useState(new Date());
  const [endYear, setEndYear] = useState(new Date());
  const [weekNumberValue, setWeekNumberValue] = useState<any>([]);
  const [weekNumberSingle, setWeekNumberSingle] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const axiosAuthClient = useAxiosAuthClient();
  const [previewImages, setPreviewImages] = useState<{ src: string; index: number }[]>([]);
  const [isClearImage, setIsClearImage] = useState(false);

  const [weekNumbers, setWeekNumbers] = useState([{ id: 1 }]);

  const handleDeleteImage = (image: any) => {
    setFile(file.filter((prev) => prev.size !== image.size));
  };

  const handeChangeNewImages = (image: any) => {
    if (image) {
      setFile((old) => [...old, image]);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      propertyId: '',
      roomId: '',
    },
  });

  const setCustomeValue = (id: any, value: any) => {
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
      setWeekNumberValue([value]);
    }
  };

  // useEffect(() => {
  //   if (dataResort) {
  //     setResortId(dataResort[0].id);
  //   }
  // }, [dataResort]);

  useEffect(() => {
    setCustomeValue('propertyId', propertyValue);
  }, [propertyValue]);

  useEffect(() => {
    const fetchProperty = async () => {
      if (resortId) {
        const data = await axios.get(
          `https://holiday-swap.click/api/v1/properties/getListPropertyActive?resortId=${resortId}`
        );
        setProperties(data?.data);
        setPropertyValue(data?.data[0]?.id);
      }
    };
    fetchProperty();
  }, [resortId]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const formData = new FormData();

    if (data.weekNumber) {
    }

    const coOwnerId = {
      propertyId: data.propertyId as number,
      userId: currentUser.userId as number,
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
    file.forEach((element) => {
      formData.append('contractImages', element);
    });

    const weekNumberRegex = /^(([1-9]|[1-4][0-9]|5[0-2])(,(?!,))?)+$/;

    if (!weekNumberRegex.test(data.weekNumber.trim().split(' ').join(''))) {
      setWeekNumberValue([]);
      setValue('weekNumber', '');
      toast.error('Invalid week number format. Please enter a valid format (e.g., 1, 2, 3).');
      console.log('Check data', data.weekNumber.split(' ').join(''));
      console.log('Regex Test Result:', weekNumberRegex.test(data.weekNumber.trim()));
      setIsLoading(false);
      setOpenModal(false);
    } else {
      axiosAuthClient
        .post('https://holiday-swap.click/api/co-owners', formData)
        .then(() => {
          toast.success('Create ownership success!');
          setOpenModal(false);
          setTypeValue(type[0].type);
          setResortId(dataResort[0]?.id);
          setPropertyValue(null);
          setWeekNumberValue(null);
          setFile([]);
          setIsClearImage(true);
          reset();
          createOwnershipModal.onSuccess();
          createOwnershipModal.onClose();
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
          setIsClearImage(false);
        });
    }
  };

  console.log('Check file', file);

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
                min={new Date().getFullYear()}
                max={new Date().getFullYear() + 25}
                maxLength={4}
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
                min={new Date().getFullYear()}
                max={new Date().getFullYear() + 25}
                maxLength={4}
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
        <InputComponent
          id="weekNumber"
          label="Number of week in a year"
          disabled={isLoading}
          register={register}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeWeekNumberValue(e.target.value)
          }
          errors={errors}
          setValue={setValue}
          required
          tooltipContent="This is the week you own in the year, for example if you own the 6th week in 2023, you enter 6. You can enter multiple weeks by separating the weeks with a comma. For example: 6, 10, 11"
        />
        <InputComponent
          id="roomId"
          label="Apartment ID"
          disabled={isLoading}
          register={register}
          errors={errors}
          setValue={setValue}
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-1">
        <div className="flex flex-row items-center gap-1">
          <label>Contract Image</label>
          <ToolTipCreateOwnership />
        </div>

        <div className="">
          <UploadImageCreateOwnership
            handeChangeNewImages={handeChangeNewImages}
            handleDeleteImage={handleDeleteImage}
            isClearImage={isClearImage}
          />
        </div>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Are you sure create ownership?</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              You will not be able to change information such as contract photos, time of ownership
              and apartment information after creation, please check carefully before creating!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button color="blue" className="font-bold text-lg" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
          <Button color="gray" className="text-lg" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  return (
    <ModalCreate
      disabled={isLoading}
      isOpen={createOwnershipModal.isOpen}
      title="Create Ownership"
      actionLabel="Submit"
      onClose={createOwnershipModal.onClose}
      onSubmit={() => setOpenModal(true)}
      body={bodyContent}
    />
  );
}
