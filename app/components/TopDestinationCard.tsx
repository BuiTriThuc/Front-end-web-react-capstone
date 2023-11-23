'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const TopDestinationCard = () => {
  const [isHoverdVT, setIsHoverdVT] = useState(false);
  const [isHoverdHCM, setIsHoverdHCM] = useState(false);
  const [isHoverDakLak, setIsHoverdDakLak] = useState(false);
  const [isHoverPT, setIsHoverdPT] = useState(false);
  const [isHoverGL, setIsHoverdGL] = useState(false);
  const [isHoverDL, setIsHoverdDL] = useState(false);

  return (
    <div className="flex flex-col gap-5 mt-10">
      <div className="flex flex-col gap-5 md:flex-row md:gap-5 xl:gap-8">
        <Link
          href="/news/vungtaunews"
          className="flex flex-row items-end justify-center min-w-auto"
          onMouseEnter={() => setIsHoverdVT(true)}
          onMouseLeave={() => setIsHoverdVT(false)}
        >
          <div className={isHoverdVT ? 'opacity-90' : ''}>
            <Image
              src="/images/vung-tau.jpg"
              alt="destination"
              height={421}
              width={600}
              className=" w-[600px] h-[230px] object-cover rounded-xl relative"
            />
          </div>

          <div
            className={`text-white md:text-3xl md:px-[153px] text-lg px-[80px] flex flex-col items-center font-bold absolute ${
              isHoverdVT ? '-translate-y-14 duration-300' : 'translate-y-0 duration-300'
            }`}
          >
            {isHoverdVT ? (
              <>
                <span>Vung Tau</span>
                <div className="text-base font-light text-white flex flex-col justify-center items-center">
                  <span className="flex items-center justify-center text-[15px] w-full  text-center md:flex md:justify-center md:w-[200px] md:text-center lg:flex lg:justify-center lg:w-[300px] lg:text-center xl:flex xl:justify-center xl:w-[350px] xl:text-center">
                    Far far away, behind the word mountains, far from the countries Vokalia and
                    Consonantia,…
                  </span>
                  <span className="cursor-pointer text-sky-500 hover:text-sky-600">
                    View destination
                  </span>
                </div>
              </>
            ) : (
              <span className="pb-8 w-[200px] text-center">Vung Tau</span>
            )}
          </div>
        </Link>
        <Link
          href="/news/hcmnews"
          className="flex flex-row items-end justify-center min-w-auto"
          onMouseEnter={() => setIsHoverdHCM(true)}
          onMouseLeave={() => setIsHoverdHCM(false)}
        >
          <div className={isHoverdHCM ? 'opacity-90' : ''}>
            <Image
              src="/images/ho-chi-minh.jpeg"
              alt="destination"
              height={421}
              width={600}
              className=" w-[600px] h-[230px] object-cover rounded-xl relative"
            />
          </div>

          <div
            className={`text-white md:text-3xl md:px-[153px] text-lg px-[80px] flex flex-col items-center font-bold absolute ${
              isHoverdHCM ? '-translate-y-14 duration-300' : 'translate-y-0 duration-300'
            }`}
          >
            {isHoverdHCM ? (
              <div className="flex flex-col items-center justify-center ">
                <span>Ho Chi Minh</span>
                <div className="text-base font-light text-white flex flex-col justify-center items-center">
                  <span className="flex items-center justify-center text-[15px] w-full text-center  md:flex md:justify-center md:w-[200px] md:text-center lg:flex lg:justify-center lg:w-[300px] lg:text-center xl:flex xl:justify-center xl:w-[350px] xl:text-center">
                    Far far away, behind the word mountains, far from the countries Vokalia and
                    Consonantia,…
                  </span>
                  <span className="cursor-pointer text-sky-500 hover:text-sky-600">
                    View destination
                  </span>
                </div>
              </div>
            ) : (
              <span className="pb-8">Ho Chi Minh</span>
            )}
          </div>
        </Link>
        <Link
          href="/news/dalatnews"
          className="flex flex-row items-end justify-center min-w-auto"
          onMouseEnter={() => setIsHoverdDL(true)}
          onMouseLeave={() => setIsHoverdDL(false)}
        >
          <div className={isHoverDL ? 'opacity-90' : ''}>
            <Image
              src="/images/da-lat.jpg"
              alt="destination"
              height={421}
              width={600}
              className=" w-[600px] h-[230px] object-cover rounded-xl relative"
            />
          </div>

          <div
            className={`text-white md:text-3xl md:px-[153px] text-lg px-[80px] flex flex-col items-center font-bold absolute ${
              isHoverDL ? '-translate-y-14 duration-300' : 'translate-y-0 duration-300'
            }`}
          >
            {isHoverDL ? (
              <>
                <span>Da Lat</span>
                <div className="text-base font-light text-white flex flex-col justify-center items-center">
                  <span className="flex items-center justify-center text-[15px] w-full text-center  md:flex md:justify-center md:w-[200px] md:text-center lg:flex lg:justify-center lg:w-[300px] lg:text-center xl:flex xl:justify-center xl:w-[350px] xl:text-center">
                    Far far away, behind the word mountains, far from the countries Vokalia and
                    Consonantia,…
                  </span>
                  <span className="cursor-pointer text-sky-500 hover:text-sky-600">
                    View destination
                  </span>
                </div>
              </>
            ) : (
              <span className="pb-8 w-[200px] text-center">Da Lat</span>
            )}
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:gap-5 xl:gap-8">
        <Link
          href="/news/daklaknews"
          className="flex flex-row items-end justify-center min-w-auto"
          onMouseEnter={() => setIsHoverdDakLak(true)}
          onMouseLeave={() => setIsHoverdDakLak(false)}
        >
          <div className={isHoverDakLak ? 'opacity-90' : ''}>
            <Image
              src="/images/dak-lak.jpg"
              alt="destination"
              height={421}
              width={600}
              className=" w-[600px] h-[230px] object-cover rounded-xl relative"
            />
          </div>

          <div
            className={`text-white md:text-3xl md:px-[153px] text-lg px-[80px] flex flex-col items-center font-bold absolute ${
              isHoverDakLak ? '-translate-y-14 duration-300' : 'translate-y-0 duration-300'
            }`}
          >
            {isHoverDakLak ? (
              <>
                <span>Dak Lak</span>
                <div className="text-base font-light text-white flex flex-col justify-center items-center">
                  <span className="flex items-center justify-center text-[15px] w-full text-center  md:flex md:justify-center md:w-[200px] md:text-center lg:flex lg:justify-center lg:w-[300px] lg:text-center xl:flex xl:justify-center xl:w-[350px] xl:text-center">
                    Far far away, behind the word mountains, far from the countries Vokalia and
                    Consonantia,…
                  </span>
                  <span className="cursor-pointer text-sky-500 hover:text-sky-600">
                    View destination
                  </span>
                </div>
              </>
            ) : (
              <span className="pb-8 w-[200px] text-center">Dak Lak</span>
            )}
          </div>
        </Link>
        <Link
          href="/news/phanthietnews"
          className="flex flex-row items-end justify-center min-w-auto"
          onMouseEnter={() => setIsHoverdPT(true)}
          onMouseLeave={() => setIsHoverdPT(false)}
        >
          <div className={isHoverPT ? 'opacity-90' : ''}>
            <Image
              src="/images/phan-thiet.jpg"
              alt="destination"
              height={421}
              width={600}
              className=" w-[600px] h-[230px] object-cover rounded-xl relative"
            />
          </div>

          <div
            className={`text-white md:text-3xl md:px-[153px] text-lg px-[80px] flex flex-col items-center font-bold absolute ${
              isHoverPT ? '-translate-y-14 duration-300' : 'translate-y-0 duration-300'
            }`}
          >
            {isHoverPT ? (
              <>
                <span>Phan Thiet</span>
                <div className="text-base font-light text-white flex flex-col justify-center items-center">
                  <span className="flex items-center justify-center text-[15px] w-full text-center  md:flex md:justify-center md:w-[200px] md:text-center lg:flex lg:justify-center lg:w-[300px] lg:text-center xl:flex xl:justify-center xl:w-[350px] xl:text-center">
                    Far far away, behind the word mountains, far from the countries Vokalia and
                    Consonantia,…
                  </span>
                  <span className="cursor-pointer text-sky-500 hover:text-sky-600">
                    View destination
                  </span>
                </div>
              </>
            ) : (
              <span className="pb-8">Phan Thiet</span>
            )}
          </div>
        </Link>
        <Link
          href="/news/gialainews"
          className="flex flex-row items-end justify-center min-w-auto"
          onMouseEnter={() => setIsHoverdGL(true)}
          onMouseLeave={() => setIsHoverdGL(false)}
        >
          <div className={isHoverGL ? 'opacity-90' : ''}>
            <Image
              src="/images/gia-lai-img.jpg"
              alt="destination"
              height={421}
              width={600}
              className=" w-[600px] h-[230px] object-cover rounded-xl relative"
            />
          </div>

          <div
            className={`text-white md:text-3xl md:px-[153px] text-lg px-[80px] flex flex-col items-center font-bold absolute ${
              isHoverGL ? '-translate-y-14 duration-300' : 'translate-y-0 duration-300'
            }`}
          >
            {isHoverGL ? (
              <>
                <span>Gia Lai</span>
                <div className="text-base font-light text-white flex flex-col justify-center items-center">
                  <span className="flex items-center justify-center text-[15px] w-full text-center  md:flex md:justify-center md:w-[200px] md:text-center lg:flex lg:justify-center lg:w-[300px] lg:text-center xl:flex xl:justify-center xl:w-[350px] xl:text-center">
                    Far far away, behind the word mountains, far from the countries Vokalia and
                    Consonantia,…
                  </span>
                  <span className="cursor-pointer text-sky-500 hover:text-sky-600">
                    View destination
                  </span>
                </div>
              </>
            ) : (
              <span className="pb-8 w-[200px] text-center">Gia Lai</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopDestinationCard;
