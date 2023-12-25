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
import { format } from 'date-fns';
import { Checkbox, Col, Row } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

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
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}
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
  const [startYear, setStartYear] = useState<any>(new Date().getFullYear());
  const [endYear, setEndYear] = useState<any>(new Date('2000-01-01').getFullYear() + 1);
  const [weekNumberValue, setWeekNumberValue] = useState<any>([]);
  const [weekNumberSingle, setWeekNumberSingle] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const axiosAuthClient = useAxiosAuthClient();
  const [previewImages, setPreviewImages] = useState<{ src: string; index: number }[]>([]);
  const [isClearImage, setIsClearImage] = useState(false);
  const [arrayYear, setArrayYear] = useState<number[]>([]);
  const [arrayYearEnd, setArrayYearEnd] = useState<number[]>([]);

  const range = (start: any, stop: any, step: any) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

  useEffect(() => {
    setArrayYear(
      range(new Date('2000-01-01').getFullYear(), new Date('2000-01-01').getFullYear() + 50, +1)
    );
    setArrayYearEnd(range(new Date().getFullYear(), new Date().getFullYear() + 50, +1));

    if (startYear >= 2023) {
      setArrayYearEnd(range(startYear + 1, startYear + 50, +1));
    }
  }, [startYear]);

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

  useEffect(() => {
    setCustomeValue('propertyId', propertyValue);
  }, [propertyValue]);

  useEffect(() => {
    const fetchDataWhenMount = async () => {
      if (
        !propertyValue &&
        dataResort &&
        (resortId === dataResort[0]?.id || resortId === undefined)
      ) {
        const data = await axios.get(
          `https://holiday-swap.click/api/v1/properties/getListPropertyActive?resortId=${dataResort[0]?.id}`
        );
        setProperties(data?.data);
        setPropertyValue(data?.data[0]?.id);
      }
    };
    fetchDataWhenMount();
  }, [propertyValue, dataResort, resortId]);

  console.log('Check resortId', resortId);

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
  }, [resortId, dataResort]);

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
      propertyId: data.propertyId as number,
      userId: currentUser.userId as number,
      roomId: data.roomId,
      startTime: `${startYear}-01-01`,
      endTime: typeValue === 'DEEDED' ? null : `${endYear}-01-01`,
      type: typeValue,
      timeFrames: checkedList,
    };
    // const coOwnerIdBlob = new Blob([JSON.stringify(coOwnerId)], {
    //   type: 'application/json',
    // });
    const coOwnerBlob = new Blob([JSON.stringify(coOwner)], {
      type: 'application/json',
    });
    // formData.append('coOwnerId', coOwnerIdBlob);
    formData.append('dtoRequest', coOwnerBlob);
    file.forEach((element) => {
      formData.append('contractImages', element);
    });

    const weekNumberRegex = /^(([1-9]|[1-4][0-9]|5[0-2])(,(?!,))?)+$/;

    // if (!weekNumberRegex.test(data.weekNumber.trim().split(' ').join(''))) {
    //   setWeekNumberValue([]);
    //   setValue('weekNumber', '');
    //   toast.error('Invalid week number format. Please enter a valid format (e.g., 1, 2, 3).');
    //   console.log('Regex Test Result:', weekNumberRegex.test(data.weekNumber.trim()));
    //   setIsLoading(false);
    //   setOpenModal(false);
    // } else {
    axiosAuthClient
      .post('https://holiday-swap.click/api/co-owners', formData)
      .then(() => {
        toast.success('Create ownership success!');
        setOpenModal(false);
        setTypeValue(type[0].type);
        setResortId(dataResort[0]?.id);
        setPropertyValue(null);
        setWeekNumberValue(null);
        setCheckedList([]);
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
    // }
  };
  const plainOptions: Option[] = [];
  for (let index = 1; index <= 52; index++) {
    let week = {
      label: index < 10 ? `${index}` : `${index}`,
      value: String(index),
    };
    plainOptions.push(week);
  }
  const defaultCheckedList: CheckboxValueType[] = [];
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions.map((op) => op.value) : []);
  };
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
      <div className="grid grid-cols-2 gap-4">
        <InputComponent
          id="apartmentId"
          label="Apartment ID"
          disabled={isLoading}
          register={register}
          errors={errors}
          setValue={setValue}
          required
        />
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

      {typeValue === 'DEEDED' && (
        <div onClick={handleVisibleCalendar} className="grid grid-cols-1 gap-4">
          <div className={`grid grid-cols-2 `}>
            <div className={`p-2 `}>
              <div className="text-base">Year Next Use</div>

              <Select
                value={startYear}
                className="focus:ring-0 focus:border-0"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setStartYear(Number(e.target.value));
                }}
              >
                {arrayYear.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      )}
      {typeValue === 'RIGHT_TO_USE' && (
        <div onClick={handleVisibleCalendar} className="grid grid-cols-1 gap-4">
          <div className={`grid grid-cols-2 `}>
            <div className={`p-2 `}>
              <div className="text-base">Start year</div>

              <Select
                value={startYear}
                className="focus:ring-0 focus:border-0"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setStartYear(Number(e.target.value));
                }}
              >
                {arrayYear.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>
            <div className={`p-2   `}>
              <div className="text-base">End year</div>

              <Select
                value={endYear}
                className="focus:ring-0 focus:border-0"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setEndYear(Number(e.target.value));
                }}
              >
                {arrayYearEnd.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      )}

      <div className="">
        {/* <InputComponent
          id="weekNumber"
          label="Week number"
          disabled={isLoading}
          register={register}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeWeekNumberValue(e.target.value)
          }
          errors={errors}
          setValue={setValue}
          required
          tooltipContent="This is the week you own in the year, for example if you own the 6th week in 2023, you enter 6. You can enter multiple weeks by separating the weeks with a comma. For example: 6, 10, 11"
        /> */}
        <>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Select all
          </Checkbox>
          <br />
          <div>
            {/* <Checkbox.Group options={plainOptions} value={checkedList} onChange={onChange} /> */}
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange} value={checkedList}>
              <Row gutter={24}>
                {plainOptions.map((e, i) => {
                  return (
                    <Col span={2} key={i}>
                      <Checkbox value={e.value}>{e.label}</Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </div>
        </>
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
            mutiple={true}
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
