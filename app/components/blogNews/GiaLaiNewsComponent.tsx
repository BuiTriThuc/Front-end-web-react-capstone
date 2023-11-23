'use client';
import { Image } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';

export default function GiaLaiNewsComponent() {
  const [isHoverdHCM, setIsHoverdHCM] = useState(false);
  const [isHoverDakLak, setIsHoverdDakLak] = useState(false);
  const [isHoverPT, setIsHoverdPT] = useState(false);
  const [isHoverGL, setIsHoverdGL] = useState(false);
  const [isHoverDL, setIsHoverdDL] = useState(false);

  return (
    <div className="pt-32 pb-5 px-2 xl:px-40 flex flex-row justify-center w-full ">
      <div className="flex flex-row justify-between">
        <div className="xl:w-[70%] overflow-y-auto h-[1500px] no-scrollbar">
          <div className="text-[35px] font-bold">Travel to Gia Lai: Guide from A to Z</div>
          <div className="text-gray-400 text-[15px] pt-3">17:06 28/11/2023</div>
          <div className="w-full h-[1px] bg-gray-200 mb-5 mt-1"></div>
          <div className="italic mb-5">
            <span className="text-common">HolidaySwap</span> Gia Lai province is considered one of
            the most attractive destinations in the Central Highlands region. Let is explore this
            land with iVIVU to prepare for your upcoming trip to Gia Lai!
          </div>
          <div className="text-[28px] font-bold">
            Travel to Gia Lai: Guide from A to Z (updated with latest information by Holiday
            <span className="text-common">Swap</span>)
          </div>
          <div className="py-3 text-[20px] font-bold">Overview of Gia Lai tourism</div>
          <div>
            Gia Lai province is a worthy place for tourists to pack their backpacks and make a
            travel trip right away, because when you come here you will be attracted by the
            majestic, pristine landscape of nature and the poetic beauty of the countryside.
            mountain town. Gia Lai is a mountainous province located in the northern Central
            Highlands at an average altitude of 700 - 800m above sea level. Gia Lai borders Kon Tum
            province to the north, Dak Lak province to the south, Cambodia to the west, Quang Ngai,
            Binh Dinh and Phu Yen provinces to the east. The province has 17 administrative units
            including Pleiku city, 2 towns of An Khe, Ayun Pa and 14 districts including Chu Pah,
            Chu Prong, Dak Doa, Chu Se, Chu Puh, Phu Thien, Mang Yang, Krong Pa, Kong Chro, Kbang,
            Ia Pa, Ia Grai, Duc Co, Dak Po.
          </div>
          <div className="py-3">
            <Image src="/images/gia-lai1.jpg" />
          </div>
          <div>
            If Da Lat is famous for its romantic beauty, Buon Me Thuot is characterized by the
            passionate flavor of the coffee capital, then Gia Lai possesses its own liberal and wild
            character like a mountain girl. freight.
          </div>

          <div>
            <Image className="py-3" width="100%" src="/images/gia-lai2.jpg" />
          </div>

          <div className="text-[20px] font-bold py-3">Ideal time to travel to Gia Lai</div>
          <div>
            In general, Gia Lai is beautiful in every season and attracts tourists, but from
            November of the previous year to April of the following year is the dry season, this is
            considered the most ideal time to travel to Gia Lai . November and December are when the
            sky is sunny, Gia Lai is filled with the yellow color of ripe rice and blooming wild
            sunflowers, which is the ideal time to produce super quality photos. From around
            February to April, the mountain town is covered in pure white with countless coffee
            flowers.
          </div>

          <div>
            <Image className="py-3" width="100%" src="/images/gia-lai4.jpg" />
          </div>
          <div>
            The end of the year is the time for traditional festivals of ethnic minorities such as
            the new rice celebration, the new rice eating ceremony, the gong festival, the village
            worship festival, the buffalo stabbing festival... If you want to experience the culture
            of Indigenous people, you can also travel to Gia Lai on the occasion of these festivals
            to fully enjoy the beauty here.
          </div>

          <div>
            <Image className="py-3" width="100%" src="/images/gia-lai5.jpg" />
          </div>

          <div className="py-3 text-[20px] font-bold">Moving around Pleiku</div>
          <div>
            Traveling in Gia Lai is also quite convenient, you can ask to rent motorbikes or
            bicycles at motels and hotels to be more proactive in travel and time. In addition, if
            you want to move to other cities or go farther, you can choose to take a taxi, rent a
            car or bus.
          </div>

          <div className="text-[20px] font-bold py-3">
            Certain places you must check-in when coming to Gia Lai
          </div>
          <div className="font-bold pt-3 pb-2">T&apos; Nung lake</div>
          <div>
            T&apos; Nung Lake is the largest lake in the whole region with a huge volume of water
            even though there are no rivers or streams flowing into it, with an average depth of
            about 16 - 20m. This is a natural lake formed by 3 ancient volcanic craters connected to
            each other in the past, forming 3 sunken funnels. The lake is mouth is a raised volcanic
            crater, so even from a distance it can be seen very clearly. The huge amount of fresh
            water contained in the lake and many different types of fish are the source of daily
            life for the ethnic people here. This is always an interesting destination loved by many
            tourists.
          </div>
          <div>
            <Image width="100%" src="/images/gia-lai6.jpg" />
          </div>

          <div className="font-bold pt-3 pb-2">Kon Chu Rang Nature Reserve </div>
          <div className="py-3">
            Kon Chu Rang Nature Reserve is considered a precious gem of the Central Highlands
            mountains and forests. Coming here, you can admire 12 majestic waterfalls with a height
            of 10 meters and many rare plants.
          </div>
          <div>
            <Image width="100%" src="/images/gia-lai7.jpg" />
          </div>
          <div>
            <Image width="100%" src="/images/gia-lai8.jpg" />
          </div>

          <div className="font-bold mt-3">Chu Dang Ya volcano</div>

          <div className="">
            Chu Dang Ya is also a volcano that stopped working millions of years ago. The best time
            to visit this place is when the mountain is covered with vast green taro and sweet
            potato fields or the wild sunflower season covers this volcano in bright yellow.
          </div>
          <div>
            <Image width="100%" className="py-3" src="/images/gia-lai9.jpg" />
          </div>
          <div>
            <Image width="100%" className="py-3" src="/images/gia-lai10.jpg" />
          </div>

          <div className="font-bold mt-3">Ham Rong Mountain Gia Lai</div>
          <div>
            <Image width="100%" className="py-3" src="/images/gia-lai11.jpg" />
          </div>
          <div>
            Ham Rong Mountain is often referred to as the roof of Pleiku with a height of over 1000m
            above sea level. Looking down from above, the mountain top looks like a giant blue
            funnel with clouds hovering around. To see all the beauty of this mountain, visitors
            should go early in the morning to admire the chilly air and the gently drifting mist,
            which looks extremely special.
          </div>

          <div className="font-bold mt-3">Minh Thanh Pagoda</div>
          <div>
            <Image width="100%" className="py-3" src="/images/gia-lai12.jpg" />
          </div>
          <div className="pt-3 pb-1">
            Minh Thanh Pagoda is an extremely famous spiritual tourist destination in Gia Lai
            province. This place has an ancient beauty with curved pagoda roofs and many miniature
            scenes created to create an extremely peaceful space and bring joy. giving visitors a
            peaceful, peaceful space.
          </div>

          <div className="font-bold mt-3">Yaly hydroelectric lake</div>
          <div>
            Yaly hydroelectric lake is the second largest hydroelectric plant in our country after
            Hoa Binh hydroelectric plant on Da river. This work is associated with Yaly waterfall -
            one of the largest waterfalls in Vietnam with a height of up to 42 meters. White water
            foam under the sunlight forms beautiful rainbow stripes. The Central Highlands climate
            can be hot and dry, but just standing next to this lake and enjoying the cool breeze
            blowing across the lake can dispel all the heat as well as inhale the fresh air. Only
            mountains and forests exist. Coming here, visitors will feel the energy being loaded
            into their body, a source of fresh and vital energy.
          </div>
          <div>
            <Image className="py-3" src="/images/gia-lai13.jpg" />
          </div>

          <div className="font-bold mt-3">Phu Cuong Waterfall</div>
          <div>
            Phu Cuong Waterfall is considered the most majestic and magnificent waterfall in Gia
            Lai. Coming here, visitors feel like they are immersed in a mountainous space with cool
            green forests, rocky mountains and the highlight is a waterfall pouring down from above,
            creating white foam that covers the whole area, with tourists who love it. Adventurous
            people can experience climbing up a few high rocks and jumping down into the cool water
            or they can just sit at the foot of the waterfall to chat about a few things.
          </div>

          <div>
            <Image className="py-3" src="/images/gia-lai14.jpg" />
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
