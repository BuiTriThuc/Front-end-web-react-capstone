'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/input/Input';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const CreatePropertyView = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const axiosAuthClient = useAxiosAuthClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      propertyViewName: '',
      propertyViewDescription: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const config = { headers: { 'Content-type': 'application/json' } };

    axiosAuthClient
      .post(`/property-view`, data, config)
      .then(() => {
        router.push('/staff/listPropertyView');
        toast.success('Create property view success');
        reset();
      })
      .catch((response) => {
        toast.error(response.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div>
      <div className="">
        <span className="hover:underline" onClick={() => router.push('/staff')}>
          Dashboard
        </span>{' '}
        {'>'} <span className="text-common">Create Property View</span>
      </div>

      <div className="py-10 w-6/12">
        <div className="py-4">
          <Input
            id="propertyViewName"
            label="Property View Name"
            register={register}
            errors={errors}
          />
        </div>
        <div className="py-4">
          <Input
            id="propertyViewDescription"
            label="Property View Description"
            register={register}
            errors={errors}
          />
        </div>

        <div>
          <Button label="Create" onClick={handleSubmit(onSubmit)} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default CreatePropertyView;
