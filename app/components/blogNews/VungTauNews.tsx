'use client';
import { Image } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';

export default function VungTauNews() {
  const [isHoverdHCM, setIsHoverdHCM] = useState(false);
  const [isHoverDakLak, setIsHoverdDakLak] = useState(false);
  const [isHoverPT, setIsHoverdPT] = useState(false);
  const [isHoverGL, setIsHoverdGL] = useState(false);
  const [isHoverDL, setIsHoverdDL] = useState(false);

  return (
    <div className="pt-32 pb-5 px-2 xl:px-40 flex flex-row justify-center w-full ">
      <div className="flex flex-row justify-between">
        <div className="xl:w-[70%] overflow-y-auto h-[1500px] no-scrollbar">
          <div className="text-[35px] font-bold">Travel to Vung Tau: Guide from A to Z</div>
          <div className="text-gray-400 text-[15px] pt-3">17:06 28/11/2023</div>
          <div className="w-full h-[1px] bg-gray-200 mb-5 mt-1"></div>
          <div className="italic mb-5">
            Vung Tau has long been considered an attractive tourist destination, because of its
            natural beauty. No matter where you go during your trip to Vung Tau , you will be
            fascinated by the scenery here.
          </div>
          <div className="text-[28px] font-bold">
            Travel to Vung Tau: Guide from A to Z (updated with latest information by Holiday
            <span className="text-common">Swap</span>)
          </div>
          <div className="py-3 text-[20px] font-bold">Overview of Vung Tau tourism</div>
          <div>
            Only about a 3-hour drive from Ho Chi Minh City center, with a 20km coastline, Vung Tau
            is one of the favorite destinations of southern tourists. Standing out from the mainland
            like a strip of land, from here, people can see the East Sea both at sunrise and sunset.
            Besides the natural landscape values, Vung Tau is also a land with a long cultural and
            historical tradition.
          </div>
          <div className="py-3">
            <Image src="/images/vung-tau.jpg" />
          </div>
          <div>
            Coming to Vung Tau, you will feel peaceful and comfortable with spacious and airy roads.
            Below is the blue sea, above are big mountains, small mountains, and pure pagodas... All
            create a Vung Tau full of magic, a city of Vung Tau that is not only peaceful and simple
            but also has countless famous places. famous sights.
          </div>
          <div className="text-[20px] font-bold py-3">Climate</div>
          <div>
            Ba Ria - Vung Tau belongs to the tropical monsoon climate zone, the year is divided into
            two distinct seasons: The rainy season starts from May to October, this time there is
            the southwest monsoon; The dry season starts from November to April of the following
            year, this time there is the Northeast monsoon. The average annual temperature is 27°C,
            the lowest month is about 24.8°C, the highest month is about 28.6°C.
          </div>
          <div className="text-[20px] font-bold py-3">Time to travel to Vung Tau</div>
          <div>
            <Image src="/images/vung-tau2.jpg" />
          </div>
          <div>
            In Vung Tau, it is tourist season all year round because the temperature is never too
            cold or too hot. You just need to follow the weather forecast to avoid traveling to Vung
            Tau during storms. In addition, on weekends and holidays, Vung Tau attracts a lot of
            tourists, the prices of services increase.
          </div>
          <div className="font-bold text-[20px] py-3">TRAVEL FROM HO CHI MINH CITY TO VUNG TAU</div>
          <div>
            The coastal city of Vung Tau is far from the city. Ho Chi Minh is only 125km away, a
            great place for your short trip. Currently there are 3 means for backpacking trips:
            riding a motorbike, taking a passenger car or hydrofoil.
          </div>
          <div className="py-3">
            <ul>
              <li className="text-[15px] font-bold">- Motorbike</li>
              <li className="text-[15px] font-bold">- Passenger cars</li>
            </ul>
          </div>
          <div className="text-[20px] font-bold py-3">The main areas of Vung Tau tourism</div>
          <div className="font-bold pt-3 pb-2">Back Beach</div>
          <div>
            <Image src="/images/vung-tau3.jpg" />
          </div>
          <div className="py-3">
            Vung Tau Back Beach is famous for its beautiful coastline and few big waves, with many
            hotels and dining areas. Therefore, most tourists when traveling to Vung Tau like to
            stay at Back Beach. The back beach also has a famous Thuy Van street similar to Tran Phu
            street in Nha Trang, there are many hotels from affordable to high-end located on this
            road.
          </div>
          <div className="font-bold pt-3 pb-2">Beach front</div>
          <div>
            <Image src="/images/vung-tau4.jpg" />
          </div>
          <div className="py-3">
            The center of Vung Tau city is located at Front Beach, where there are many high-rise
            buildings and busy shopping areas. Tourists often choose beaches in the Back Beach area
            because Front Beach is more polluted due to the density of population and tourists.
            However, Front Beach will be the ideal place for you to watch the sunset or go for a
            walk.
          </div>
          <div className="font-bold mt-3">Long Hai</div>
          <div>
            <Image className="py-3" src="/images/vung-tau5.jpg" />
          </div>
          <div className="">
            About 110km northeast of Ho Chi Minh City (equivalent to about 2 - 2.5 hours by
            motorbike), Long Hai Beach is a favorite vacation destination for many tourists. Long
            Hai has a beautiful beach with clear blue water, long stretches of golden sand and
            resorts near the sea. In particular, Long Hai beach has many fresh seafood at quite
            cheap prices. Binh Chau hot spring is located on the Long Hai tourist route, also an
            interesting stop for tourists.
          </div>
          <div className="font-bold mt-3">Con Dao</div>
          <div>
            <Image className="py-3" src="/images/vung-tau6.jpg" />
          </div>
          <div>
            Con Dao is famous for its clear beaches, green coconut trees and white sand beaches that
            can captivate any tourist. It is easy to understand why Con Dao attracts so many
            domestic and foreign tourists to enjoy. With wild beauty and not much affected by the
            tourism industry, Con Dao is truly a rare tourist paradise in Vietnam.
          </div>
          <div className="font-bold mt-3">Vung Tau Museum</div>
          <div>
            <Image className="py-3" src="/images/vung-tau7.jpg" />
          </div>
          <div>
            Vung Tau Museum, also known by its full name, &quotBa Ria - Vung Tau Museum&quot, is
            located at 04 Tran Phu Street, Ward 1, Vung Tau City. This is a modern architectural
            work and a special cultural facility, which preserves the historical - cultural - social
            values ​​of Ba Ria - Vung Tau province from past to present.
          </div>
          <div className="font-bold mt-3">Statue of God with outstretched arms</div>
          <div>
            <Image className="py-3" src="/images/vung-tau8.jpg" />
          </div>
          <div>
            Statue of Christ or Statue of God with arms outstretched standing on top of Nho Mountain
            in Vung Tau city, built in 1974. This statue is 32 m high, with an arm span of 18.3 m at
            a height of 170 m overlooking the sea. , inside there is a staircase of 133 steps up to
            the two arms of the statue. The statue can be seen as a similar version of the statue of
            Christ with arms outstretched in the city of Rio de Janeiro in Brazil.
          </div>
        </div>
        <div className=" hidden lg:hidden md:hidden xl:h-[1300px] xl:block ">
          <Link
            href="/news/hcmnews"
            className="flex flex-row items-end justify-center min-w-auto mb-5"
            onMouseEnter={() => setIsHoverdHCM(true)}
            onMouseLeave={() => setIsHoverdHCM(false)}
          >
            <div className={isHoverdHCM ? 'opacity-90' : ''}>
              <img
                src="/images/ho-chi-minh.jpeg"
                alt="destination"
                height={421}
                width={600}
                className=" w-[300px] h-[450px] object-cover rounded-xl relative"
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
                    <span className="flex items-center justify-center text-[15px] w-full text-center  md:flex md:justify-center md:w-[200px] md:text-center lg:flex lg:justify-center lg:w-[300px] lg:text-center xl:flex xl:justify-center xl:w-auto xl:text-center xl:px-4">
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
            href="/news/daklaknews"
            className="flex flex-row items-end justify-center min-w-auto mb-5"
            onMouseEnter={() => setIsHoverdDakLak(true)}
            onMouseLeave={() => setIsHoverdDakLak(false)}
          >
            <div className={isHoverDakLak ? 'opacity-90' : ''}>
              <img
                src="/images/dak-lak.jpg"
                alt="destination"
                height={421}
                width={600}
                className=" w-[300px] h-[450px] object-cover rounded-xl relative"
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
                    <span className="flex items-center justify-center text-[15px] w-full text-center  md:flex md:justify-center md:w-[200px] md:text-center lg:flex lg:justify-center lg:w-[300px] lg:text-center xl:flex xl:justify-center xl:w-auto xl:text-center xl:px-4">
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
              <img
                src="/images/phan-thiet.jpg"
                alt="destination"
                height={421}
                width={600}
                className=" w-[300px] h-[450px] object-cover rounded-xl relative"
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
                    <span className="flex items-center justify-center text-[15px] w-full text-center  md:flex md:justify-center md:w-[200px] md:text-center lg:flex lg:justify-center lg:w-[300px] lg:text-center xl:flex xl:justify-center xl:w-auto xl:text-center xl:px-4">
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
        </div>
      </div>
    </div>
  );
}
