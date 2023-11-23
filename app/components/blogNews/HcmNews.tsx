'use client';
import { Image } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';

export default function HcmNewsComponent() {
  const [isHoverDakLak, setIsHoverdDakLak] = useState(false);
  const [isHoverPT, setIsHoverdPT] = useState(false);
  const [isHoverdVT, setIsHoverdVT] = useState(false);

  return (
    <div className="pt-32 pb-5 px-2 xl:px-40 flex flex-row justify-center w-full ">
      <div className="flex flex-row justify-between">
        <div className="xl:w-[70%] overflow-y-auto h-[1500px] no-scrollbar">
          <div className="text-[35px] font-bold">Travel to Ho Chi Minh city: Guide from A to Z</div>
          <div className="text-gray-400 text-[15px] pt-3">17:06 28/11/2023</div>
          <div className="w-full h-[1px] bg-gray-200 mb-5 mt-1"></div>
          <div className="italic mb-5">
            <span className="text-common">HolidaySwap</span> introduces the most complete and
            concise Saigon travel guide, introducing delicious destinations and dishes when you have
            the opportunity to travel to the &apos;Pearl of the Far East&apos;.
          </div>
          <div className="text-[28px] font-bold">
            Travel to Ho Chi Minh city: Guide from A to Z (updated with latest information by
            Holiday
            <span className="text-common">Swap</span>)
          </div>
          <div className="py-3 text-[20px] font-bold">Overview of Ho Chi Minh city tourism</div>
          <div>
            Dubbed the &apos; Pearl of the Far East&apos;, Ho Chi Minh City has long been the
            cultural, economic and political center of Vietnam, a convergence of many cultures, with
            diverse tourism products, is a &apos; city that never sleeps&apos; with vibrant
            entertainment activities day and night.
          </div>
          <div className="py-3">
            <Image src="/images/sai-gon.jpg" />
          </div>
          <div>
            Traveling to Saigon - Ho Chi Minh City, more than 300 years old, you can see high-rise
            buildings located close together, entertainment areas, bustling shopping centers, but
            there is also no shortage of ancient villas. Traditional markets have existed for
            hundreds of years.
          </div>

          <div>
            <Image className="py-3" width="100%" src="/images/sai-gon1.jpg" />
          </div>

          <div className="text-[20px] font-bold py-3">Climate of Ho Chi Minh City</div>
          <div>
            Ho Chi Minh City is located in the sub-equatorial tropical monsoon region. The weather
            here has consistently high temperatures throughout the year and has two distinct rainy
            and dry seasons. The rainy season is from May to November, the dry season is from
            December to April. The average temperature is about 27 degrees Celsius, the highest is
            over 40 degrees Celsius, but most of the time the sun is not harsh, the humidity is low,
            and cool in the afternoon. dark.
          </div>
          <div className="pt-2">
            The heat is not harsh, so visitors can visit the city at any time of the year. If you
            come during the rainy season, you should prepare an umbrella or raincoat to avoid sudden
            showers affecting your travel and exploration schedule.
          </div>
          <div>
            <Image className="py-3" width="100%" src="/images/sai-gon3.jpg" />
          </div>

          <div className="py-3 text-[20px] font-bold">Move to Ho Chi Minh City</div>
          <div>
            Being a big city, traveling to Ho Chi Minh City is quite convenient, with full means of
            transportation including planes, trains, ships, cars...
          </div>
          <div className="py-2">
            Domestic airlines operate direct flights to Tan Son Nhat airport from many localities
            every day. Ho Chi Minh City is the place with the highest frequency of departures and
            arrivals in the country. Tan Son Nhat Airport is located in Tan Binh district, about 8
            km from the center (District 1), about 5 km from District 3 and Phu Nhuan district.
          </div>
          <div>
            With trains, the fastest Thong Nhat train connecting Hanoi and Ho Chi Minh City is
            currently 30 hours, stopping at major stations such as Vinh - Dong Hoi - Hue - Da Nang.
            Tourists should book tickets at a reputable agent or directly through dsvn.vn, choose
            departure and arrival stations, and type of seat or bed according to needs. Train ticket
            prices vary depending on compartment and seat type. The road connecting the South and
            the North has two main routes: National Highway 1A and Ho Chi Minh Trail. Depending on
            the needs and destinations on the journey, tourists choose the appropriate route. From
            the Western provinces to Ho Chi Minh City, you can travel by bus from major bus
            operators such as:
          </div>

          <div className="text-[20px] font-bold py-3">
            Means of transportation in Ho Chi Minh City
          </div>

          <div>
            Traveling in Ho Chi Minh City is quite convenient, so there are many means of
            transportation for you to choose from. If you like the feeling of visiting small alleys
            and immersing yourself in the bustling crowd, renting a motorbike is one of the most
            ideal options. Most accommodations support car rental, or search for a rental online.
            The price per day depends on the type of car, ranging from 100,000 - 200,000 VND. Some
            places will require customers to make a deposit, some places will only need to save
            their identification documents.
          </div>
          <div className="pt-2">
            In addition, you can also choose to travel by technology vehicle (car or motorbike) in
            Ho Chi Minh City from reputable services such as: Be, Grab, Gojek,... with reasonable
            prices for your trip.
          </div>
          <div>
            <Image className="py-3" width="100%" src="/images/sai-gon5.jpg" />
          </div>

          <div className="text-[20px] font-bold py-3">Attractions in Ho Chi Minh City </div>
          <div className="font-bold pt-3 pb-2">Notre Dame Cathedral</div>
          <div>
            <Image width="100%" src="/images/sai-gon6.jpg" />
          </div>
          <div className="py-3">
            If you are in the center of District 1, you should not miss visiting Notre Dame
            Cathedral, the church is also known as Saigon Notre Dame Cathedral, also known as the
            Basilica of the Immaculate Conception. Original sin.
          </div>
          <div>
            The architecture of the building is extremely unique with a combination of beautiful
            Roman and Gothic styles. For the people of the Saigon diocese, this project is truly a
            proud symbol. Next to Notre Dame Cathedral, there is a large park with many trees,
            helping you sit and relax, chat with friends or freely take &apos;virtual life&apos;
            photos.
          </div>
          <div className="font-bold pt-3 pb-2"> Independence Palace </div>
          <div className="py-3">
            If you want to find a gentle, comfortable place that brings useful things, Independence
            Palace is an extremely suitable choice. This will be a place to help you relax your soul
            and find your roots through the culture and history of the nation.
          </div>
          <div>
            <Image width="100%" src="/images/sai-gon7.jpg" />
          </div>
          <div className="py-3">
            The Feng Shui architecture of the Independence Palace has a slightly Eastern
            orientation, however, every detail of the building also shows a unique modernity. Here,
            you can see with your own eyes how each old mode item is saved over time.
          </div>
          <div>
            <Image className="py-3" src="/images/sai-gon8.jpg" />
          </div>
          <div className="font-bold mt-3">Ben Thanh market</div>

          <div className="">
            This is a market located in the city center, bordered on 4 sides by major roads so it is
            very convenient for transportation. For shopping enthusiasts, this is a destination not
            to be missed, visitors can choose for themselves hundreds of diverse items from
            traditional to modern. This is also one of the Saigon tourist destinations that helps
            you comfortably enjoy traditional dishes at cheap prices.
          </div>
          <div>
            <Image width="100%" className="py-3" src="/images/sai-gon9.jpg" />
          </div>

          <div className="font-bold mt-3">Sai Gon center Post Office</div>
          <div>
            <Image width="100%" className="py-3" src="/images/sai-gon10.jpg" />
          </div>
          <div>
            This project was built in 5 years, from 1886 to 1891. The famous architect who designed
            this post office project was Gustave Eiffel - a Frenchman. The unique yellow paint of
            this location also helps you get beautiful check-in photos. Coming here, you will get
            extremely good photos and have the opportunity to go back in time to feel the beauty of
            this place in the old years.
          </div>

          <div>
            <Image width="100%" className="py-3" src="/images/sai-gon12.jpeg" />
          </div>
          <div className="font-bold mt-3">City Opera House</div>
          <div>
            <Image width="100%" className="py-3" src="/images/sai-gon11.jpeg" />
          </div>
          <div className="pt-3 pb-1">
            The City Theater is a destination with an area of ​​up to 2016 square meters, designed
            by many famous architects. The project not only shows majesty and grandeur on the
            outside but also shows innovation, full of modern sound and lighting inside.
          </div>
          <div>
            In addition, this is also a virtual living place that many people come to check in,
            especially many couples choose this place to preserve happy moments.
          </div>
          <div>
            <Image className="py-3" src="/images/sai-gon13.jpg" />
          </div>

          <div className="font-bold mt-3">Saigon Zoo and Botanical Garden</div>
          <div>
            <Image className="py-3" src="/images/sai-gon14.jpg" />
          </div>

          <div className="font-bold mt-3">Nguyen Hue Walking Street</div>

          <div>
            <Image className="py-3" src="/images/sai-gon16.jpg" />
          </div>
          <div>
            If Hanoi is famous for its Sword Lake walking street, then in Saigon, you can also relax
            on the weekend on Nguyen Hue walking street. The street also creates highlights with two
            large fountains, a system of green trees, bright light bulbs... bringing you enjoyable
            experiences when you set foot in Saigon.
          </div>
          <div>
            <Image width="100%" className="py-3" src="/images/sai-gon17.jpg" />
          </div>
        </div>
        <div className=" hidden lg:hidden md:hidden xl:h-[1300px] xl:block ">
          <Link
            href="/news/vungtaunews"
            className="flex flex-row items-end justify-center min-w-auto mb-5"
            onMouseEnter={() => setIsHoverdVT(true)}
            onMouseLeave={() => setIsHoverdVT(false)}
          >
            <div className={isHoverDakLak ? 'opacity-90' : ''}>
              <img
                src="/images/vung-tau.jpg"
                alt="destination"
                height={421}
                width={600}
                className=" w-[300px] h-[450px] object-cover rounded-xl relative"
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
                <span className="pb-8 w-[200px] text-center">Vung Tau</span>
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
