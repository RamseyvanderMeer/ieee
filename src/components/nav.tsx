/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import logo from "~/images/logo.png";
import { useSession, signIn, signOut } from "next-auth/react";

export const Nav: React.FC = () => {
  const { data: session, status } = useSession();

  const [active, setActive] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    setActive(!active);
  };

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (status === "authenticated") {
      setIsSignedIn(true);
    }
  }, []);

  return (
    <>
      <nav className="flex flex-wrap items-center border-b border-white bg-black p-3">
        <Link href="/">
          <Image height={45} src={logo} alt="logo" />
        </Link>
        <button
          className=" ml-auto inline-flex rounded p-3 text-white outline-none hover:cursor-pointer hover:bg-gray-800 hover:text-white md:hidden"
          onClick={handleClick}
        >
          <div className="h-8 w-8">
            <div
              className={`transition-all duration-500 ease-in-out
                ${
                  active
                    ? "relative my-[7px] mx-[7px] w-[35px] -translate-x-[9px] translate-y-[9px] -rotate-45 rounded-sm bg-white p-px"
                    : "my-[7px] w-[35px] rounded-sm bg-white p-px"
                }`}
            ></div>
            <div
              className={` transition-all duration-500 ease-in-out
                ${
                  active
                    ? "my-[7px] w-[35px] rounded-sm bg-white p-px opacity-0"
                    : "my-[7px] w-[35px] rounded-sm bg-white p-px"
                }`}
            ></div>
            <div
              className={` transition-all duration-500 ease-in-out
                ${
                  active
                    ? "relative my-[7px] mx-[7px] w-[35px] -translate-x-[9px] -translate-y-[9px] rotate-45 rounded-sm bg-white p-px"
                    : " my-[7px] w-[35px] rounded-sm bg-white p-px"
                }`}
            ></div>
          </div>
        </button>
        <div
          className={`${
            active
              ? "inline-block h-auto max-h-screen translate-x-0"
              : "h-0 w-full flex-col items-start overflow-hidden opacity-0 md:relative md:ml-auto md:inline-flex md:h-auto md:w-auto md:translate-x-0  md:flex-row md:items-center md:opacity-100"
          }   w-full transition duration-500 ease-in-out md:inline-flex md:w-auto md:flex-grow`}
        >
          <div className="flex w-full flex-col items-start md:ml-auto md:inline-flex md:h-auto  md:w-auto md:flex-row md:items-center">
            <Link href="/">
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white md:inline-flex md:w-auto ">
                Home
              </div>
            </Link>
            <Link href="/calendar">
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white md:inline-flex md:w-auto">
                Events
              </div>
            </Link>
            <Link href="/about">
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white md:inline-flex md:w-auto">
                About
              </div>
            </Link>
            <Link href="/contact">
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white md:inline-flex md:w-auto">
                Contact
              </div>
            </Link>
            {!isSignedIn && !isLoading && (
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white md:inline-flex md:w-auto">
                <button onClick={signIn as any}>Sign In</button>
              </div>
            )}
            {/* {isSignedIn && user && (
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white md:inline-flex md:w-auto">
                <Link href={`/@${user.username as string}`}>Profile</Link>
              </div>
            )} */}
            {isSignedIn && !isLoading && (
              <div className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-slate-800 hover:text-white md:inline-flex md:w-auto">
                <button onClick={signOut as any}>Sign out</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
