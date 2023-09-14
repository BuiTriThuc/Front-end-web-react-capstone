import React, { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import { AiFillStar } from "react-icons/ai";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperButton from "./apartment/SwiperButton";

interface CarouselProps {
  slices: string[];
}

const Carousel: React.FC<CarouselProps> = ({ slices }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleMouseEnter = (index: any) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  return (
    <div className="flex gap-4">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        style={{ height: 500 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row-reverse",
          }}
        >
          <SwiperButton>
            <FaArrowLeft size={30} />
          </SwiperButton>

          {slices?.map((s: any, index: any) => (
            <SwiperSlide key={index}>
              <div
                className="flex flex-row items-end justify-center min-w-auto"
                onMouseEnter={() => handleMouseEnter(index)} // Pass the index of the hovered photo
                onMouseLeave={handleMouseLeave}
              >
                <div className={hoveredIndex === index ? "opacity-90" : ""}>
                  <img
                    src={s}
                    alt="destination"
                    height={700}
                    width={600}
                    className="object-cover rounded-xl relative"
                    style={{ height: 500 }}
                  />
                </div>

                <div
                  className={`text-white md:text-3xl md:px-[100px] text-lg px-[80px] flex flex-col items-center font-bold absolute ${
                    hoveredIndex === index
                      ? "-translate-y-14 duration-300"
                      : "translate-y-0 duration-300"
                  }`}
                >
                  {hoveredIndex === index ? (
                    <>
                      <span>Vung Tau</span>
                      <div className="text-base font-light text-white flex flex-col justify-center items-center">
                        <span className="flex justify-center md:w-[270px] flex-col">
                          2 day, 1 night
                          <span className="flex justify-between">
                            <div className="flex">
                              <AiFillStar size={20} color="yellow" />
                              <AiFillStar size={20} color="yellow" />
                              <AiFillStar size={20} color="yellow" />
                              <AiFillStar size={20} color="yellow" />
                            </div>

                            <div className="text-white text-base">
                              155 point
                            </div>
                          </span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="pb-8">Vung Tau</span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Carousel;
