import React from "react";
import ECEB from "~/images/ECEB.jpg";
import Image from "next/image";

export const Landing = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <div className="relative -top-12 z-10 text-white text-center">
        <h1 className="m-10 text-9xl font-bold">IEEE UIUC</h1>
        <div className="font-extralight flex flex-col items-center justify-center text-3xl ">
          <h2 className="text-wrap w-8/12 md:max-w-screen-lg text-center">
            Join us for tech talks, info sessions, luncheons, workshops, and socials!
          </h2>
        </div>
      </div>
      <div className="absolute top-0 left-0 z-0 h-screen w-screen ">
        <Image alt="eceb" src={ECEB} fill className="opacity-40" />
      </div>
    </div>
  );
};
