'use client';
import React, { useEffect, useState } from 'react';
import Container from '../../components/Container';
import { FaHeart, FaRegComment, FaUser } from 'react-icons/fa6';
import { Image } from 'antd';

export default function DetailBlogComponents() {
  const [blogContent, setBlogContent] = useState<string>('');

  const fetchBlogContent = () => {
    const blogContentTemp = localStorage.getItem('blogContent');
    setBlogContent(blogContentTemp ?? '');
  };

  useEffect(() => {
    fetchBlogContent();
  }, []);

  return (
    <Container className="py-36">
      <div className="flex flex-row items-center gap-10 px-5">
        <div className="flex flex-col border-2 border-r-gray-400 pr-10 ">
          <div className="text-[30px] font-bold">06</div>
          <div>JUN</div>
        </div>
        <div>
          <div className="flex flex-row items-center gap-5">
            <div className="flex flex-row items-center gap-2">
              <FaUser size={20} />
              <div>KienPT</div>
              <div className="flex flex-row items-center gap-2">
                <FaHeart size={20} />
                <div>1</div>
              </div>
            </div>
          </div>
          {/* <div className="text-[35px] font-bold">Description of winter apartment with sea view</div> */}
        </div>
      </div>

      {/* parse html string to html */}
      <div className="px-5 md:px-36 py-10" dangerouslySetInnerHTML={{ __html: blogContent }} />

      <div className="flex flex-col">
        <div className="flex flex-row items-center pt-10 pb-5">
          <div className="bg-gray-300 w-full h-[1px]"></div>
          <img className="rounded-full w-20 h-20" src="./images/avt.jpg" alt="" />
          <div className="bg-gray-300 w-full h-[1px]"></div>
        </div>
        <div>
          <div className="italic text-center  text-gray-700 text-[18px]">About the author</div>
          <div className="text-[25px]  text-center font-bold">KienPT</div>
        </div>
        <div className="text-center">
          There is no better way to learn about the Napa Valley and all it has to offer than on a
          guided tour. There is something for everyone – whether you are looking to drink.
        </div>
      </div>
      {/* <div className="w-full h-[1px] bg-gray-200 my-10"></div>
      <div className="text-center py-10 text-[20px]">
        <span>1</span> Response
      </div>
      <div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-5">
            <div>
              <img className="w-20 h-20 rounded-full" src="./images/dak-lak.jpg" alt="" />
            </div>
            <div>
              <div className="text-[20px] text-common font-bold">ThucBui</div>
              <div className="italic text-gray-500">July 18, 2023 at 10:04 am</div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-200 rounded-md w-auto h-auto mx-10 mt-4 p-5">
            There is no better way to learn about the Napa Valley and all it has to offer than on a
            guided tour. There is something for everyone – whether you are looking to drink.
          </div>
          <div className="pr-10 flex flex-row w-full justify-end items-end text-[15px] hover:underline cursor-pointer">
            Reply
          </div>
        </div>
      </div>
      <div className="py-10">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-5">
            <div>
              <img className="w-20 h-20 rounded-full" src="./images/dak-lak11.jpg" alt="" />
            </div>
            <div>
              <div className="text-[20px] text-common font-bold">TrongTin</div>
              <div className="italic text-gray-500">July 18, 2023 at 10:04 am</div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-200 rounded-md w-auto h-auto mx-10 mt-4 p-5">
            There is no better way to learn about the Napa Valley and all it has to offer than on a
            guided tour. There is something for everyone – whether you are looking to drink.
          </div>
          <div className="pr-10 flex flex-row w-full justify-end items-end text-[15px] hover:underline cursor-pointer">
            Reply
          </div>
        </div>
        <div className="bg-gray-100 rounded-md w-auto h-auto p-10 my-10">
          <div className="text-center">
            REPLY TO <button className="text-common hover:underline">KienPT</button>
          </div>
          <div className="py-3">
            Logged in as thuc. <button className="text-common hover:underline">Log out?</button>
          </div>
          <textarea
            className="w-full rounded-md"
            placeholder="Comment"
            name=""
            id=""
            cols={10}
            rows={10}
          ></textarea>
          <div className="flex flex-row items-end justify-end">
            <button className="text-white bg-common rounded-md px-5 py-2 hover:bg-blue-600">
              Post comment
            </button>
          </div>
        </div>
      </div> */}
    </Container>
  );
}
