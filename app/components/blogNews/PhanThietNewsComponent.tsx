'use client';
import { Image } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';

export default function PhanThietNewsComponent() {
  const [isHoverdHCM, setIsHoverdHCM] = useState(false);
  const [isHoverDakLak, setIsHoverdDakLak] = useState(false);
  const [isHoverdVT, setIsHoverdVT] = useState(false);

  return (
    <div className="pt-32 pb-5 px-2 xl:px-40 flex flex-row justify-center w-full ">
      <div className="flex flex-row justify-between">
        <div className="xl:w-[70%] overflow-y-auto h-[1500px] no-scrollbar">
          <div className="text-[35px] font-bold">Travel to Phan Thiet: Guide from A to Z</div>
          <div className="text-gray-400 text-[15px] pt-3">17:06 28/11/2023</div>
          <div className="w-full h-[1px] bg-gray-200 mb-5 mt-1"></div>
          <div className="italic mb-5">
            Which season is Phan Thiet most beautiful?, What means of transportation to get here?,
            Where to eat, rest, and have fun?... You should have ready answers to the above
            questions in advance. when deciding to pack your backpack and go to travel to Phan
            Thiet!
          </div>
          <div className="text-[28px] font-bold">
            Travel to Phan Thiet: Guide from A to Z (updated with latest information by Holiday
            <span className="text-common">Swap</span>)
          </div>
          <div className="py-3 text-[20px] font-bold">Overview of Phan Thiet tourism</div>
          <div>
            Phan Thiet is a city in Binh Thuan province, located on National Highway 1A, 183km
            northeast of Ho Chi Minh City. Phan Thiet has long been a famous beach tourist
            destination in Vietnam with long white sand beaches, blue sea and towering rows of
            coconut trees.
          </div>
          <div className="py-3">
            <Image src="/images/phan-thiet1.jpg" />
          </div>

          <div>
            Not only possessing beautiful natural scenery, this land is also an attractive cultural
            tourism destination with diverse communities such as: Chinese, Cham people... Traveling
            to Phan Thiet , you not only You can visit and admire the scenery but also enjoy many
            delicious dishes made from fresh seafood.
          </div>

          <div className="py-3">
            <Image src="/images/phan-thiet2.jpg" />
          </div>

          <div className="text-[20px] font-bold py-3">Schedule a Phan Thiet tour?</div>
          <div>
            Dak Lak belongs to the highland climate area with two very distinct seasons: the rainy
            You can travel to Phan Thiet in all months of the year, the climate in Phan Thiet is
            windy, sunny and rarely stormy. However, the most appropriate and ideal time for you to
            travel to Phan Thiet is in June and July.
          </div>
          <div>
            <Image className="py-3" width="100%" src="/images/phan-thiet3.jpg" />
          </div>

          <div className="text-[20px] font-bold py-3">Move to Phan Thiet</div>

          <div>
            Phan Thiet is about 1,500 km from Hanoi and about 210 km from Ho Chi Minh City. There is
            no airport, so you have to travel by means of transport such as passenger cars,
            self-driving cars, trains..
          </div>

          <div className="text-[20px] font-bold py-3">Phan Thiet tourist attractions</div>
          <div className="font-bold pt-3 pb-2">Duc Thanh School</div>
          <div>
            <Image src="/images/phan-thiet4.jpg" />
          </div>
          <div className="py-3">
            This is a school founded by patriotic scholars in 1907 in response to the Duy Tan
            movement in Central Vietnam. Duc Thanh school also marks the time when President Ho Chi
            Minh stopped to teach before going to Saigon. Today, Duc Thanh school area still retains
            almost intact memorabilia from nearly a century ago.
          </div>
          <div>
            <Image src="/images/phan-thiet5.jpg" />
          </div>
          <div className="font-bold pt-3 pb-2">Van Thuy Tu Palace</div>
          <div>
            <Image src="/images/phan-thiet6.jpg" />
          </div>
          <div className="mb-3">
            On Ngu Ong Street, Duc Thang Ward, City. Phan Thiet has a temple worshiping the god Nam
            Hai - Ca Ong (whale). The set of Ong fish bones kept at Van Thuy Tu palace is 22m long,
            weighs 65 tons, and is considered the largest in Vietnam and Southeast Asia. Every year
            at the Palace, ceremonies are held solemnly on lunar days: February 20 (Te Xuan); April
            20 (fishing bridge); June 20 (Main season); July 20 (Vertical Rowing) and August 23
            (Off-Season). During the ceremony, there are also activities such as boi singing, troupe
            performances, boat racing...
          </div>
          <div>
            <Image src="/images/phan-thiet7.jpg" />
          </div>

          <div className="font-bold mt-3">Ong Hoang Floor</div>
          <div>
            <Image className="py-3" src="/images/phan-thiet8.jpg" />
          </div>
          <div className="">
            On your trip to Mui Ne, you will definitely be curious to explore Lau Ong Hoang because
            it is associated with the name of poet Han Mac Tu. Lau Ong Hoang used to be the dating
            place between Han Mac Tu and Mong Cam - the poet is lover. Poet Han Mac Tu wrote many
            poems about this charming landscape.
          </div>

          <div className="font-bold mt-3">Poshanu Cham Tower</div>
          <div>
            <Image className="py-3" src="/images/phan-thiet9.jpg" />
          </div>
          <div>
            Poshanu Tower is located on Ba Nai hill, Phu Hai ward, 7 km northeast of Phan Thiet
            center. Poshanu Cham Tower is a group of relics left over from the ancient Champa
            Kingdom. The tower has Hoa Lai architectural style - one of the ancient artistic styles
            of Champa. Although only small and medium in size, it distills the quintessence of
            architectural techniques and decorative arts of the ancient Cham people, creating a
            majestic and mysterious appearance.
          </div>
          <div>
            <Image className="py-3" src="/images/phan-thiet10.jpg" />
          </div>
          <div className="font-bold mt-3">Ho chi minh museum</div>
          <div>
            <Image className="py-3" src="/images/phan-thiet11.jpg" />
          </div>
          <div>
            Ho Chi Minh Museum - Binh Thuan Branch was established on May 19, 1986, this is where
            President Ho Chi Minh lived and taught in 1910 before he went to Saigon to find a way to
            save the country.
          </div>

          <div className="font-bold mt-3">Circus Land amusement park</div>
          <div>
            <Image className="py-3" src="/images/phan-thiet12.jpg" />
          </div>
          <div>
            Circus Land is an American-style coastal amusement park located in Tien Thanh commune,
            City. Phan Thiet. Coming to Circus Land, visitors will have unique experiences, from
            exciting game booths to challenging games, creating thrills and adventures for a day of
            extreme experience. yomost.
          </div>
          <div>
            Inspired by the American traveling circus model, Circus Land offers a unique, colorful
            space, with new virtual check-in corners for visitors, as well as colorful shows. Ticket
            prices are sold according to combos of games, starting from 50,000 VND/ticket. To avoid
            having to line up to buy tickets, you can buy tickets online on reputable ticket booking
            websites.
          </div>

          <div className="font-bold mt-3">Hon Rom</div>

          <div>
            <Image className="py-3" src="/images/phan-thiet13.jpg" />
          </div>
          <div>
            Hon Rom is the name of a small mountain still wild, located in Long Son hamlet, Mui Ne
            ward, city. Phan Thiet. Here, the water is clear blue, the waves are calm, and there are
            no reefs. Every morning or afternoon, you can sit and watch the sunrise or sunset; In
            the evening, watch the moon rise or organize a campfire. In Hon Rom, the beach cluster
            has many areas such as: Hon Rom 1, Hon Rom 2, Thuy Trang...
          </div>

          <div className="font-bold mt-3">Hon Ghenh</div>

          <div>
            <Image className="py-3" src="/images/phan-thiet14.jpg" />
          </div>
          <div>
            Less than 1 km from Mui Ne, Hon Ghenh or Hon Lao is still quite pristine. To get to Hon
            Ghenh, you can take the shuttle service from the hotel or rent a boat from a fisherman
            for about 200,000 VND/boat (10 people), including return trip. After about 10 minutes
            floating on the sea you will set foot on the island. The first impression is the clear
            sea water, you can see beautiful coral reefs at the bottom, large and small rock rapids
            piled up on top of each other. To see Hon Lao, going in the afternoon is the most
            beautiful, because you will see the afternoon light and sunset gradually covering the
            sea. Early morning is a suitable time for amateur anglers.
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
        </div>
      </div>
    </div>
  );
}
