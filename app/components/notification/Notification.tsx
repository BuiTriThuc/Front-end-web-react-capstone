'use client';

import { motion } from 'framer-motion';
import React, { PropsWithChildren, useEffect, useState } from 'react';

import Actions from './NotificationAction';
import Dismiss from './NotificationDismiss';
import IconNotification from './IconNotification';
import { fetchNotifications } from '@/app/redux/slices/pushNotificationSlice';
import { NotificationResponse } from '@/app/components/notification/types';
import { useDispatch, useSelector } from 'react-redux';
import { formatRelative } from 'date-fns';

export interface NotificationProps {
  notificationId: string;
  subject: string | null;
  content: string | null;
  href: null | string;
  createdOn: string;
  isRead: boolean;
  icon: string;

  clicked(notificationId: string): string;

  showFeed: boolean;
}

export default function Notification({
                                       notificationId,
                                       subject,
                                       content,
                                       href,
                                       createdOn,
                                       isRead,
                                       icon,
                                       clicked,
                                       showFeed,
                                     }: PropsWithChildren<NotificationProps>) {
  const dispatch = useDispatch();
  const notification = useSelector((state: any) => state.pushNotification.data);
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
    const updatedNotifications = notification.map((item: NotificationResponse) =>
      item.notificationId.toString() === notificationId
        ? { ...item, isRead: true }
        : item,
    );
    dispatch(fetchNotifications(updatedNotifications));
  };

  const handleClick = () => {
    const x = clicked(notificationId);
    document.getElementById(x)?.classList.add('swiperToRight');
  };

  useEffect(() => {
    if (showFeed) {
      document.querySelectorAll('.notification').forEach((element) => {
        element.classList.add('swiperToRight');
      });
    }
  }, [showFeed]);

  return (
    <div
      id={notificationId.toString()}
      className={`notification dark:bg-notification px-8 py-4 flex items-start gap-6 cursor-pointer ${isRead ? 'bg-gray-100 dark:bg-zinc-800' : 'bg-white'}`}
      onClick={toggleOptions}
    >
      <IconNotification selectedIcon={icon} />
      <div className='flex-1 flex flex-col'>
        <div className='flex justify-between items-center mb-1'>
          <p className='text-sm mb-1.5 font-medium text-gray-900 dark:text-white'>{subject}</p>
          <p className='text-xs text-blue-600 dark:text-blue-500'>
            {formatRelative(new Date(createdOn), new Date())}
          </p>
        </div>
        <div className='flex items-center gap-1 text-sm text-gray-400 dark:text-zinc-400'>
          <span>
            {content}
          </span>
        </div>
      </div>

      {showOptions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.1 } }}
          className='m-auto'
        >
          <Dismiss clicked={handleClick} />
        </motion.div>
      )}
    </div>
  );
}