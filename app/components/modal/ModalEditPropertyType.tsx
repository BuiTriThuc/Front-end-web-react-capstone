'use client';

import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import Input from '../input/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Textarea } from 'flowbite-react';
import useEditPropertyTypeModal from '@/app/hooks/useEditPropertyTypeModal';
import UpdatePropertyTypeStaff from '@/app/actions/UpdatePropertyTypeStaff';
import { message } from 'antd';
export default function ModalEditPropertyType() {
  const [isLoading, setIsLoading] = useState(false);
  const editPropertyTypeModal = useEditPropertyTypeModal();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({});
  useEffect(() => {
    setValue('propertyTypeName', editPropertyTypeModal.item.propertyTypeName);
    setValue('propertyTypeDescription', editPropertyTypeModal.item.propertyTypeDescription);
  }, [editPropertyTypeModal.isOpen]);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    UpdatePropertyTypeStaff(editPropertyTypeModal.item.id, {
      propertyTypeName: data.propertyTypeName,
      propertyTypeDescription: data.propertyTypeDescription,
    })
      .then((rs) => {
        editPropertyTypeModal.isSuccess = !editPropertyTypeModal.isSuccess;
        editPropertyTypeModal.onClose();
        message.success('Edit success!.');
      })
      .catch((err) => {
        message.error('Edit Faild!.');
      });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        label="Property Type Name"
        id="propertyTypeName"
        errors={errors}
        register={register}
        placeholder="Input Property Type Name"
        {...register('propertyTypeName')}
      />
      <div className="w-full">
        <div className="mb-2 block">
          <label>Property Type Description</label>
        </div>
        <Textarea
          id="propertyTypeDescription"
          placeholder="Input Property Type Description"
          required
          rows={4}
          {...register('propertyTypeDescription')}
        />
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={editPropertyTypeModal.isOpen}
      title="Edit property type"
      actionLabel="Continue"
      onClose={editPropertyTypeModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}
