'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Client, Message } from '@stomp/stompjs';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, fetchNotifications } from '@/app/redux/slices/pushNotificationSlice';
import { NotificationResponse } from '@/app/components/notification/types';
import { Conversation, Message as ConversationMessage } from '@/app/actions/ConversationApis';
import { fetchConversations } from '@/app/redux/slices/conversationSlice';

export const useSocket = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: any) => state.pushNotification.data);
  const conversations = useSelector((state: any) => state.conversation.data);
  const [client, setClient] = useState<Client | null>(null);
  const [wsState, setWsState] = useState<'connected' | 'disconnected'>();
  const { data: session } = useSession();
  const accessToken = session?.user?.access_token;

  useEffect(() => {
    if (accessToken) {
      const updatedClient = new Client({
        brokerURL: 'wss:///api.holiday-swap.click/websocket',
        connectHeaders: {
          ['Authorization']: `${accessToken}`,
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });
      setClient(updatedClient);
    }
  }, [accessToken]);

  const killConnection = useCallback(() => {
    if (client) {
      client.deactivate().then(r => {
        setWsState('disconnected');
        console.log('client', 'SOCKET DISCONNECTED...');
      });
    }
  }, [client]);

  const connect = useCallback(() => {
    if (client) {
      try{
        client.activate();
        console.log('client', 'SOCKET CONNECTED...');
      }catch (e:any){
        console.log('e', e);
      }
      client.onConnect = () => {
        setWsState('connected');
        console.log('client', 'SOCKET CONNECTED...');
      };
      client.onStompError = (frame) => {
        setWsState('disconnected');
        console.log('client', 'SOCKET ERROR...');
      };
    }
  }, [client]);

  // useEffect(() => {
  //   if (!client || wsState === 'connected') return;
  //   const timeoutRef = setTimeout(() => {
  //     killConnection();
  //     connect();
  //   }, 2000);
  //   return () => clearTimeout(timeoutRef);
  // }, [client, connect, killConnection, wsState]);

  const subscribeNotifications = useCallback(async (currentUser?: Object | any | null) => {
    if (client) {
      client.onConnect = () => {
        client.subscribe(`/topic/notification-${currentUser?.userId}`, (message: Message) => {
          const newMessage =  JSON.parse(message.body) as NotificationResponse;
          const updatedNotifications = [...notifications, newMessage];
          console.log('RECEIVED MESSAGE FROM NOTIFICATION...');
          console.log(notifications);
          console.log(newMessage);
          console.log(updatedNotifications);
          dispatch(addNotification(newMessage));
        }, {
          ['Authorization']: `${accessToken}`,
        });
      };
    }
  }, [accessToken, client, dispatch, notifications]);

  const subscribeConversation = useCallback(async (conversationIds?: string[]) => {
    if (client) {
      client.onConnect = () => {
        conversationIds?.forEach((conversationId: string) => {
          client.subscribe(`/topic/${conversationId}`, (message) => {
            console.log('RECEIVED MESSAGE FROM CONVERSATION', conversationId);
            const newMessage =  JSON.parse(message.body) as ConversationMessage;
            const updatedConversations = conversations?.map((conversation: Conversation) => {
              if (conversation.conversationId.toString() === conversationId) {
                return {
                  ...conversation,
                  message: newMessage,
                };
              }
              return conversation;
            });
            dispatch(fetchConversations(updatedConversations));
          }, {
            ['Authorization']: `${accessToken}`,
          });
        });
      };
    }
  }, [accessToken, client, conversations, dispatch]);

  useEffect(() => {
    connect();
  }, [connect]);

  return { wsState, subscribeNotifications, connect, killConnection, subscribeConversation };
};