import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";
import { LoadingSpinner } from "./loading";

dayjs.extend(relativeTime);

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards, Pagination, Navigation } from "swiper";

type EventWithUser = RouterOutputs["events"]["getAll"][number];
export const EventView = (props: EventWithUser) => {
  const ctx = api.useContext();

  const { mutate, isLoading: isDeleting } =
    api.events.deleteEventsByEventId.useMutation({
      onSuccess: () => {
        void ctx.events.getAll.invalidate();
      },
      onError: () => {
        toast.error("Failed to delete event! Please try again later.");
      },
    });

  const { event, author } = props;
  const { user } = useUser();
  return (
    <div
      key={event.id}
      className="flex w-full flex-col gap-3 border-b border-slate-400 p-4"
    >
      <div className="relative flex w-full flex-row items-center justify-between">
        <Link href={`event/${event.id}`} className="text-2xl font-bold">
          {event.name}
        </Link>

        <div className="relative flex flex-row items-center">
          <span className="font-thin">{` ${event.date.toLocaleDateString()} · ${dayjs(
            event.date
          ).fromNow()}`}</span>
          {!isDeleting && user?.id === author.id && (
            <div
              className="relative top-0 right-0 hover:cursor-pointer"
              onClick={() => mutate({ id: event.id })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                  fill="white"
                ></path>{" "}
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  fill="white"
                ></path>{" "}
              </svg>
            </div>
          )}
          {isDeleting && user?.id === author.id && (
            <div className="absolute top-0 right-0">
              <LoadingSpinner size={25} />
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-between md:flex-row">
        <p className="w-6/12 text-white">{event.description}</p>

        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Navigation, Pagination]}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          speed={600}
          className="mySwiper relative h-48 w-6/12 bg-slate-300 text-white"
        >
          {event?.images.map((image) => (
            <SwiperSlide key={image}>
              <Image
                alt={image}
                src={image}
                fill
                className="w-full overflow-hidden object-cover object-center"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* </Link> */}
      {/* </div> */}
    </div>
  );
};
