'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import Input from '../input/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Textarea, Label } from 'flowbite-react';
import useEditPropertyTypeModal from '@/app/hooks/useEditPropertyTypeModal';

export default function ModalEditPropertyType() {
  const [isLoading, setIsLoading] = useState(false);
  const editPropertyTypeModal = useEditPropertyTypeModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {};
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input label="Property Type Name" id="propertyTypeName" errors={errors} register={register} />
      <div className="w-full">
        <div className="mb-2 block">
          <label>Property Type Description</label>
        </div>
        <Textarea
          id="propertyTypeDescription"
          placeholder="Leave a comment..."
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
