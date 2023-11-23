"use client";

import clsx from "clsx";
import { format, formatRelative } from 'date-fns';
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import ImageModal from "./ImageModal";
import { FullMessageType } from '@/app/components/chat/Body';
import { User } from '@/app/actions/UserApis';

type Props = {
  data: FullMessageType;
  isLast?: boolean;
  users?: User[];
  currentUser?: Object | any | null;
};

function MessageBox({ data, isLast, users, currentUser }: Props) {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const user = users?.find((user)=> user?.userId.toString() === data.authorId.toString());

  const isOwn = data?.authorId.toString() === currentUser?.userId.toString();
  // const seenList = (data.seen || [])
  //   .filter((user) => user.email !== data?.sender?.email)
  //   .map((user) => user.username)
  //   .join(", ");

  const container = clsx(`flex gap-3 p-4`, isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx(`flex flex-col gap-2`, isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-200 dark:bg-gray-900",
    "rounded-xl py-1.5 px-2"
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className={container}
    >
      <div className={avatar}>
        <div className="relative">
          <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
            <Image alt="Avatar" src={`${user?.avatar??"/images/placeholder.jpg"}`} fill/>
          </div>
        </div>
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {user?.username===currentUser?.username ? "You" : user?.username}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-500">
            {formatRelative(new Date(data.createdOn), new Date())}
          </div>
        </div>
        <div>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image && (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          )}
        </div>
        <div className={message}>
          {data.text && (
            <div className="max-w-[350px]">{data.text}</div>
          )}
        </div>
        {/*{isLast && isOwn && seenList.length > 0 && (*/}
        {/*  <div className="text-xs font-light text-gray-500 dark:text-gray-400">*/}
        {/*    {`Seen by ${seenList}`}*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </motion.div>
  );
}

export default MessageBox;