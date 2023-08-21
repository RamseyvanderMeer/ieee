import React from "react";

export const CalendarComponent = () => {
    return (
      <div className="flex  min-h-[80vh] w-screen justify-center flex-wrap items-center">
        <div className="cal-text text-center w-full m-4">
          <h1 className="text-5xl font-bold">Calendar</h1>
          <a
            href="https://calendar.google.com/calendar/ical/03688n0hmd9vkbv1mp0ollaue0%40group.calendar.google.com/public/basic.ics"
            target="_blank"
            className="italic underline"
          >
            import calendar
          </a>
        </div>
        <div className="calendar__container">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=37b4c899f83aa44711cdfca5abb22f28bb17caeeebaadc7c67c8047f687fb88f%40group.calendar.google.com&ctz=America%2FChicago"
            className="border-0"
            width="800"
            height="600"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    );
}
