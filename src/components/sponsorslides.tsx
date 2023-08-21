import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay } from "swiper";

export const SponsorSlides = () => {
  return (
    <div className="relative h-fit w-screen border border-white">
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        loop={true}
        centeredSlides={true}
        noSwiping={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="h-96 w-full"
      >
        <SwiperSlide className="flex h-full w-full items-center justify-center bg-white text-center text-black">
          Slide 1
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center bg-white text-center text-black">
          Slide 2
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center bg-white text-center text-black">
          Slide 3
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center bg-white text-center text-black">
          Slide 4
        </SwiperSlide>
        {/* <SwiperSlide className="flex h-full w-full items-center justify-center bg-white text-center text-black">
          Slide 5
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center bg-white text-center text-black">
          Slide 6
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center bg-white text-center text-black">
          Slide 7
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center bg-white text-center text-black">
          Slide 8
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center bg-white text-center text-black">
          Slide 9
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};
