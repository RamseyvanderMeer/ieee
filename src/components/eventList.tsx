import React from "react";
import { LoadingPage } from "~/components/loading";
import { EventView } from "~/components/eventview";
import { api } from "~/utils/api";

export const EventList = () => {
  const { data, isLoading: eventsLoading } = api.events.getAll.useQuery();

  if (eventsLoading)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex grow flex-col overflow-y-scroll">
      {[...data].map((fullEvent) => (
        <EventView {...fullEvent} key={fullEvent.event.id} />
      ))}
    </div>
  );
};
