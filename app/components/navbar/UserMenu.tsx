'use client';

import MenuItem from './MenuItem';
import SignOutMiddle from '@/app/libs/signOut';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import NotificationWidget from '@/app/components/notification/NotificationWidget';
import { useDispatch, useSelector } from 'react-redux';
import NotificationApis from '@/app/actions/NotificationApis';
import { fetchNotifications } from '@/app/redux/slices/pushNotificationSlice';
import { useSocket } from '@/app/hooks/useSocket';
import ChatWidget from '@/app/components/notification/ChatWidget';
import Divider from '@mui/material/Divider';

interface UserMenuProps {
  currentUser?: Object | any | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const dispatch = useDispatch();
  const notification = useSelector((state: any) => state.pushNotification.data);
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const router = useRouter();
  const socket = useSocket();
  useEffect(() => {
    socket.subscribeNotifications(currentUser)
      .catch((err) => {
        console.log('ERROR IN SUBSCRIBE NOTIFICATION', err);
      });
  }, [currentUser, socket]);

  const [notificationsList, setNotificationsList] =
    useState(notification ?? []);
  useEffect(() => {
    setNotificationsList(notification);
    console.log('notificationsList', notificationsList);
  }, [notification, notificationsList]);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const toggleNotificationOpen = useCallback(() => {
    setIsNotificationOpen((value) => !value);
  }, []);
  const toggleMessageOpen = useCallback(() => {
    setIsMessageOpen((value) => !value);
  }, []);

  const handleRouter = (route: string) => {
    router.push(route);
    setIsOpen(false);
  };

  useEffect(() => {
    NotificationApis.getAll().then((res) => {
      dispatch(fetchNotifications(res));
    });
  }, [dispatch]);


  return (
    <>
      <div className='items-center flex flex-row space-x-9 text-gray-500'>
        <div className='cursor-pointer flex items-center' onClick={toggleMessageOpen}>
          <div className='relative'>
            <svg className='w-8 h-8 text-gray-600 animate-wiggle' viewBox='0 0 24 24' fill='none'
                 xmlns='http://www.w3.org/2000/svg'>
              <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
              <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
              <g id='SVGRepo_iconCarrier'>
                <path
                  d='M8 10H16M8 14H16M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z'
                  stroke='#000000' strokeWidth='0.65' strokeLinecap='round' strokeLinejoin='round'></path>
              </g>
            </svg>
            {
              notificationsList && (notificationsList.length > 0 ? (
                <div className='px-1 neutral-100 rounded-full text-center text-gray text-sm absolute -top-3 -end-2'>
                  {1}
                  <div className='absolute top-0 start-0 rounded-full -z-10 animate-ping bg-gray-200 w-full h-full'></div>
                </div>
              ) : '')
            }
          </div>
          <svg className='-mr-1 h-5 w-5 text-gray-400 ml-1.5' viewBox='0 0 20 20' fill='currentColor'
               aria-hidden='true'>
            <path fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                  clipRule='evenodd' />
          </svg>
        </div>

        <div className='cursor-pointer flex items-center' onClick={toggleNotificationOpen}>
          <div className='relative'>
            <svg className='w-8 h-8 text-gray-600 animate-wiggle' xmlns='http://www.w3.org/2000/svg'
                 viewBox='0 0 21 21'>
              <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'
                    d='M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17' />
            </svg>
            {
              notificationsList && (notificationsList.length > 0 ? (
                <div className='px-1 neutral-100 rounded-full text-center text-gray text-sm absolute -top-3 -end-2'>
                  {notification.length}
                  <div className='absolute top-0 start-0 rounded-full -z-10 animate-ping bg-gray-200 w-full h-full'></div>
                </div>
              ) : '')
            }
          </div>
          <svg className='-mr-1 h-5 w-5 text-gray-400 ml-1.5' viewBox='0 0 20 20' fill='currentColor'
               aria-hidden='true'>
            <path fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                  clipRule='evenodd' />
          </svg>
        </div>

        <div
          onClick={toggleOpen}
          className='cursor-pointer flex items-center gap-3'
        >
          <Image
            src='/images/placeholder.jpg'
            alt='Avartar'
            width={50}
            height={50}
            className='rounded-full'
          />
          <div className='text-gray-400'>{currentUser?.username}</div>
        </div>
      </div>

      {isMessageOpen ? (
        <div className='absolute rounded-xl shadow-md bg-white max-h-96 right-20 top-20 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            <Fragment>
              <ChatWidget></ChatWidget>
            </Fragment>
          </div>
        </div>
      ) : (
        ''
      )}


      {isNotificationOpen ? (
        <div className='absolute rounded-xl shadow-md bg-white max-h-96 right-20 top-20 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            <Fragment>
              <NotificationWidget></NotificationWidget>
            </Fragment>
          </div>
        </div>
      ) : (
        ''
      )}

      {isOpen ? (
        <div
          className='absolute rounded-xl shadow-md w-[40vw] md:w-52 bg-white overflow-hidden right-20 top-24 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            <Fragment>
              {(() => {
                if (currentUser?.role.roleId === 1) {
                  return (
                    <MenuItem
                      onClick={() => handleRouter('/admin')}
                      label='Dashboard Admin'
                    />
                  );
                } else if (
                  currentUser?.role.roleId === 2 ||
                  currentUser?.role.roleId === 4
                ) {
                  return (
                    <MenuItem
                      onClick={() => handleRouter('/dashboard')}
                      label='Dashboard'
                    />
                  );
                } else if (currentUser?.role.roleId === 3) {
                  return (
                    <MenuItem
                      onClick={() => handleRouter('/staff')}
                      label='Dashboard Staff'
                    />
                  );
                }
              })()}
              <MenuItem
                onClick={() => handleRouter('/recharge')}
                label='Recharge'
              />
              <hr />
              <MenuItem onClick={() => SignOutMiddle()} label='Logout' />
            </Fragment>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default UserMenu;
