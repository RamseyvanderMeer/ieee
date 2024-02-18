import React from "react";
import Link from "next/link";

export const AboutSection = () => {

  return (
    <div className="relative flex h-fit min-h-[75vh] w-screen flex-col items-center justify-center">
      <h2 className="m-4 text-5xl font-bold">About</h2>
      <p className="w-10/12 text-center text-xl md:max-w-screen-md">
        Welcome to UIUC IEEE, where we&rsquo;re dedicated to empowering students
        in their pursuits. Our mission is to equip you with the resources you
        need to thrive. Whether you can attend just a few or many events,
        we&rsquo;ve got you covered. Dive into enlightening tech talks that
        offer insights from company recruiters and valuable background
        information on internships. Forge lasting connections with like-minded
        peers through our socials. Explore various topics through our engaging
        workshops. Plus, TAGS hosts recurring meetings to help you hone
        essential industry skills. Don&rsquo;t miss out on our other exciting
        events – stay updated through our weekly email updates. We look forward
        to seeing you soon!
      </p>
      <div className="flex flex-col md:flex-row">
        {/* {!isSignedIn && (
          <div className="m-4 w-full w-[30vw] items-center justify-center rounded border-2 border-white px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white md:inline-flex md:w-auto">
            <SignUpButton />
          </div>
        )} */}
        {/* {isSignedIn && user && (
          <div className="m-3 w-full text-center w-[34vw] items-center justify-center rounded border-2 border-white p-3 px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white md:inline-flex md:w-auto">
            <Link href={`/@${user.username as string}`}>Profile</Link>
          </div>
        )} */}
        <div className="m-3 text-center w-[34vw] w-full items-center justify-center rounded border-2 border-white p-3 px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white md:inline-flex md:w-auto">
          <Link href="https://discord.gg/Gc9qPBxzbS">Join Discord</Link>
        </div>
        <div className="m-3 text-center w-[34vw] w-full items-center justify-center rounded border-2 border-white p-3 px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white md:inline-flex md:w-auto">
          <Link href="https://discord.gg/Gc9qPBxzbS">Resume Book</Link>
        </div>
      </div>
    </div>
  );
};
