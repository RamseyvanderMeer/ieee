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
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="15.000000pt"
            height="15.000000pt"
            viewBox="0 0 100.000000 100.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
              fill="#ffffff"
              stroke="none"
            >
              <path
                d="M255 933 c-64 -33 -156 -125 -189 -190 -22 -44 -23 -52 -10 -57 9 -3
17 -6 19 -6 2 0 16 24 33 53 34 61 112 136 171 166 42 22 46 28 33 47 -5 9
-21 5 -57 -13z"
              />
              <path
                d="M390 904 c-308 -82 -412 -474 -186 -700 241 -240 651 -107 709 230
51 296 -230 548 -523 470z m273 -63 c81 -39 156 -118 188 -199 33 -81 32 -204
-1 -287 -32 -82 -123 -173 -205 -205 -83 -33 -206 -34 -287 -1 -81 32 -160
106 -200 189 -30 61 -33 75 -33 162 0 82 4 103 27 152 48 103 143 185 247 215
76 21 187 11 264 -26z"
              />
              <path
                d="M480 670 c0 -86 -4 -137 -12 -150 -15 -24 -1 -53 28 -58 10 -2 45
-29 77 -60 47 -46 59 -54 67 -42 7 11 -4 28 -45 70 -30 31 -55 63 -55 72 0 9
-4 20 -10 23 -6 4 -10 62 -10 141 0 127 -1 134 -20 134 -19 0 -20 -7 -20 -130z"
              />
              <path
                d="M899 279 c-30 -60 -105 -137 -167 -172 -36 -20 -51 -34 -48 -44 3 -8
6 -17 6 -19 0 -14 105 52 149 93 62 59 127 163 108 175 -21 13 -26 9 -48 -33z"
              />
            </g>
          </svg>
          All
        </button>
        <button
          type="button"
          className="inline-flex items-center border-t border-b border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
          onClick={() => togglePast()}
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="15.000000pt"
            height="15.000000pt"
            viewBox="0 0 96.000000 96.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
              fill="#ffffff"
              stroke="none"
            >
              <path
                d="M387 870 c-49 -13 -113 -45 -160 -83 l-38 -30 -44 43 c-24 23 -48 39
-54 36 -16 -10 -15 -208 1 -224 16 -16 214 -17 224 -1 3 6 -11 28 -31 49 l-38
39 24 21 c13 12 49 33 79 48 46 23 68 27 135 26 95 0 157 -25 220 -89 65 -65
89 -125 89 -225 1 -78 -2 -90 -33 -148 -53 -98 -144 -158 -256 -169 -150 -14
-285 79 -330 228 -22 73 -29 83 -53 87 -79 12 -19 -193 85 -289 24 -22 74 -55
111 -72 61 -29 76 -32 162 -32 86 0 101 3 162 32 93 44 151 100 196 191 34 71
37 82 37 166 0 65 -5 106 -19 143 -38 103 -133 199 -233 237 -56 21 -182 29
-236 16z"
              />
              <path
                d="M452 708 c-8 -8 -12 -51 -12 -128 l0 -116 58 -57 c58 -58 78 -67 100
-45 21 21 13 43 -33 88 l-45 44 0 101 c0 103 -7 125 -40 125 -9 0 -21 -5 -28
-12z"
              />
            </g>
          </svg>
          Past
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-r-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
          onClick={() => toggleUpcoming()}
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="15.000000pt"
            height="15.000000pt"
            viewBox="0 0 96.000000 96.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
              fill="#ffffff"
              stroke="none"
            >
              <path
                d="M380 867 c-78 -23 -123 -49 -180 -107 -125 -124 -154 -297 -75 -456
42 -86 102 -144 193 -187 61 -29 76 -32 162 -32 86 0 101 3 162 32 84 40 147
97 186 171 56 105 62 192 13 192 -23 0 -38 -17 -46 -55 -22 -101 -79 -178
-166 -225 -59 -32 -71 -35 -149 -35 -77 1 -91 4 -148 35 -69 36 -109 79 -144
150 -33 67 -32 196 2 265 31 63 92 124 155 155 74 36 189 35 265 -2 30 -15 66
-36 79 -48 l24 -21 -38 -39 c-20 -21 -34 -43 -31 -49 10 -16 208 -15 224 1 16
16 17 214 1 224 -6 3 -30 -13 -54 -36 l-44 -43 -39 32 c-97 76 -244 109 -352
78z"
              />
              <path
                d="M452 708 c-8 -8 -12 -48 -12 -113 l0 -101 -45 -44 c-46 -45 -54 -67
-33 -88 22 -22 42 -13 100 45 l58 57 0 116 c0 118 -6 140 -40 140 -9 0 -21 -5
-28 -12z"
              />
            </g>
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
