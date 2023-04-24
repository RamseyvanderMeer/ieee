import React from "react";
import type { NextPage } from "next";
import { PageLayout } from "~/components/layout";
import { EventList } from "~/components/eventList";

const events: NextPage = () => {
  return (
    <PageLayout>
      <EventList />
    </PageLayout>
  );
};

export default events;
