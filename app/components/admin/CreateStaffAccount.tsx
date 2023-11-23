'use client';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import InputMini from '../input/InputMini';
import UploadAvtStaff from './UploadAvtStaff';
import { DatePicker, Image } from 'antd';
import dayjs from 'dayjs';
import { BiBlock } from 'react-icons/bi';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../input/Input';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import toast from 'react-hot-toast';
import { FileInput } from 'flowbite-react';
import { format } from 'date-fns';
import SelectRouterAdmin from './SelectRouterAdmin';

export default function CreateStaffAccount() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<any>(null); // State for storing the preview image
  const router = useRouter();
  const dateFormat = 'YYYY/MM/DD';
  const axiosAuthClient = useAxiosAuthClient();

  const handleChangeFile = (e: any) => {
    if (e) {
      const newFile = e.target.files[0];
      if (newFile) {
        setFile(newFile);

        // Create a preview image URL
        const previewURL = URL.createObjectURL(newFile);
        setPreviewImage(previewURL);
      }
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
      email: '',
      password: '',
      confirmPassword: '',
      avatar: null,
      username: '',
      fullName: '',
      gender: '',
      dob: new Date(),
      phone: '',
      status: 'ACTIVE',
      roleId: 3,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (data.password === data.confirmPassword) {
      const formData = new FormData();

      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('username', data.username);
      formData.append('fullName', data.fullName);
      formData.append('gender', data.gender);
      formData.append('dob', format(data.dob, 'yyyy-MM-dd'));
      formData.append('phone', data.phone);
      formData.append('status', data.status);
      formData.append('roleId', data.roleId);

      const newAvatar = new Blob([JSON.stringify(file)], { type: 'image/jpeg' });
      formData.append('avatar', newAvatar);

      axiosAuthClient
        .post('https://holiday-swap.click/api/v1/users', formData)
        .then(() => {
          toast.success('Create staff success');
          reset();
        })
        .catch((response) => {
          toast.error(response.response.data.error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div>
      <div className="mt-10">
        <span className="hover:underline" onClick={() => router.push('/staff')}>
          Dashboard
        </span>{' '}
        {'>'} <span className="text-common">Create Staff</span>
      </div>
      <SelectRouterAdmin />
      <div className="my-3">
        <div className="text-[20px] font-bold">Fill information of staff</div>
        <div className="pb-2 mt-6">Avatar*</div>
        {previewImage && (
          <div>
            <Image
              width={100}
              height={100}
              className=" rounded-full"
              src={previewImage}
              alt="Avatar Preview"
            />
          </div>
        )}
        <div className="flex flex-row items-center gap-20 w-full ">
          <div className="">
            {/* File input for avatar */}
            <FileInput
              id="avatar"
              {...register('avatar', { required: true })}
              onChange={handleChangeFile}
            />
          </div>

          {/* Display the preview image if available */}

          <div className="flex flex-row items-center rounded-md p-4 border border-gray-600 gap-3">
            <div className="font-bold">Role: </div>
            <div className="flex flex-row items-center gap-1">
              <div>Staff</div>
              <BiBlock />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Input id="email" label="Email" register={register} errors={errors} required />
          <Input id="username" label="Username" register={register} errors={errors} required />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            required
          />

          <Input
            id="confirmPassword"
            label="Confirm password"
            type="password"
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full flex flex-col">
            <div className="py-3">Birth Date*</div>
            <div>
              <DatePicker
                className="p-4 border w-full border-gray-600"
                id="dob"
                defaultValue={dayjs('2001/01/01', dateFormat)}
                format={dateFormat}
              />
            </div>
          </div>
          <div className="w-full flex flex-col">
            <label className="py-3">Gender</label>
            <select
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setCustomValue('gender', e.target.value)
              }
              className="peer  p-4  font-light bg-white border rounded-md outline-none transition disabled:opacity-70"
            >
              <option value="">Any</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input id="fullName" label="Full name" register={register} errors={errors} required />
          <Input id="phone" label="Phone Number" register={register} errors={errors} required />
        </div>
        S
      </div>
      <div className="flex flex-row justify-end w-full py-3">
        <button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="px-6  py-3 bg-common text-white rounded-md"
        >
          Create
        </button>
      </div>
    </div>
  );
}
