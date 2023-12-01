'use client';

import GetPostById from '@/app/actions/getPostById';
import Container from '@/app/components/Container';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import axios from 'axios';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { FaHeart, FaUser } from 'react-icons/fa6';

interface PostDetailProps {
  postDetail: any;
  currentUser: any;
}

const PostDetail: React.FC<PostDetailProps> = ({ postDetail, currentUser }) => {
  const axiosAuthClient = useAxiosAuthClient();
  const [postDetailValue, setPostDetailValue] = useState<any>(postDetail);
  const { data: session } = useSession();

  const handleLikePost = (postId: any) => {
    if (postId && currentUser) {
      const config = { headers: { Authorization: `Bearer ${session?.user.access_token}` } };
      axios
        .put(
          `https://holiday-swap.click/api/post/react?postId=${postId}&reaction=like`,
          null,
          config
        )
        .then(async () => {
          const userId = currentUser.userId;
          const params = { postId, userId }; // Wrap postId in an object
          const newData = await GetPostById(params);
          if (newData) {
            setPostDetailValue(newData);
          }
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        });
    } else {
      toast.error('You must be login to like post!');
    }
  };

  const handleDislikePost = (postId: any) => {
    if (postId && currentUser) {
      const config = { headers: { Authorization: `Bearer ${session?.user.access_token}` } };
      axios
        .put(
          `https://holiday-swap.click/api/post/react?postId=${postId}&reaction=dislike`,
          null,
          config
        )
        .then(async () => {
          const userId = currentUser.userId;
          const params = { postId, userId }; // Wrap postId in an object
          const newData = await GetPostById(params);
          if (newData) {
            setPostDetailValue(newData);
          }
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        });
    } else {
      toast.error('You must be login to dislike post!');
    }
  };
  console.log('checkc ahksd', postDetailValue);
  return (
    <Container className="py-36">
      <div className="flex flex-row items-center gap-10 px-5">
        <div className="flex flex-col border-2 border-r-gray-400 pr-10 ">
          <div className="text-[30px] font-bold">
            {format(new Date(postDetailValue.datePosted), 'dd')}
          </div>
          <div>{format(new Date(postDetailValue.datePosted), 'MMM')}</div>
        </div>

        <div className="flex flex-row items-center gap-5 w-full">
          <div className="flex flex-row  w-full justify-between items-center">
            <div className="flex flex-row items-center gap-2">
              <Image
                className="rounded-full object-cover"
                width={70}
                height={70}
                src={postDetailValue?.avatar || '/images/placeholder.jpg'}
                alt="Avatar"
              />
              <div>
                <div className="text-[20px] font-bold">{postDetailValue?.userName}</div>
                <div className="text-[15px] text-gray-500">
                  {format(new Date(postDetailValue?.datePosted), 'dd-MM-yyyy')}
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-7 px-32">
              <div className="flex flex-row items-center">
                <BiSolidLike
                  className="hover:cursor-pointer"
                  onClick={() => handleLikePost(postDetailValue?.id)}
                  size={30}
                  color={postDetailValue?.liked === true ? 'blue' : 'gray'}
                />
                <div className="text-lg font-thin ml-1 text-common">{postDetailValue?.likes}</div>
              </div>

              <div className="flex flex-row items-center">
                <BiSolidDislike
                  className="hover:cursor-pointer"
                  onClick={() => handleDislikePost(postDetailValue?.id)}
                  size={30}
                  color={postDetailValue?.disliked === true ? 'red' : 'gray'}
                />
                <div className="text-lg font-thin ml-1 text-common">
                  {postDetailValue?.dislikes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-[40px] font-bold px-36 mt-5">{postDetailValue?.title}</div>
      <div
        className="px-5 md:px-36 py-10"
        dangerouslySetInnerHTML={{ __html: postDetailValue?.content }}
      />

      <div className="flex flex-col">
        <div className="flex flex-row items-center pt-10 pb-5">
          <div className="bg-gray-300 w-full h-[1px]"></div>
          <Image
            className="rounded-full object-cover"
            width={100}
            height={100}
            src={postDetailValue?.avatar || '/images/placeholder.jpg'}
            alt="Avatar"
          />
          <div className="bg-gray-300 w-full h-[1px]"></div>
        </div>
        <div>
          <div className="italic text-center  text-gray-700 text-[18px]">About the author</div>
          <div className="text-[25px]  text-center font-bold">{postDetailValue?.userName}</div>
        </div>
        <div className="text-center">
          There is no better way to learn about the Napa Valley and all it has to offer than on a
          guided tour. There is something for everyone whether you are looking to drink.
        </div>
      </div>
    </Container>
  );
};

export default PostDetail;
