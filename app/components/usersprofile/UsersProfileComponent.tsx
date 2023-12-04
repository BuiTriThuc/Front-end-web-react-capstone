'use client';

import Image from 'next/image';
import React from 'react';
import Container from '../Container';
import { BsShieldFillCheck } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import StepsRating from './StepsRating';
import StepsApartment from './StepsApartment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import ConversationApis from '@/app/actions/ConversationApis';

interface UsersProfileComponentProps {
  userDetail: any;
  apartment?: any;
}

const UsersProfileComponent: React.FC<UsersProfileComponentProps> = ({ userDetail, apartment }) => {
  const router = useRouter();
  const params = useSearchParams();
  const rating = JSON.parse(params?.get('rating') as string);

  const handleContactOwner = (ownerId: string) => {
    ConversationApis.getContactWithOwner(ownerId)
      .then((res) => {
        res?.conversationId && router.push(`/chat/${res.conversationId}`);
      })
      .catch((err) => {
        ConversationApis.createCurrentUserConversation(ownerId)
          .then((res) => {
            router.push(`/chat/${res.conversationId}`);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  return (
    <Container className="py-36 bg-white">
      <div className="flex flex-row w-full gap-20">
        <div className="w-[30%] sticky col-span-4 top-[134px] h-full">
          <div className="bg-white shadow-2xl rounded-xl border border-gray-400 py-4 px-3 ">
            <div className="font-bold text-[20px]">
              The information has been confirmed by {userDetail?.fullName}
            </div>
            <div className="items-center grid grid-cols-2 justify-center gap-10">
              <div className="flex flex-col items-center">
                <Image
                  width={100}
                  height={100}
                  className="rounded-full"
                  src={userDetail?.avatar || '/images/placeholder.jpg'}
                  alt="avatar"
                />
                <div className="font-bold text-xl py-3 text-center">{userDetail?.fullName}</div>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <div>
                  <div className="font-bold text-[20px]">{rating.content.length}</div>
                  <div className="text-[12px]">Ratings</div>
                </div>
                <div className="bg-gray-400 w-full h-[1px]"></div>
                <div>
                  <div className="font-bold text-[20px]">12</div>
                  <div className="text-[12px]">Total apartment</div>
                </div>
                <div className="bg-gray-400 w-full h-[1px]"></div>
                <div className="flex flex-row items-center gap-2">
                  <AiOutlineCheck color="green" />
                  <div>Infomation</div>
                </div>
                <div className="bg-gray-400 w-full h-[1px]"></div>
                <div className="flex flex-row items-center gap-2">
                  <AiOutlineCheck color="green" />
                  <div>Email address</div>
                </div>
                <div className="bg-gray-400 w-full h-[1px]"></div>
                <div className="flex flex-row items-center gap-2">
                  <AiOutlineCheck color="green" />
                  <div>Phone number</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[70%] col-span-8">
          <div className="flex flex-row items-center justify-between">
            <div className="text-[25px] font-bold">Infomation about {userDetail?.fullName}</div>
            <div className="mt-5">
              <div
                onClick={() => handleContactOwner(apartment?.user?.userId?.toString())}
                className="hover:bg-hover rounded-md cursor-pointer px-4 py-2 bg-common text-white text-center"
              >
                Contact with owner
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="font-bold">Hi!</div>
            <div className="text-gray-700 w-[70%]">
              I am {userDetail?.fullName}, I am very passionate about traveling everywhere, to meet
              new people, and approach new cultures. Since I have a family and young children, we do
              not have time to travel much anymore, so I host on HolidaySwap to meet people. I hope
              everyone will support me Sincerely thank
            </div>
            <div className="bg-gray-400 w-full h-[1px] my-10"></div>
            {/* <div>
              <div className="font-bold text-[20px]">
                Ratings of <span>Thanh Kien</span>
              </div>
              <StepsRating />
            </div>
            <div className="bg-gray-400 w-full h-[1px] my-10"></div>

            <div>
              <div className="font-bold text-[20px]">
                Apartment for rent by <span>Thanh Kien</span>
              </div>
              <StepsApartment />
            </div> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UsersProfileComponent;
