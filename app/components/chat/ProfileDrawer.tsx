"use client";

import { Dialog, Transition } from "@headlessui/react";
import { format } from "date-fns";
import React, { Fragment, useMemo, useState } from "react";
import { IoClose, IoExitOutline, IoRemoveCircle } from "react-icons/io5";

import ConfirmLeaveModal from "./ConfirmLeaveModal";
import AvatarGroup from '@/app/components/chat/AvatarGroup';
import Image from 'next/image';
import { Conversation } from '@/app/actions/ConversationApis';
import ConfirmBlockModal from '@/app/components/chat/ConfirmBlockModal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation;
  currentUser?: Object | any | null;
};

function ProfileDrawer({ isOpen, onClose, data, currentUser }: Props) {
  const otherUser = data?.participants?.filter(user => user?.user?.userId !== currentUser?.userId);
  const members = data?.participants;
  const isActive = true;
  const [confirmLeaveOpen, setConfirmLeaveOpen] = useState(false);
  const [confirmBlockOpen, setConfirmBlockOpen] = useState(false);

  const joinDate = useMemo(() => {
    return format(new Date(data?.creationDate), "PP");
  }, [data?.creationDate]);

  const title = useMemo(() => {
    return data?.conversationName || otherUser[0]?.user?.username;
  }, [data?.conversationName, otherUser]);

  const statusText = useMemo(() => {
    if (data?.participants?.length>2) {
      return `${data?.participants?.length} Members`;
    }

    return isActive ? "" : "Offline";
  }, [data, isActive]);

  return (
    <>
      <ConfirmLeaveModal
        isOpen={confirmLeaveOpen}
        onClose={() => {
          setConfirmLeaveOpen(false);
        }}
      />
      <ConfirmBlockModal
        isOpen={confirmBlockOpen}
        userId={otherUser[0]?.user?.userId?.toString()}
        username={otherUser[0]?.user?.username}
        onClose={() => {
          setConfirmBlockOpen(false);
        }}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-black py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white dark:bg-black text-gray-400 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={onClose}
                            >
                              <span className="sr-only">Close panel</span>
                              <IoClose size={24} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            {data?.participants?.length>2 ? (
                              <AvatarGroup name={data?.conversationName || otherUser[0]?.user?.username} />
                            ) : (
                              <div className="relative">
                                <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
                                  <Image alt="Avatar" src={`${data?.participants?.find(user => user?.user?.userId !== currentUser?.userId)?.user?.avatar??"/images/placeholder.jpg"}`} fill/>
                                </div>
                              </div>
                            )}
                          </div>
                          <div>{title}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {statusText}
                          </div>
                          <div className="flex flex-row gap-4">
                            <div className="flex gap-10 my-8">
                              <div
                                onClick={() => setConfirmLeaveOpen(true)}
                                className="flex flex-col gap-2 items-center cursor-pointer hover:opacity-75"
                              >
                                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center">
                                  <IoExitOutline size={20} />
                                </div>
                                <div className="text-sm font-light text-neutral-600 dark:text-neutral-300">
                                  Leave
                                </div>
                              </div>
                            </div>

                            {data?.participants?.length<=2 && <div className="flex gap-10 my-8">
                              <div
                                onClick={() => setConfirmBlockOpen(true)}
                                className="flex flex-col gap-2 items-center cursor-pointer hover:opacity-75"
                              >
                                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center">
                                  <IoRemoveCircle size={20} />
                                </div>
                                <div className="text-sm font-light text-neutral-600 dark:text-neutral-300">
                                  Block
                                </div>
                              </div>
                            </div>}
                          </div>
                          <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              {data?.participants?.length>2 && (
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 sm:w-40 sm:flex-shrink-0">
                                    Members:
                                  </dt>
                                  {/*<dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">*/}
                                  {/*  {data?.participants*/}
                                  {/*    .map((user) => user?.user?.email)*/}
                                  {/*    .join(", ")}*/}
                                  {/*</dd>*/}
                                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">
                                    {data?.participants
                                      .map((user) => (<div key={`${user?.user?.userId}`} style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className='relative inline-block rounded-full overflow-hidden h-8 w-8 md:h-10 md:w-10 mb-2'>
                                          <Image alt='Avatar' src={`${user?.user?.avatar ?? '/images/placeholder.jpg'}`} fill />
                                        </div>
                                        <span style={{ marginLeft: 8 }}>{user?.user?.username}</span>
                                      </div>))}
                                  </dd>
                                </div>
                              )}
                              {!(data?.participants?.length>2) && (
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 sm:w-40 sm:flex-shrink-0">
                                    Email
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">
                                    {otherUser[0]?.user.email}
                                  </dd>
                                </div>
                              )}
                              {!(data?.participants?.length>2) && (
                                <>
                                  <hr />
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 sm:w-40 sm:flex-shrink-0">
                                      Joined
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">
                                      <time dateTime={joinDate}>
                                        {joinDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default ProfileDrawer;