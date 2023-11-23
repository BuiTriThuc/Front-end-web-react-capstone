'use client';

import useConversation from '@/app/hooks/useConverastion';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import GroupChatModal from '@/app/components/chat/CreateChatModal';
import UserApis, { User, UserResponse } from '@/app/actions/UserApis';
import ConversationApis, { Conversation, Participant } from '@/app/actions/ConversationApis';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Header, Content, Footer, Sider } = Layout;

interface ConversationListProps {
  initialItems: any;
  currentUser?: Object | any | null;
}

const ConversationList: React.FC<ConversationListProps> = ({
                                                             initialItems,
                                                             currentUser,
                                                           }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { conversationId, isOpen } = useConversation();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const conversations = useSelector((state: any) => state.conversation.data);
  const searchInput = useRef<HTMLInputElement>(null);

  const fetchConversationData = useCallback(() => {
    ConversationApis.getCurrentUserConversation().then((res) => {
      const keyword = searchInput?.current?.value;
      const result = keyword ? filterConversationsByKeyword(res, keyword) : res;
      setConversationList(result);
    });
  }, []);

  const handleSearchConversation = (e: any) => {
    const keyword = e.target.value;
    if (keyword) {
      const result = filterConversationsByKeyword(conversationList, keyword);
      setConversationList(result);
    } else {
      fetchConversationData();
    }
  };

  useEffect(() => {
    fetchDataAndSetUsers().catch((err) => {
      console.log(err);
    });
    fetchConversationData();
  }, [fetchConversationData]);

  const fetchDataAndSetUsers = async () => {
    try {
      const membershipRes = await UserApis.getAllMembership();
      setUsers(membershipRes.content);
    } catch (error) {
      console.error('Error fetching membership data:', error);
    }
  };

  const setLatestElement = () => {
    ConversationApis.getCurrentUserConversation().then((res) => {
      const keyword = searchInput?.current?.value;
      const result = keyword ? filterConversationsByKeyword(res, keyword) : res;

      setConversationList(
        result?.length > 1 ? [result[result?.length - 1], ...result?.slice(0, -1)] : result,
      );
    });
  };

  const filterConversationsByKeyword = (conversations: Conversation[], keyword: string) => {
    return conversations.filter(
      (item: Conversation) =>
        item.conversationName?.includes(keyword) ||
        item.participants.find((participant: Participant) => participant?.user?.username?.includes(keyword)),
    );
  };

  useEffect(() => {
    const keyword = searchInput?.current?.value;
    const result = keyword
      ? filterConversationsByKeyword(conversations, keyword)
      : conversations;
    setConversationList(result);
  }, [conversations]);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value: boolean) => setCollapsed(value)}
           collapsedWidth='0'
           theme='light'
           width={384}
           style={{
             backgroundColor: '#f8f8f8',
           }}
    >
      <GroupChatModal
        isOpen={isModelOpen}
        onClose={() => {
          setIsModelOpen(false);
          setLatestElement();
        }}
        users={users}
        currentUser={currentUser}
      />
      <aside
        className={clsx(
          `
                inset-y-0
                pb-20
                lg:pb-0
                lg:left-20
                lg:w-96
                lg:block
                overflow-y-auto
                border-r
                border-gray-200
            `,
          isOpen ? 'hidden' : 'block w-full left-0',
        )}
      >
        <div className='px-5'>
          <div className='flex justify-between mb-4 pt-4'>
            <div className='text-2xl font-bold text-neutral-800'>Chats</div>
            <div onClick={() => setIsModelOpen(true)}
                 className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition'>
              <MdOutlineGroupAdd size={25} />
            </div>
          </div>
          <form className='mb-2.5'>
            <div className='flex'>
              <div className='relative w-full'>
                <input type='search' ref={searchInput} id='search-dropdown' onChange={handleSearchConversation}
                       className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded-l-lg'
                       placeholder='Search ...' required />
                <button type='submit'
                        className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                  <svg className='w-4 h-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none'
                       viewBox='0 0 20 20'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                          d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
                  </svg>
                  <span className='sr-only'>Search</span>
                </button>
              </div>
            </div>
          </form>
          <div className='max-height-conversation-list overflow-y-auto h-screen'>
            {conversationList?.map((item: Conversation) => (
              <ConversationBox
                key={item.conversationId}
                data={item}
                selected={conversationId === item.conversationId.toString()}
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>
      </aside>
    </Sider>
  );
};

export default ConversationList;
