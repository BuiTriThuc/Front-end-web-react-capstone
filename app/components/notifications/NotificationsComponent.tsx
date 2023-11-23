import { Image } from 'antd';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export default function NotificationsComponent() {
  return (
    <div className="flex flex-col items-center pt-52 pb-96 ">
      <div>
        <div className="text-2xl text-common font-bold">Notifications</div>
        <div className="flex flex-row items-center gap-2  px-20 py-10">
          <Image className="rounded-full mr-5" width={60} height={52} src="/images/avt.jpg" />
          <div className="flex flex-row items-center w-full gap-10 ">
            <div>
              <div>Notice of request to rent an apartment from Bui Tri Thuc</div>
              <div>November 4, 2023</div>
            </div>
            <div className="cursor-pointer">
              <AiOutlineClose />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
