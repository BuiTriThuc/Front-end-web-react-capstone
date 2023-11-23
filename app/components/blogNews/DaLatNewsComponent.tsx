'use client';
import { Image } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';

export default function DaLatNewsComponent() {
  const [isHoverdHCM, setIsHoverdHCM] = useState(false);
  const [isHoverDakLak, setIsHoverdDakLak] = useState(false);
  const [isHoverPT, setIsHoverdPT] = useState(false);
  const [isHoverGL, setIsHoverdGL] = useState(false);
  const [isHoverDL, setIsHoverdDL] = useState(false);

  return (
    <div className="pt-32 pb-5 px-2 xl:px-40 flex flex-row justify-center w-full ">
      <div className="flex flex-row justify-between">
        <div className="xl:w-[70%] overflow-y-auto h-[1500px] no-scrollbar">
          <div className="text-[35px] font-bold">Travel to Da Lat city: Guide from A to Z</div>
          <div className="text-gray-400 text-[15px] pt-3">17:06 28/11/2023</div>
          <div className="w-full h-[1px] bg-gray-200 mb-5 mt-1"></div>
          <div className="italic mb-5">
            <span className="text-common">HolidaySwap</span> Travel to Da Lat with the most complete
            and concise guide from iVIVU.com. Da Lat travel guide introduces interesting
            destinations, places to eat and lots of useful information for you to refer to before
            coming to this beautiful flower city.
          </div>
          <div className="text-[28px] font-bold">
            Travel to Da Lat city: Guide from A to Z (updated with latest information by Holiday
            <span className="text-common">Swap</span>)
          </div>
          <div className="py-3 text-[20px] font-bold">Overview of Da Lat tourism</div>
          <div>
            Da Lat is the capital of Lam Dong province. With an altitude of 1,500 m above sea level,
            Da Lat&apos;s weather is cool, making it an ideal resort in the southern region. Once
            famous for attractions such as the Valley of Love, Lake of Sighs, Doi Thong Hai Mo, Thac
            Voi..., Da Lat today no longer retains its pristine beauty as before. Current main
            attractions when traveling to Da Lat include Xuan Huong Lake, Langbiang Peak, Bao Dai
            Palace, Tran Le Xuan Villa, Truc Lam Zen Monastery, Tuyen Lam Lake, Da Lat Railway
            Station (Trai Mat Station) ... Only about 300km from Saigon, Da Lat city is a great
            resort, helping tourists escape the hot heat of the Southern Delta.
          </div>
          <div className="py-3">
            <Image src="/images/da-lat1.jpg" />
          </div>
          <div>
            Da Lat is the capital of Lam Dong province. With an altitude of 1,500 m above sea level,
            Da Lat&apos;s weather is cool, making it an ideal resort in the southern region. Once
            famous for attractions such as the Valley of Love, Lake of Sighs, Doi Thong Hai Mo, Thac
            Voi..., Da Lat today no longer retains its pristine beauty as before. Current main
            attractions when traveling to Da Lat include Xuan Huong Lake, Langbiang Peak, Bao Dai
            Palace, Tran Le Xuan Villa, Truc Lam Zen Monastery, Tuyen Lam Lake, Da Lat Railway
            Station (Trai Mat Station) ... Only about 300km from Saigon, Da Lat city is a great
            resort, helping tourists escape the hot heat of the Southern Delta.
          </div>
          <div>
            <Image className="py-3" width="100%" src="/images/da-lat16.jpg" />
          </div>
          <div className="text-[20px] font-bold py-3">What season is best to visit Da Lat?</div>
          <div>
            <Image className="py-3" width="100%" src="/images/da-lat3.jpg" />
          </div>
          <div>
            Located in an area influenced by a tropical monsoon climate that varies with altitude,
            Da Lat&aposs climate is cool all year round and the temperature usually only fluctuates
            between 18-25ºC, so you can travel to Da Lat . at any time period. You can rely on the
            blooming season as well as your favorite fruits to be able to enjoy them right away.
          </div>
          <div className="pt-2">
            Da Lat has two seasons: the rainy season lasts from May to November and the dry season
            from December to April of the following year. It&apos;s best to still go in the dry
            season for convenience in traveling and sightseeing.
          </div>
          <div>
            <Image className="py-3" width="100%" src="/images/da-lat4.jpg" />
          </div>
          <div className="py-3 text-[20px] font-bold">
            Transportation: Vehicles and transportation when traveling to Da Lat
          </div>
          <div>
            <span className="font-bold">Airplane:</span> From Hanoi, Da Nang or Ho Chi Minh City,
            you can fly to Lien Khuong airport (Da Lat) with many airlines such as VietnamAirlines,
            Vietjet,...
          </div>
          <div className="py-2">
            <span className="italic text-gray-600">Note: </span>From Lien Khuong airport, you can
            catch the airport bus to the city center or take a taxi. The airport bus will run
            continuously throughout the day, the last stop in Da Lat city is Le Thi Hong Gam street,
            right at Da Lat market. You should ask the driver for directions and the address of the
            hotel you booked to get off at the nearest stop.
          </div>
          <div className="text-[20px] font-bold py-3">Means of transportation in Da Lat : </div>
          <div>Motorbike: price from 80,000 - 120,000 VND/day.</div>
          <div>
            <Image className="py-3" width="100%" src="/images/da-lat5.jpg" />
          </div>
          <div>
            Double bicycle: 20,000 VND/hour. To rent a bicycle or motorbike, you need to bring your
            ID card.
          </div>
          <div>
            Car rental: Daily rental price (from 8:00 a.m. to 5:00 p.m.) is from 1 million VND or
            more, overtime is charged at 100,000 VND/hour.
          </div>
          <div>
            Bus: Bus routes from the bus station in the center of Da Lat city follow routes to
            communes and districts of Da Lat and Lam Dong.
          </div>
          <div className="text-[20px] font-bold py-3">Places to visit in Da Lat </div>
          <div className="font-bold pt-3 pb-2">Da Lat Market</div>
          <div>
            <Image width="100%" src="/images/da-lat6.jpg" />
          </div>
          <div className="py-3">
            As one of the markets, the largest gathering place for trading goods of the indigenous
            people of the land of fog, this place hardly lacks anything, items and products from
            North to South. are all traded by small traders at this market.
          </div>
          <div>
            <Image width="100%" src="/images/da-lat7.jpg" />
          </div>

          <div className="font-bold pt-3 pb-2"> Xuan Huong Lake </div>
          <div className="py-3">
            Xuan Huong Lake is considered one of the most beautiful lakes in Vietnam. This lake has
            a romantic beauty surrounded by a green pine forest and a park full of flowers. This
            place impresses visitors with its natural beauty, clear blue water surface and shady
            trees along the shore, creating a romantic, peaceful and quiet scene.
          </div>
          <div>
            <Image width="100%" src="/images/da-lat8.jpg" />
          </div>

          <div className="font-bold mt-3">Bao Dai Palace</div>
          <div className="">
            In Da Lat, visitors can explore all 3 Bao Dai Palaces: Palace 1 is located at No. 1,
            Tran Quang Dieu Street, Ward 10, Da Lat City, Lam Dong Province. Palace 2 is located at
            No. 12, Tran Hung Dao Street, Ward 10, Da Lat City, Lam Dong Province and Palace 3 is
            located at No. 1, Trieu Viet Vuong Street, Ward 4, Da Lat City, Lam Dong Province.
            Coming here, you will be able to visit and learn about history and architecture, see the
            scenery around the Palace and can check-in at many beautiful places.
          </div>
          <div>
            <Image width="100%" className="py-3" src="/images/da-lat9.jpg" />
          </div>

          <div className="font-bold mt-3">Dalat Railway Station</div>
          <div>
            <Image width="100%" className="py-3" src="/images/da-lat10.jpg" />
          </div>
          <div>
            Da Lat Station is located on Quang Trung Street (Ward 10, Da Lat City, Lam Dong
            Province), also the only train station in the Central Highlands region. Da Lat Station
            is associated with the history of formation and development of the &apos; land of
            thousands of pines&apos; urban area, considered the most beautiful ancient train station
            in Vietnam and Indochina.
          </div>

          <div>
            <Image width="100%" className="py-3" src="/images/da-lat11.jpg" />
          </div>
          <div>
            Dalat Railway Station was designed by two French architects, Moncet and Revéron, with
            bold indigenous architecture. The structure of the project is coherent and scientific,
            but the form is very sophisticated. The building has a symmetrical layout, with the
            architectural block in the middle simulating the three peaks of Langbiang Mountain and
            the roofs of the Central Highlands&apos; communal houses; On either side are two
            sprawling architectural blocks. In the middle of the building, outside, under the roof,
            there is a large clock face recording the time Dr. Alexandre Yersin discovered Da Lat.
            In the middle block, there are two front halls, one for passengers and one for cargo.
            Between these two paths is the train waiting area. This middle architectural block has
            only 1 floor with large space and a height up to the roof.
          </div>
          <div className="font-bold mt-3">Chicken Church</div>
          <div>
            <Image width="100%" className="py-3" src="/images/da-lat12.jpg" />
          </div>
          <div className="pt-3 pb-1">
            Chicken Church is also known as Dalat Cathedral. This is the largest religious building
            in Da Lat with Roman architectural style. The church is overall designed in a cross
            shape with a length of 65 m and a width of 14 m. The highest place of the church is the
            47 m high bell tower. In Roman architecture, special emphasis is placed on decoration.
          </div>

          <div className="font-bold mt-3">Domaine de Marie Church</div>
          <div>
            <Image width="100%" className="py-3" src="/images/da-lat14.jpg" />
          </div>
          <div>
            Domaine de Marie Church is a famous church commonly known as Mai Anh Church or Vinh Son
            Church. This place was built in French architectural style and is located right in the
            center of Da Lat, so it is visited by many tourists. Coming here, visitors can freely
            take check-in photos and enjoy the French architectural space, which will be a great
            destination for tourists.
          </div>
          <div className="font-bold mt-3">Linh Phuoc Pagoda</div>
          <div>
            <Image className="py-3" src="/images/da-lat13.jpg" />
          </div>
          <div>
            Linh Phuoc Pagoda is also known as the bottle pagoda. The temple is known as the most
            unique and is also the temple that holds the most records in Da Lat. This place is also
            known as the 18-storey pagoda of hell, which is also what attracts tourists every time
            they come here to make pilgrimages, worship their ancestors, and admire the beauty of
            this unique architecture.
          </div>
          <div>
            <Image width="100%" className="py-3" src="/images/da-lat15.jpg" />
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
