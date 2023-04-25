import React from "react";
import ECEB from "~/images/ECEB.jpg";
import Image from "next/image";
import Typewriter from "typewriter-effect";

export const Landing = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <div className="relative -top-12 z-10 text-white">
        <h1 className="m-10 text-9xl font-bold">IEEE UIUC</h1>
        <div className="semi-bold flex flex-col items-center justify-center text-4xl ">
          <h2>Join us for</h2>
          <Typewriter
            options={{
              strings: [
                "Seminars",
                "Technical Workshops",
                "Socials",
                "Tech Talks",
                "and Much More",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="absolute top-0 left-0 z-0 h-screen w-screen ">
        <Image alt="eceb" src={ECEB} fill className="opacity-40" />
      </div>
    </div>
  );
};
