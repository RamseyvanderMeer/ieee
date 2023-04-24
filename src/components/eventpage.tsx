/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";
import { LoadingSpinner } from "./loading";
import { EventView } from "./eventview";
import { LoadingPage } from "~/components/loading";

type EventWithUser = RouterOutputs["events"]["getAll"][number];
export const EventPage = (props: EventWithUser) => {
  const ctx = api.useContext();

  const { mutate, isLoading: isDeleting } =
    api.events.deleteEventsByEventId.useMutation({
      onSuccess: () => {
            void ctx.events.getAll.invalidate();
            window.location.href = "/events"
      },
      onError: () => {
        toast.error("Failed to delete event! Please try again later.");
      },
    });
  const { mutateAsync, isLoading: isEditing } =
    api.events.editEventsByEventId.useMutation({
      onSuccess: () => {
        void ctx.events.getAll.invalidate();
      },
      onError: () => {
        toast.error("Failed to edit event! Please try again later.");
      },
    });

  const { event, author } = props;
  const { user } = useUser();
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [newDate, setDate] = useState(event.date);
  const [images, setImages] = useState(event.images);

  const editImage = (idx: number, value: string) => {
    const newImages = [...images];
    newImages[idx] = value;
    setImages(newImages);
  };
  const addImage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setImages([...images, "edit me"]);
  };
  const deleteImage = (event: React.MouseEvent<HTMLElement>, idx: number) => {
    event.preventDefault();
    const newImages = [...images];
    newImages.splice(idx, 1);
    setImages(newImages);
  };

  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const d = new Date(newDate);
      await mutateAsync({ id: event.id, name, description, date: d, images });
    } catch (error) {
      console.log("error");
    }
  };

  const ClearForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName("");
    setDescription("");
    setImages([]);
    setDate(new Date());
  };

  if (user?.id !== author.id) return <EventView {...props} />;

  return (
    <>
      {!isEditing ? (
        <form
          key={event.id}
          className="flex w-full flex-col gap-3 border-b border-slate-400 p-4"
          onSubmit={submitEvent}
          onReset={ClearForm}
        >
          <div className="relative flex w-full flex-row items-center justify-between ">
            <input
              className="bg-black text-2xl font-bold text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="relative flex flex-row items-center">
              <input
                type="datetime-local"
                name="date"
                id="date"
                className="text-black"
                value={dayjs(newDate).format("YYYY-MM-DDTHH:mm")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setDate(new Date(e.target.value));
                }}
              />
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
            <textarea
              className="w-6/12 bg-black text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
            <div>
              {images.length > 0 && (
                <div className="flex w-full flex-col gap-2">
                  {images.map((image, idx) => (
                    <div key={idx}>
                      <input
                        className="w-8/12 bg-black text-white"
                        key={idx}
                        value={image}
                        onChange={(e) => editImage(idx, e.target.value)}
                      />
                      <button onClick={(e) => deleteImage(e, idx)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={(e) => addImage(e)}
                className="bg-black text-white"
              >
                {" "}
                Add Image{" "}
              </button>
            </div>
          </div>

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
        </form>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};
