import React from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import logo from "~/images/logo.png";
import { useState } from "react";

export const Nav: React.FC = () => {

  const { user, isSignedIn } = useUser();

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="flex flex-wrap items-center border-b border-white bg-black p-3">
        <Link href="/">
          <Image height={45} src={logo} alt="logo" />
        </Link>
        <button
          className=" ml-auto inline-flex rounded p-3 text-white outline-none hover:bg-slate-800 hover:text-white lg:hidden"
          onClick={handleClick}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active
              ? "duration-600 inline-block h-auto max-h-screen translate-x-0 transition-all ease-out"
              : "duration-400 absolute h-0 max-h-0 -translate-x-full overflow-hidden opacity-0 transition ease-out"
          }   w-full transition  duration-1000 ease-in-out lg:inline-flex lg:w-auto lg:flex-grow`}
        >
          <div className="flex w-full flex-col items-start lg:ml-auto lg:inline-flex lg:h-auto  lg:w-auto lg:flex-row lg:items-center">
            <Link href="/">
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white lg:inline-flex lg:w-auto ">
                Home
              </div>
            </Link>
            <Link href="/events">
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white lg:inline-flex lg:w-auto">
                events
              </div>
            </Link>
            <Link href="/about">
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white lg:inline-flex lg:w-auto">
                About
              </div>
            </Link>
            <Link href="/contact">
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white lg:inline-flex lg:w-auto">
                Contact
              </div>
            </Link>
            {!isSignedIn && (
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white lg:inline-flex lg:w-auto">
                <SignInButton />
              </div>
            )}
            {isSignedIn && user && (
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white lg:inline-flex lg:w-auto">
                <Link href={`/@${user.username as string}`}>Profile</Link>
              </div>
            )}
            {isSignedIn && user && (
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white lg:inline-flex lg:w-auto">
                <SignOutButton />
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
