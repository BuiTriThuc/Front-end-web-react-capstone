"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

import ProfileDrawer from "./ProfileDrawer";
import Image from 'next/image';
import { Conversation, Participant } from '@/app/actions/ConversationApis';
import AvatarGroup from '@/app/components/chat/AvatarGroup';

type Props = {
  conversation: Conversation;
  currentUser?: Object | any | null;
};

function Header({ conversation, currentUser }: Props) {
  const otherUser = conversation?.participants?.filter((user: Participant) => user.user.userId !== currentUser?.userId)??[];
  const members = conversation?.participants;
  const isActive = true;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation?.participants?.length>2) {
      return `${conversation?.participants?.length} Members`;
    }

    return isActive ? "" : "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        currentUser={currentUser}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white dark:bg-black w-full flex border-b-[1px] dark:border-b-gray-600 sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/chat"
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation?.participants?.length>2 ? (
            <AvatarGroup name={conversation?.conversationName || otherUser[0]?.user?.username} />
          ) : (
            <div className="relative">
              <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
                <Image alt="Avatar" src={`${conversation?.participants?.find(user => user?.user?.userId !== currentUser?.userId)?.user?.avatar??"/images/placeholder.jpg"}`} fill/>
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <div>{conversation?.conversationName || otherUser[0]?.user?.username}</div>
            <div className="text-sm font-light text-neutral-500 dark:text-neutral-300">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
        />
      </div>
    </>
  );
}

export default Header;