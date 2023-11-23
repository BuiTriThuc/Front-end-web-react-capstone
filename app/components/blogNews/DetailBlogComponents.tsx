'use client';
import React, { useState } from 'react';
import Container from '../Container';
import { FaHeart, FaRegComment, FaRegUser, FaUser } from 'react-icons/fa6';
import { Image } from 'antd';
import { AiOutlineLike } from 'react-icons/ai';

export default function DetailBlogComponents() {
  const [likeCount, setLikeCount] = useState(1); // Initial like count
  const [liked, setLiked] = useState(false); // Initial like state

  const handleLikeClick = () => {
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    setLiked(!liked);
  };

  return (
    <Container className="py-36">
      <div className="px-5 md:px-36 flex flex-row items-center justify-between">
        <div>
          <div className="text-[35px] font-bold">Description of winter apartment with sea view</div>
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row items-center gap-1">
              <FaRegUser size={20} />
              <div>KienPT</div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 mt-2">
            <div className="text-gray-500">11/12/2023</div>
            <div>-</div>
            <div className="text-gray-500">17:30</div>
          </div>
        </div>
        <button className="flex flex-row items-center gap-1" onClick={handleLikeClick}>
          <FaHeart size={30} color={liked ? 'red' : 'black'} />
          <div className="text-[25px]">{likeCount}</div>
        </button>
      </div>
      <div className="px-5 md:px-36 py-10">
        <div>
          <Image
            width={'100%'}
            height={'100%'}
            className="w-full h-auto"
            src="/images/vung-tau.jpg"
            alt=""
          />
        </div>
        <div>
          A wonderful serenity has taken possession of my entire soul, like these sweet mornings of
          spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in
          this spot, which was created for the bliss of souls like mine. I am so happy, my dear
          friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my
          talents. I should be incapable of drawing a single stroke at the present moment; and yet I
          feel that I never was a greater artist than now.
        </div>
        <div className="py-5 text-[20px] font-bold">When, while the lovely valley teems with</div>
        <div>
          vapour around me, and the meridian sun strikes the upper surface of the impenetrable
          foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw
          myself down among the tall grass by the trickling stream; and, as I lie close to the
          earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little
          world among the stalks, and grow familiar with the countless indescribable forms of the
          insects and flies, then I feel the presence of the Almighty, who formed us in his own
          image, and the breath of that universal love which bears and sustains us, as it floats
          around us in an eternity of blist.
        </div>
        <div>
          I sink under the weight of the splendour of these visions!A wonderful serenity has taken
          possession of my entire soul, like these sweet mornings of spring which I enjoy with my
          whole heart. I am alone, and feel the charm of existence in this spot, which was created
          for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquis
        </div>
        <div className="py-5 text-[20px] font-bold">I throw myself down among the tall grass</div>
        <div>
          I should be incapable of drawing a single stroke at the present moment; and yet I feel
          that I never was a greater artist than now. When, while the lovely valley teems with
          vapour around me, and the meridian sun strikes the upper surface of the impenetrable
          foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw
          myself down among the tall grass by the trickling stream; and, as I lie close to the
          earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little
          world among the stalks, and grow familiar with the countless indescribable forms of the
          insects and
        </div>
        <div className="grid grid-cols-2 gap-5 py-5">
          <Image width={'100%'} height={'100%'} src="/images/vung-tau2.jpg" alt="img" />
          <Image width={'100%'} height={'100%'} src="/images/vung-tau3.jpg" alt="img" />
        </div>
        <div>
          Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
          there live the blind texts. Separated they live in Bookmarksgrove right at the coast of
          the Semantics, a large language ocean. A small river named Duden flows by their place and
          supplies it with the necessary regelialia. It is a paradisematic country, in which roasted
          parts of sentences fly into your mouth. Even the all-powerful Pointing has no control
          about the blind texts it is an almost unorthographic life One day however a small line of
          blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The
          Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild
          Question Marks and devious Semikoli, but the Littl
        </div>
        <div className="py-5">
          <div>- Far far away, behind the word mountain</div>
          <div>- When she reached the first hills</div>
          <div>- A small river named Duden flows</div>
          <div>- A small river named Duden flows by their plat.</div>
          <div>- Far far away, behind the word mountain</div>
        </div>
        <div>
          Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their
          agency, where they abused her for their projects again and again. And if she has not been
          rewritten, then they are still using her.Far far away, behind the word mountains, far from
          the countries Vokalia and Consonantia, there live the blind texts. Separated they live in
          Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river
          named Duden flows by their plate.
        </div>
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
              There is no better way to learn about the Napa Valley and all it has to offer than on
              a guided tour. There is something for everyone – whether you are looking to drink.
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
              There is no better way to learn about the Napa Valley and all it has to offer than on
              a guided tour. There is something for everyone – whether you are looking to drink.
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
      </div>
    </Container>
  );
}
