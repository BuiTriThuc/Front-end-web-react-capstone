'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import Image from 'next/image';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

interface CardBlogProps {
  post: any;
  currentUser: any;
}

const CardBlog: React.FC<CardBlogProps> = ({ post, currentUser }) => {
  const [postList, setPostList] = useState<any>();
  const axiosAuthClient = useAxiosAuthClient();
  const { data: session } = useSession();

  useEffect(() => {
    if (post) {
      setPostList(post);
    }
  }, [post]);

  const handleLikePost = (postId: any) => {
    if (postId && currentUser) {
      axiosAuthClient
        .put(`https://holiday-swap.click/api/post/react?postId=${postId}&reaction=like`)
        .then(() => {
          toast.success('Like post success');
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
      axiosAuthClient
        .put(`https://holiday-swap.click/api/post/react?postId=${postId}&reaction=dislike`)
        .then(() => {
          toast.success('Like post success');
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        });
    } else {
      toast.error('You must be login to dislike post!');
    }
  };

  return (
    <div className="bg-white w-full h-auto ">
      {postList?.map((item: any, index: number) => (
        <div key={item.id} className="shadow-sm border border-gray-200 rounded-xl mb-10">
          <div className="overflow-hidden object-cover ">
            <img
              src="/images/resort3.jpg"
              alt="img News"
              className="w-[1080px] rounded-t-lg h-[380px] object-cover relative hover:scale-110 hover:transition-transform duration-500 hover:duration-500"
            />
          </div>
          <div className="px-10 my-8 flex flex-col ">
            <div className="flex flex-row items-center justify-between">
              <div className="py-4 flex flex-row gap-2 items-center">
                <Image
                  src={item.avatar}
                  alt="Avatar"
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div className="flex flex-col gap-1">
                  <div className="text-gray-700 text-lg">{item.userName}</div>
                  <div className="text-gray-700 text-base">
                    {format(new Date(item.datePosted), 'MMMM d, yyyy')}
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-7">
                <div className="flex flex-row items-center">
                  <BiSolidLike
                    className="hover:cursor-pointer"
                    onClick={() => handleLikePost(item.id)}
                    size={30}
                    color={item.liked === true ? 'blue' : 'gray'}
                  />
                  <div className="text-lg font-thin ml-1 text-common">{item.likes}</div>
                </div>

                <div className="flex flex-row items-center">
                  <BiSolidDislike
                    className="hover:cursor-pointer"
                    onClick={() => handleDislikePost(item.id)}
                    size={30}
                    color={item.disliked === true ? 'red' : 'gray'}
                  />
                  <div className="text-lg font-thin ml-1 text-common">{item.dislikes}</div>
                </div>
              </div>
            </div>
            <div className="text-[25px] pt-3 pb-5">Pack wisely before traveling</div>
            <div
              className="text-[13px] text-gray-500"
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div>
            <div>
              <Link
                className="bg-[#5C98F2] hover:bg-blue-600  w-[130px] h-[51px] flex flex-row items-center justify-center rounded-md mt-5 text-white font-medium"
                href="./detailblog"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardBlog;
