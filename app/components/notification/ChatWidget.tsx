"use client";

import React, { useEffect, useState } from 'react';

import Feed from "./Feed";
import Notification from "./Notification";
import MarkAllAsRead from "./MarkAllAsRead";
import EmptyNotification from "./EmptyNotification";
import { useDispatch, useSelector } from 'react-redux';
import { NotificationResponse } from '@/app/components/notification/types';
import { fetchNotifications, removeNotifications } from '@/app/redux/slices/pushNotificationSlice';
import Divider from '@mui/material/Divider';
import { Conversation } from '@/app/actions/ConversationApis';
import { fetchConversations } from '@/app/redux/slices/conversationSlice';
import ConversationBox from '@/app/components/chat/ConversationBox';
import { useRouter } from 'next/navigation';

interface Props {
  currentUser?: Object | any | null;
}
export default function ChatWidget({ currentUser }: Props) {
  const dispatch = useDispatch();
  const conversations = useSelector((state: any) => state.conversation.data);
  const [showFeed, setShowFeed] = useState(false);
  const [conversationsList, setConversationsList] =
    useState(conversations ?? []);
  const router = useRouter();

  useEffect(() => {
    setConversationsList(conversations);
    console.log("conversationList",conversationsList);
  }, [conversations, conversationsList]);


  return (
    <div className="w-[448px] rounded overflow-hidden">
      <header className="bg-white rounded-t border-b dark:bg-zinc-900 py-4 px-6 flex items-center justify-between">
        <span className="font-bold">Messages</span>
      </header>
      <div className="overflow-auto hover:overflow-y-scroll max-h-96 bg-white">
        <Feed>
          {conversationsList && (conversationsList.length !== 0 ? (
            conversationsList.map(
              (item: Conversation, index: number) => (
                <div key={item.conversationId} className={`${index !== 0 && 'border-t'}`}>
                  <ConversationBox
                    key={item.conversationId}
                    data={item}
                    currentUser={currentUser}
                  />
                </div>
              )
            )
          ) : (
            <EmptyNotification />
          ))}
        </Feed>
      </div>
      <footer className="bg-white rounded-b border-t dark:bg-zinc-900 py-2 px-6 flex items-center justify-end">
        <button
          onClick={() => router.push(`/chat`)}
          className="text-red-700 font-bold text-xs hover:text-red-400 hover:border-red-400 p-1 border border-red-700"
        >
          View messages
        </button>
      </footer>
    </div>
  );
}