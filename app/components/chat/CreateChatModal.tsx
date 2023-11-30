'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from './input/Button';
import Input from './input/Input';
import MemberSelect from './input/MemberSelect';
import Modal from './Modal';
import { User } from '@/app/actions/UserApis';
import ConversationApis from '@/app/actions/ConversationApis';
import { useRouter } from 'next/navigation';

type Props = {
  onClose: () => void;
  isOpen?: boolean;
  users?: User[];
  currentUser?: Object | any | null;
  onSuccess: () => void;
};

function GroupChatModal({ users, onClose, isOpen, currentUser, onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    },
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // const updatedMemberArray = [...data.member, Number(currentUser?.userId)];
    ConversationApis.createConversation(data.name, [...data.members?.map((m: {
      value: number,
      label: string,
    }) => m.value), Number(currentUser?.userId)]).then((response) => {
      onSuccess();
      router.refresh();
      onClose();
    }).catch((err) => {
      toast.error('Something went wrong');
    }).finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b- border-gray-900/10 dark:border-gray-300 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900 dark:text-gray-100'>
              Create a Chat
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300'>
              Create a chat with people.
            </p>
            <div className='mt-10 flex flex-col gap-y-8'>
              {members?.length > 1 && <Input
                disabled={isLoading}
                label='Name'
                id='name'
                errors={errors}
                register={register}
              />}
              <MemberSelect
                disabled={isLoading}
                label='Members'
                options={(users && users.length > 0
                  && users?.filter((user) => user.userId.toString() !== currentUser?.userId?.toString())
                    .map((user) => ({
                      value: user.userId,
                      label: user.username,
                      avatar: user?.avatar,
                    }))) || []}
                onChange={(value) =>
                  setValue('members', value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Button
            disabled={isLoading}
            onClick={onClose}
            type='button'
            secondary
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type='submit'>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default GroupChatModal;