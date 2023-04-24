import React from "react";
import type { NextPage } from "next";
import { EventList } from "~/components/eventList";

const events: NextPage = () => {
  return (
    <div>
      <EventList />
      </div>
  );
};

export default events;
