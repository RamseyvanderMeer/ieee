import React from "react";
import type { NextPage } from "next";
import { EventList } from "~/components/eventList";

const events: NextPage = () => {
  return (
      <EventList />
  );
};

export default events;
