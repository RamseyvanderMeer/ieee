import React, { useEffect, useState } from "react";
import { LoadingPage } from "~/components/loading";
import { EventView } from "~/components/eventview";
import { api } from "~/utils/api";

export const EventList = () => {
  const { data, isLoading: eventsLoading } = api.events.getAll.useQuery();
  const [all, setAll] = useState(true);
  const [past, setPast] = useState(false);
  const [upcoming, setUpcoming] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (all) {
      setFilteredData(data?.filter((event) => event.event.published));
    } else if (past) {
      setFilteredData(
        data?.filter(
          (event) => event.event.published && event.event.date < new Date()
        )
      );
    } else if (upcoming) {
      setFilteredData(
        data?.filter(
          (event) => event.event.published && event.event.date > new Date()
        )
      );
    }
  }, [all, past, upcoming]);

  const toggleAll = () => {
    console.log("toggle all");
    setAll(true);
    setPast(false);
    setUpcoming(false);
  };
  const togglePast = () => {
    console.log("toggle past");
    setAll(false);
    setPast(true);
    setUpcoming(false);
  };
  const toggleUpcoming = () => {
    console.log("toggle upcoming");
    setAll(false);
    setPast(false);
    setUpcoming(true);
  };

  if (eventsLoading)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex grow flex-col items-center overflow-x-hidden">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          className="inline-flex items-center rounded-l-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
          onClick={() => toggleAll()}
        >
          <svg
            aria-hidden="true"
            className="mr-2 h-4 w-4 fill-current"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            ></path>
          </svg>
          All
        </button>
        <button
          type="button"
          className="inline-flex items-center border-t border-b border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
          onClick={() => togglePast()}
        >
          <svg
            aria-hidden="true"
            className="mr-2 h-4 w-4 fill-current"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
          </svg>
          Past
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-r-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
          onClick={() => toggleUpcoming()}
        >
          <svg
            aria-hidden="true"
            className="mr-2 h-4 w-4 fill-current"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
              clipRule="evenodd"
            ></path>
          </svg>
          Future
        </button>
      </div>

      {all && (
        <div className="h-full w-full">
          {data
            ?.filter((event) => event.event.published)
            .map((fullPost) => (
              <EventView {...fullPost} key={`${fullPost.event.id}-all`} />
            ))}
        </div>
      )}
      {!all && (
        <div className="h-full w-full">
          {filteredData?.map((fullPost) => (
            <EventView {...fullPost} key={fullPost.event.id} />
          ))}
        </div>
      )}
    </div>
  );
};
