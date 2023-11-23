'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Heading from '../Heading';
import Input from '../input/Input';
import Modal from './Modal';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import useEidtResortModal from '@/app/hooks/useEditResortModal';

export default function ModalEditResort() {
  const router = useRouter();
  const editResortModal = useEidtResortModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        editResortModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    editResortModal.onClose();
  }, [editResortModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <Heading title="Wellcome to" />{' '}
        <span className="mx-1 text-2xl font-bold text-black">
          Holiday<span className="text-2xl text-common">Swap</span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    </div>
  );

  const footerContent = (
    <div className="grid grid-cols-1">
      <hr />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>
            First time using{' '}
            <span className="font-bold text-black">
              Holiday<span className="text-common">Swap</span>
            </span>
            ?
          </div>
          <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editResortModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={editResortModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
