'use client';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Heading from '../Heading';
import InputComponent from '../input/Input';
import Modal from './Modal';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { BiArrowBack } from 'react-icons/bi';
import useDeactiveResortModal from '@/app/hooks/useDeactiveResortModal';

export default function ModalDeactiveResort() {
  const router = useRouter();
  const deactiveResortModal = useDeactiveResortModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

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
    if (isForgotPasswordModalOpen) {
    } else {
      signIn('credentials', { ...data, redirect: false }).then(async (callback) => {
        setIsLoading(false);
        if (callback?.ok) {
          toast.success('Logged in');
          router.refresh();
        }

        if (callback?.error) {
          toast.error('Invalid email or password');
        }
      });
    }
  };

  const toggleCreateAccountModal = useCallback(() => {
    setIsForgotPasswordModalOpen(false);
    deactiveResortModal.onClose();
  }, []);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <InputComponent
          register={register}
          label="Start date deactive"
          id="startDateDeactive"
          errors={errors}
        />
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={deactiveResortModal.isOpen}
      title={'Deactive Resort'}
      actionLabel={'Deactive'}
      onClose={deactiveResortModal.onClose}
      onSubmit={deactiveResortModal.onClose}
      body={bodyContent}
    />
  );
}