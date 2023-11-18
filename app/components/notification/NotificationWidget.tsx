"use client";

import { useEffect, useState } from 'react';

import Feed from "./Feed";
import Notification from "./Notification";
import MarkAllAsRead from "./MarkAllAsRead";
import EmptyNotification from "./EmptyNotification";
import { useDispatch, useSelector } from 'react-redux';
import { NotificationResponse } from '@/app/components/notification/types';
import { fetchNotifications, removeNotifications } from '@/app/redux/slices/pushNotificationSlice';
import Divider from '@mui/material/Divider';
import RemoveAll from '@/app/components/notification/RemoveAll';

const notificationsTest2 = [
  {
    id: "2",
    hoursAgo: 1,
    typeNotification: "Chat",
    textNotification: "You have received a message.",
    icon: "Chat",
  },
  {
    id: "3",
    hoursAgo: 1,
    typeNotification: "Chat",
    textNotification: "You have received a message2.",
    icon: "Chat",
  },
];

export default function NotificationWidget() {
  const dispatch = useDispatch();
  const notification = useSelector((state: any) => state.pushNotification.data);
  const [showFeed, setShowFeed] = useState(false);
  const [notificationsList, setNotificationsList] =
    useState(notification??[])

  useEffect(() => {
    setNotificationsList(notification);
    console.log("notificationsList",notificationsList);
  }, [notification, notificationsList]);


  return (
    <div className="w-[448px] rounded overflow-hidden">
      <header className="bg-white dark:bg-zinc-900 py-4 px-6 flex items-center justify-between">
        <span className="font-bold">Notifications</span>
        <RemoveAll
          setAllAsRead={(read: boolean) => {
            setTimeout(() => {
              dispatch(removeNotifications());
              setNotificationsList([]);
            }, 600);
            setShowFeed(read);
          }}
        />
      </header>
      <Divider variant="middle" />
      <div className="overflow-auto hover:overflow-y-scroll max-h-96">
        <Feed>
          {notificationsList && (notificationsList.length !== 0 ? (
            notificationsList.map(
              (item: NotificationResponse) => (
                <Notification
                  clicked={(identificator) => {
                    dispatch(fetchNotifications(notification.filter((item2: NotificationResponse) => item2.notificationId.toString() !== identificator)))
                    setTimeout(() => {
                      setNotificationsList((prev: NotificationResponse[]) =>
                        prev.filter(({ notificationId }) => notificationId.toString() !== identificator)
                      );
                    }, 600);
                    return item?.notificationId?.toString()??"";
                  }}
                  notificationId={item?.notificationId?.toString()??""}
                  key={item.notificationId}
                  createdOn={item.createdOn}
                  icon={"Chat"}
                  subject={item.subject}
                  content={item.content}
                  href={item.href}
                  isRead={item.isRead}
                  showFeed={showFeed}
                />
              )
            )
          ) : (
            <EmptyNotification />
          ))}
        </Feed>
      </div>
      <Divider variant="middle" />
      <footer className="bg-white dark:bg-zinc-900 py-2 px-6 flex items-center justify-end">
        <MarkAllAsRead
          setAllAsRead={(read: boolean) => {
            setTimeout(() => {
              dispatch(removeNotifications());
              setNotificationsList([]);
            }, 600);
            setShowFeed(read);
          }}
        />
      </footer>
    </div>
  );
}