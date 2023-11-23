'use client';
import { Image } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';

export default function DakLakNews() {
  const [isHoverdHCM, setIsHoverdHCM] = useState(false);
  const [isHoverDakLak, setIsHoverdDakLak] = useState(false);
  const [isHoverPT, setIsHoverdPT] = useState(false);
  const [isHoverdVT, setIsHoverdVT] = useState(false);

  return (
    <div className="pt-32 pb-5 px-2 xl:px-40 flex flex-row justify-center w-full ">
      <div className="flex flex-row justify-between">
        <div className="xl:w-[70%] overflow-y-auto h-[1500px] no-scrollbar">
          <div className="text-[35px] font-bold">Travel to Dak Lak: Guide from A to Z</div>
          <div className="text-gray-400 text-[15px] pt-3">17:06 28/11/2023</div>
          <div className="w-full h-[1px] bg-gray-200 mb-5 mt-1"></div>
          <div className="italic mb-5">
            When mentioning Dak Lak, people often immediately remember the title &apos;coffee
            capital&apos;. Every time, traveling to Dak Lak, you not only discover the
            characteristics of this land but also immerse yourself in the wild and majestic scenery,
            bringing a feeling of being closer to nature and more comfortable.
          </div>
          <div className="text-[28px] font-bold">
            Travel to Dak Lak: Guide from A to Z (updated with latest information by Holiday
            <span className="text-common">Swap</span>)
          </div>
          <div className="py-3 text-[20px] font-bold">Overview of Dak Lak tourism</div>
          <div>
            Dak Lak is a province located in the middle of the South Central Highlands, to the east
            it borders Phu Yen and Khanh Hoa provinces, to the west it borders Cambodia, to the
            south it borders Lam Dong and Dak Nong provinces, to the north it borders Gia Lai
            province. Dak Lak tourism is also famous for many primeval gardens and planned nature
            reserves such as YokDon national park, Chu Yang Sin national park, Ea So nature
            reserve,... with many animal and plant species. rare animals, especially elephants.
          </div>
          <div className="py-3">
            <Image src="/images/dak-lak.jpg" />
          </div>

          <div className="text-[20px] font-bold py-3">What season is best to visit Dak Lak?</div>
          <div>
            Dak Lak belongs to the highland climate area with two very distinct seasons: the rainy
            season (from May to October) and the dry season (from November to April of the following
            year), the average temperature during the year is 24 degrees Celsius...
          </div>
          <div>
            <Image className="py-3" width="100%" src="/images/dak-lak2.jpg" />
          </div>
          <div>
            Dak Lak is most beautiful from late November to March, because the rainy season has
            passed, the autumn sky is clear and cool, the waterfall still has a lot of water. The
            weather in the first months of the year is also pleasant. Late February and early March
            is the season of coffee flowers, April is the season of po lang flowers (rice flowers)
            bright red in the mountains and hills, and November is the season of wild sunflowers
            blooming throughout the Central Highlands. There is also the season of reed flowers,
            yellow cassia, cherry apricot... In the summer, the Central Highlands often has rain in
            the afternoon, but it quickly stops. Therefore, you should focus your sightseeing time
            in the morning.
          </div>
          <div className="text-[20px] font-bold py-3">Means of transportation to Dak Lak</div>

          <div className="py-3">
            <div className="flex flex-row gap-1">
              <div className="font-bold">Airplane: </div>
              <div>
                To save time you can choose to fly by airlines such as Vietnam Airlines, Vietjet
                Air, Bamboo Airways,...
              </div>
            </div>
            <div className="font-bold">Coach</div>
          </div>
          <div className="text-[20px] font-bold py-3">
            Super beautiful check-in locations in Dak Lak
          </div>
          <div className="font-bold pt-3 pb-2">Buon Ma Thuot Coffee Museum</div>
          <div>
            <Image src="/images/dak-lak3.jpg" />
          </div>
          <div className="py-3">
            Buon Ma Thuot Coffee Museum is located on Nguyen Dinh Chieu Street, Tan Loi Ward, Buon
            Ma Thuot City. Buon Ma Thuot Coffee Museum, also known as Buon Ma Thuot World Coffee
            Museum, is located in the coffee city project with a total area of ​​up to 45 hectares,
            a complex including a coffee enjoyment space, an exhibition area Exhibition, display
            area, conference space, light library area...
          </div>
          <div className="font-bold pt-3 pb-2">Lak Lake</div>
          <div>
            Lak Lake is the largest natural freshwater lake in Dak Lak province and the second
            largest in Vietnam. Surrounded by majestic mountains and forests, Lak Lake possesses a
            beauty that is both wild, exciting and very poetic.
          </div>
          <div>
            <Image src="/images/dak-lak4.jpg" />
          </div>
          <div className="py-3">
            Coming here, you will experience many interesting activities such as admiring the
            peaceful, dreamy beauty of the quiet lake surface. Sitting on a dugout boat gliding
            gently and slowly on the lake is also a very unforgettable experience. In addition, you
            can also experience elephant riding - a suitable activity for those who like excitement
            and cultural experiences in villages. When going to festivals, you can also see
            gatherings, dancing, gongs,... especially, coming here you should not miss enjoying the
            cuisine with special dishes such as: grilled chicken, rice. Blue rice, bitter eggplant
            salad, stone moss soup,...
          </div>
          <div>
            <Image className="py-3" src="/images/dak-lak5.jpg" />
          </div>
          <div className="font-bold mt-3">Ban Don eco-tourism area</div>
          <div>
            <Image className="py-3" src="/images/dak-lak6.jpg" />
          </div>
          <div className="">
            Buon Don or Ban Don means &apos;Island Village&apos;. Coming to this tourist area, you
            will be immersed in nature with very interesting experiences. Coming from the district
            center, you will see suspension bridges crossing the Serepok river, admire the majestic
            beauty of the 7-branch waterfall and hundreds of meters long houses of people in the
            Central Highlands.
          </div>
          <div>
            <Image width="100%" className="py-3" src="/images/dak-lak22.jpg" />
          </div>
          <div>
            More specifically, when you come here, you can directly ride an elephant to visit the
            daily life of the people in the village. The feeling of swaying on the elephant&quot;s
            back will bring you many exciting experiences on this trip. Address: Krong Na commune,
            Buon Don district, Dak Lak province.
          </div>
          <div className="font-bold mt-3">Chu Yang Sin National Park</div>
          <div>
            <Image className="py-3" src="/images/dak-lak8.jpg" />
          </div>
          <div>
            Chu Yang Sin has poetic, wild landscapes of temperate and tropical forests, with many
            impressive rapids. When visiting Chu Yang Sin National Park, you can choose different
            but interesting forms of tourism such as: going to see the ancient pine forest, the
            thousand-year-old Po Mu tree population, and observing wild birds and animals. , or
            mountain biking along forest roads, canoeing on the river, going to waterfalls to have
            fun and organize picnics... If you want to find a peaceful, comfortable place, Chu Yang
            Sin National Park is a perfect choice. That&quot; s good. Address: Located in two
            districts of Lak and Krong Bong, Dak Lak province.
          </div>
          <div className="font-bold mt-3">Bao Dai Palace</div>
          <div>
            <Image className="py-3" src="/images/dak-lak9.jpg" />
          </div>
          <div>
            Bao Dai Palace is a historical relic located at 4 Nguyen Du Street, Buon Ma Thuot City,
            Dak Lak Province. The house was formerly a stilt house, the residence of Sabatier -
            Ambassador of the French government in the Central Highlands. Then the house was rebuilt
            for King Bao Dai to use.
          </div>
          <div>
            <Image className="py-3" src="/images/dak-lak10.jpg" />
          </div>
          <div>
            At first, the house was built with materials such as wood, thatch, bamboo, etc. In 1926,
            it was rebuilt with solid bricks, stone, and cement and completed in 1927, named the
            French Legation Palace. . The building was rebuilt as it is today with beautiful
            architecture bearing the traditional long house style of the indigenous Ede people -
            tiled roof, wooden floors. Surrounded by a forest of ancient trees, very diverse in
            types, many trees are more than 100 years old.
          </div>
          <div>
            <Image className="py-3" src="/images/dak-lak11.jpg" />
          </div>
          <div>
            Here are displayed many valuable cultural artifacts of more than 44 ethnic groups living
            in Dak Lak, including the gong cultural space and issues related to national cultural
            identity in Dak Lak. place is clearly shown. This is a place where many tourists come to
            visit the architecture, learn about history and visit the ancient tree garden. Address:
            No. 4 Nguyen Du Street, Buon Ma Thuot City, Dak Lak Province.
          </div>
          <div className="font-bold mt-3">Buon Ma Thuot Coffee Book Street</div>
          <div>
            <Image className="py-3" src="/images/dak-lak12.jpg" />
          </div>
          <div>
            Buon Ma Thuot coffee book street gives visitors a new experience with a mountain-like
            space with different stilt houses and wooden houses. In addition, the top is also
            decorated with umbrellas and conical hats that look very pretty, especially with the
            appearance of wind chimes that look eye-catching and bring a catchy, extremely pleasant
            sound. .
          </div>
          <div>
            <Image className="py-3" src="/images/dak-lak13.jpg" />
          </div>
          <div>
            Some shops even hang yellow corn on the ceiling, making you feel like you are lost in
            the peaceful, charming space of ethnic villages right in the heart of a bustling city.
            Coming to the book street, visitors will have the opportunity to read all genres from
            literature, art, science, children&quot; s books to famous novels from home and
            abroad... If you are bored with reading You can also walk around the surrounding cafes
            to enjoy books and this place also provides you with a lot of space to take virtual
            photos.
          </div>
          <div>
            <Image width="100%" className="py-3" src="/images/dak-lak14.jpg" />
          </div>
          <div>
            Address: Book street extends from alley No. 2 Phan Chu Trinh street (right behind the
            Cathedral) to Nguyen Tat Thanh street, in Thang Loi ward, center of Buon Ma Thuot city.
          </div>
          <div className="font-bold mt-3">Mother Elephant Rock</div>

          <div>
            <Image className="py-3" src="/images/dak-lak20.jpg" />
          </div>
          <div>
            Yang Tao limestone actually consists of a pair: Father elephant stone and Mother
            elephant stone. They appear majestically among the mountains and forests. Mother
            Elephant Rock is located close to the foot of the mountain in Chu Yang Sin National
            Park. For tourists, especially young people who love &apos;virtual living&apos;, this
            place will be an extremely ideal place to take photos. The feeling when setting foot on
            a big rock is like walking on the back of a giant elephant.
          </div>
          <div>
            <Image className="py-3" src="/images/dak-lak16.jpg" />
          </div>
          <div>
            Besides, Mother Elephant stone is considered the god of love. This is where couples in
            love often sit on stone backs to date, exchange promises and pray for the stone god to
            protect their love. Not only that, people who are heartbroken or have no lover come here
            to tell their stories to the stone god. With the hope that the stone god will understand
            and help them find the &apos;half&apos; of their life. Address: Yang Tao Commune, Buon
            Ma Thuot, Dak Lak Province.
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
