/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import type { NextPage } from "next";
import { PageLayout } from "~/components/layout";
import axios from "axios";

const FormPage: NextPage = () => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [sender, setSender] = useState("");
  const [email, setEmail] = useState("");

  const SendMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
      alert("Message Sent");
    //   const nextURL = "/";
    //   const nextTitle = "Home Page";
    //   const nextState = { additionalInformation: "Updated the URL with JS" };

      // This will create a new entry in the browser's history, without reloading
    //   window.history.pushState(nextState, nextTitle, nextURL);
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
    <PageLayout>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden ">
        <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
          <h1 className="text-center text-4xl font-bold uppercase text-indigo-700">
            Contact:
          </h1>
          <form className="mt-6" onSubmit={SendMail} onReset={ClearForm}>
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Your name</span>
                <input
                  type="text"
                  name="name"
                  value={sender}
                  required
                  onChange={(e) => setSender(e.target.value)}
                  className="

            mt-2
            block w-full rounded-md border-gray-300
            px-2
            py-2
            text-black
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50

          "
                  placeholder="example"
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Email address</span>
                <input
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="
            mt-2
            block
            w-full rounded-md border-gray-300
            px-2
            py-2
            text-black
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50

          "
                  placeholder="example@example.com"
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Subject</span>
                <input
                  name="subject"
                  type="text"
                  value={subject}
                  required
                  onChange={(e) => setSubject(e.target.value)}
                  className="
            mt-2
            block
            w-full rounded-md border-gray-300
            px-2
            py-2
            text-black
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50

          "
                  placeholder="subject"
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Message</span>
                <textarea
                  name="message"
                  value={message}
                  required
                  onChange={(e) => setMessage(e.target.value)}
                  className="
            mt-2
            block
            w-full rounded-md border-gray-300
            px-2
            py-2
            text-black
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                  rows={5}
                ></textarea>
              </label>
            </div>

            <div className="mb-6 flex w-full flex-row justify-between">
              <button
                type="reset"
                className="
            focus:shadow-outline
            mt-2
            h-10
            rounded-lg
            bg-indigo-700
            px-5
            text-indigo-100
            transition-colors
            duration-150
            hover:bg-indigo-800
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
            bg-indigo-700
            px-5
            text-indigo-100
            transition-colors
            duration-150
            hover:bg-indigo-800
          "
              >
                Submit
              </button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default FormPage;
