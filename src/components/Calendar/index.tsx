// ** React Import
import { useEffect, useRef } from "react";

// ** Full Calendar & it's Plugins
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { viLocale } from "./viLocale";
// ** Icons Imports
import { AiOutlineMenu } from "react-icons/ai";

// ** Types
import { CalendarType } from "./types";

const blankEvent = {
  title: "",
  start: "",
  end: "",
  allDay: false,
  url: "",
  extendedProps: {
    calendar: "",
    guests: [],
    location: "",
    description: "",
  },
};

const Calendar = (props: CalendarType) => {
  // ** Props
  const {
    events,
    updateEvent,
    calendarApi,
    calendarsColor,
    setCalendarApi,
    handleSelectEvent,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle,
  } = props;

  // ** Refs
  const calendarRef = useRef();

  useEffect(() => {
    if (calendarApi === null) {
      // @ts-ignore
      setCalendarApi(calendarRef?.current?.getApi());
    }
  }, [calendarApi, setCalendarApi]);

  if (events) {
    // ** calendarOptions(Props)
    const calendarOptions = {
      events: events.length ? events : [],
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: "dayGridMonth",
      locales: [viLocale],
      locale: "vi",
      headerToolbar: {
        start: "sidebarToggle, prev, next, title",
        end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      },

      height: "calc(100vh - 100px)",
      contentHeight: "calc(100vh - 100px)",

      /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
      editable: true,

      /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
      eventResizableFromStart: true,

      /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
      dragScroll: true,

      /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
      dayMaxEvents: 2,

      /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
      navLinks: true,

      eventClassNames({ event: calendarEvent }: any) {
        // @ts-ignore
        const colorName =
          calendarsColor[calendarEvent._def.extendedProps.calendar];

        return [
          // Background Color
          `bg-${colorName}`,
        ];
      },

      eventClick({ event: clickedEvent }: any) {
        handleAddEventSidebarToggle();

        // * Only grab required field otherwise it goes in infinity loop
        // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
        // event.value = grabEventDataFromEventApi(clickedEvent)

        // isAddNewEventSidebarActive.value = true
      },

      customButtons: {
        sidebarToggle: {
          text: <AiOutlineMenu />,
          click() {
            handleLeftSidebarToggle();
          },
        },
      },

      dateClick(info: any) {
        const ev = { ...blankEvent };
        ev.start = info.date;
        ev.end = info.date;
        ev.allDay = true;

        // @ts-ignore
        dispatch(handleSelectEvent(ev));
        handleAddEventSidebarToggle();
      },

      /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
      eventDrop({ event: droppedEvent }: any) {},

      /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
      eventResize({ event: resizedEvent }: any) {},

      ref: calendarRef,
    };

    // @ts-ignore
    return <FullCalendar {...calendarOptions} />;
  } else {
    return null;
  }
};

export default Calendar;
