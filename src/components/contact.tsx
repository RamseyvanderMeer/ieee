/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export const Contact = () => {
  const { user, isSignedIn } = useUser();

  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [sender, setSender] = useState("");
  const [email, setEmail] = useState("");

  const SendMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isSignedIn) {
        const signedInSender = user?.username;
        const signedInEmail = user?.emailAddresses?.[0]?.emailAddress;
        const response = await axios.post("/api/email", {
          message,
          subject,
          sender: signedInSender,
          email: signedInEmail,
        });
        if (response.status === 200) {
          setMessage("");
          setSubject("");
          setSender("");
          setEmail("");
        }
      } else {
        const response = await axios.post("/api/email", {
          message,
          subject,
          sender,
          email,
        });
        if (response.status === 200) {
          setMessage("");
          setSubject("");
          setSender("");
          setEmail("");
        }
      }
      alert("Message Sent");
    } catch (error) {
      console.log(error);
    }
  };

  const ClearForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setSubject("");
    setSender("");
    setEmail("");
  };

  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden ">
      {!isSignedIn && (
        <form className="w-11/12 rounded-xl border-2  border-gray-400 p-6 md:w-6/12">
          <h2 className="mb-8 text-6xl font-bold">Contact Us</h2>
          <div className="pt-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                @
              </span>
              <input
                type="text"
                name="name"
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your Username"
                disabled
              />
            </div>
          </div>
          <div className="pt-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Your Email
            </label>
            <div className="flex">
              <div className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                name="email"
                type="email"
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="netid@illinois.edu"
                disabled
              />
            </div>
          </div>
          <div className="pt-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Subject
            </label>
            <input
              name="subject"
              type="text"
              placeholder="Please sign in to send a message"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
              disabled
            />
          </div>
          <div className="mb-6 pt-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Message
            </label>
            <input
              name="message"
              placeholder="Please sign in to send a message"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              disabled
            />
          </div>
          <div className="mb-6 flex w-full flex-row justify-between">
            <button
              disabled
              type="reset"
              className="
            focus:shadow-outline
            mt-2
            h-10
            rounded-lg
            bg-gray-700
            px-5
            text-indigo-100
          "
            >
              Clear
            </button>

            <button
              disabled
              type="submit"
              className="
            focus:shadow-outline
            mt-2
            h-10
            rounded-lg
            bg-gray-700
            px-5
            text-indigo-100
          "
            >
              Submit
            </button>
          </div>
        </form>
      )}
      {isSignedIn && (
        <form
          onSubmit={SendMail}
          onReset={ClearForm}
          className="w-11/12 rounded-xl border-2  border-gray-400 p-6 md:w-6/12"
        >
          <h2 className="mb-8 text-6xl font-bold">Contact Us</h2>
          <div className="pt-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                @
              </span>
              <input
                type="text"
                id="website-admin"
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder={user?.username as string}
                disabled
              />
            </div>
          </div>
          <div className="pt-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Your Email
            </label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </span>
              <input
                name="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder={user?.emailAddresses[0]?.emailAddress as string}
                disabled
              />
            </div>
          </div>
          <div className="pt-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Subject
            </label>
            <input
              name="subject"
              type="text"
              value={subject}
              required
              onChange={(e) => setSubject(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
            />
          </div>
          <div className="mb-6 pt-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Message
            </label>
            <input
              name="message"
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
              className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div className="mb-6 flex w-full flex-row justify-between">
            <button
              type="reset"
              className="
            focus:shadow-outline
            mt-2
            h-10
            rounded-lg
            bg-gray-700
            px-5
            text-indigo-100
            transition-colors
            duration-150
            hover:bg-indigo-900
          "
            >
              Clear
            </button>

            <button
              type="submit"
              className="
            focus:shadow-outline
            mt-2
            h-10
            rounded-lg
            bg-gray-700
            px-5
            text-indigo-100
            transition-colors
            duration-150
            hover:bg-indigo-900
          "
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
