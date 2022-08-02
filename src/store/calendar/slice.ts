// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";

// ** Types
import {
  CalendarFiltersType,
  AddEventType,
  EventType,
} from "@/components/Calendar/types";

// ** Fetch Events
export const fetchEvents = createAsyncThunk(
  "appCalendar/fetchEvents",
  async (calendars: CalendarFiltersType[]) => {
    const response = await axios.get("/apps/calendar/events", {
      params: {
        calendars,
      },
    });

    return response.data;
  }
);

// ** Add Event
export const addEvent = createAsyncThunk(
  "appCalendar/addEvent",
  async (event: AddEventType, { dispatch }) => {
    const response = await axios.post("/apps/calendar/add-event", {
      data: {
        event,
      },
    });
    await dispatch(
      fetchEvents(["Personal", "Business", "Family", "Holiday", "ETC"])
    );

    return response.data.event;
  }
);

// ** Update Event
export const updateEvent = createAsyncThunk(
  "appCalendar/updateEvent",
  async (event: EventType, { dispatch }) => {
    const response = await axios.post("/apps/calendar/update-event", {
      data: {
        event,
      },
    });
    await dispatch(
      fetchEvents(["Personal", "Business", "Family", "Holiday", "ETC"])
    );

    return response.data.event;
  }
);

// ** Delete Event
export const deleteEvent = createAsyncThunk(
  "appCalendar/deleteEvent",
  async (id: number | string, { dispatch }) => {
    const response = await axios.delete("/apps/calendar/remove-event", {
      params: { id },
    });
    await dispatch(
      fetchEvents(["Personal", "Business", "Family", "Holiday", "ETC"])
    );

    return response.data;
  }
);

export const appCalendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [
      {
        id: 1,
        url: "",
        title: "Design Review",
        start: "2022-08-03T14:21:41.090Z",
        end: "2022-08-03T16:21:41.090Z",
        allDay: false,
        extendedProps: {
          calendar: "Business",
        },
      },
      {
        id: 2,
        url: "",
        title: "Meeting With Client",
        start: "2022-08-19T17:00:00.000Z",
        end: "2022-08-20T17:00:00.000Z",
        allDay: true,
        extendedProps: {
          calendar: "Business",
        },
      },
      {
        id: 3,
        url: "",
        title: "Family Trip",
        allDay: true,
        start: "2022-08-21T17:00:00.000Z",
        end: "2022-08-23T17:00:00.000Z",
        extendedProps: {
          calendar: "Holiday",
        },
      },
      {
        id: 4,
        url: "",
        title: "Doctor's Appointment",
        start: "2022-08-19T17:00:00.000Z",
        end: "2022-08-20T17:00:00.000Z",
        allDay: true,
        extendedProps: {
          calendar: "Personal",
        },
      },
      {
        id: 5,
        url: "",
        title: "Dart Game?",
        start: "2022-08-12T17:00:00.000Z",
        end: "2022-08-12T17:00:00.000Z",
        allDay: true,
        extendedProps: {
          calendar: "ETC",
        },
      },
      {
        id: 6,
        url: "",
        title: "Meditation",
        start: "2022-08-17T17:00:00.000Z",
        end: "2022-08-18T17:00:00.000Z",
        allDay: true,
        extendedProps: {
          calendar: "Personal",
        },
      },
      {
        id: 7,
        url: "",
        title: "Dinner",
        start: "2022-08-12T17:00:00.000Z",
        end: "2022-08-12T17:00:00.000Z",
        allDay: true,
        extendedProps: {
          calendar: "Family",
        },
      },
      {
        id: 8,
        url: "",
        title: "Product Review",
        start: "2022-08-17T17:00:00.000Z",
        end: "2022-08-18T17:00:00.000Z",
        allDay: true,
        extendedProps: {
          calendar: "Business",
        },
      },
      {
        id: 9,
        url: "",
        title: "Monthly Meeting",
        start: "2022-08-31T17:00:00.000Z",
        end: "2022-08-31T17:00:00.000Z",
        allDay: true,
        extendedProps: {
          calendar: "Business",
        },
      },
      {
        id: 10,
        url: "",
        title: "Monthly Checkup",
        start: "2022-06-30T17:00:00.000Z",
        end: "2022-06-30T17:00:00.000Z",
        allDay: true,
        extendedProps: {
          calendar: "Personal",
        },
      },
    ],
    selectedEvent: null,
    selectedCalendars: ["customers", "co_hoi"],
  },
  reducers: {
    handleSelectEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    handleCalendarsUpdate: (state, action) => {
      const filterIndex = state.selectedCalendars.findIndex(
        (i) => i === action.payload
      );
      if (state.selectedCalendars.includes(action.payload)) {
        state.selectedCalendars.splice(filterIndex, 1);
      } else {
        state.selectedCalendars.push(action.payload);
      }
      if (state.selectedCalendars.length === 0) {
        state.events.length = 0;
      }
    },
    handleAllCalendars: (state, action) => {
      const value = action.payload;
      if (value === true) {
        state.selectedCalendars = [
          "Personal",
          "Business",
          "Family",
          "Holiday",
          "ETC",
        ];
      } else {
        state.selectedCalendars = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload;
    });
  },
});
export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } =
  appCalendarSlice.actions;
