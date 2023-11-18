"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import { Conversation } from '@/app/actions/ConversationApis';
import AvatarGroup from '@/app/components/chat/AvatarGroup';

interface ConversationBoxProps {
  data: Conversation;
  selected?: boolean;
  currentUser?: Object | any | null;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
  currentUser,
}) => {
  const router = useRouter();

  const hasSeen = useMemo(() => {
      return false;
  }, []);
  const handleClick = useCallback(() => {
    router.push(`/chat/${data.conversationId}`);
  }, [data.conversationId, router]);


  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
                mb-2
                w-full
                relative
                flex
                items-center
                space-x-3
                hover:bg-neutral-100
                rounded-lg
                transition
                cursor-pointer
                p-3
                gap-y-3
            `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        {data?.participants?.length > 2 ? (
          <AvatarGroup name={data.conversationName} />
        ) : (
          <Image alt="Avatar" src={`${data.participants.find(user => user.user.userId !== currentUser?.userId)?.user?.avatar??"/images/placeholder.jpg"}`} fill/>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">{data?.participants?.length > 2
              ? data.conversationName
              : data.participants.find(user => user.user.userId !== currentUser?.userId)?.user?.username
            }</p>
            {data?.message?.createdOn && (
              <p className="text-xs text-gray-400 font-light ">
                {format(new Date(data?.message?.createdOn), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen
                ? "text-gray-500 dark:text-gray-400"
                : "text-black dark:text-white font-medium"
            )}
          >
            {data?.message?.authorId && data?.participants?.length > 2 && (
              data.message.authorId === currentUser?.userId
                ? "You: "
                : (data.participants.find(user => user.user.userId === data.message.authorId)?.user?.username ?? "") + ": "
            )}{data?.message?.text ?? "Started a Conversation"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
