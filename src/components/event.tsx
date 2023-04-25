import React from "react";
import { LoadingPage } from "~/components/loading";
import { EventView } from "~/components/eventview";
import { api } from "~/utils/api";
import Link from "next/link";


export const Event = () => {
  const { data, isLoading: eventLoading } = api.events.getOne.useQuery();

  if (eventLoading)
    return (
      <div className="relative min-h-screen w flex w-screen grow">
        <LoadingPage />
      </div>
    );

    if (!data) return <div>Something went wrong</div>;

  return (
      <div className="relative flex min-h-screen w-screen grow flex-col overflow-x-hidden">

          <Link href={`/events`}
          className="text-4xl font-bold text-center">
            Upcoming Event:
          </Link>
          {data[0] &&
              <EventView key={data[0]?.event.id} {...data[0]} />
          }
    </div>
  );
};
