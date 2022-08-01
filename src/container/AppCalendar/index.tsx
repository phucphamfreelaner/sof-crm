// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Redux Imports
import { useDispatch, useSelector } from "react-redux";

// ** Hooks

// ** Types
import { RootState, AppDispatch } from "@/store";

import {
  CalendarColors,
  CalendarFiltersType,
} from "@/components/Calendar/types";

// ** FullCalendar & App Components Imports
import Calendar from "@/components/Calendar";
import SidebarLeft from "@/components/Calendar/SidebarLeft";
import AddEventSidebar from "@/components/Calendar/AddEventSidebar";
import { CalendarWrapper } from "./styled";

// ** Actions
import {
  addEvent,
  fetchEvents,
  deleteEvent,
  updateEvent,
  handleSelectEvent,
  handleAllCalendars,
  handleCalendarsUpdate,
} from "@/store/calendar";

// ** Third Party Styles Imports
import "react-datepicker/dist/react-datepicker.css";

// ** CalendarColors
const calendarsColor: CalendarColors = {
  Personal: "error",
  Business: "primary",
  Family: "warning",
  Holiday: "success",
  ETC: "info",
};

const AppCalendar = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState<null | any>(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false);
  const [addEventSidebarOpen, setAddEventSidebarOpen] =
    useState<boolean>(false);

  // ** Hooks
  const settings = {
    skin: "",
    direction: "",
  };
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.calendar);

  // ** Vars
  const leftSidebarWidth = 260;
  const addEventSidebarWidth = 400;
  const { skin, direction } = settings;
  const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);

  const handleAddEventSidebarToggle = () =>
    setAddEventSidebarOpen(!addEventSidebarOpen);

  return (
    <CalendarWrapper
      className="app-calendar"
      sx={{
        boxShadow: skin === "bordered" ? 0 : 6,
        ...(skin === "bordered" && {
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }),
      }}
    >
      <SidebarLeft
        store={store}
        mdAbove={mdAbove}
        dispatch={dispatch}
        calendarsColor={calendarsColor}
        leftSidebarOpen={leftSidebarOpen}
        leftSidebarWidth={leftSidebarWidth}
        handleSelectEvent={handleSelectEvent}
        handleAllCalendars={handleAllCalendars}
        handleCalendarsUpdate={handleCalendarsUpdate}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
      />
      <Box
        sx={{
          pb: 5,
          px: 5,
          pt: 2.25,
          flexGrow: 1,
          borderRadius: 1,
          boxShadow: "none",
          backgroundColor: "background.paper",
          ...(mdAbove
            ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
            : {}),
        }}
      >
        <Calendar
          store={store}
          dispatch={dispatch}
          direction={"ltr"}
          updateEvent={updateEvent}
          calendarApi={calendarApi}
          calendarsColor={calendarsColor}
          setCalendarApi={setCalendarApi}
          handleSelectEvent={handleSelectEvent}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        />
      </Box>
      <AddEventSidebar
        store={store}
        dispatch={dispatch}
        addEvent={addEvent}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
        calendarApi={calendarApi}
        drawerWidth={addEventSidebarWidth}
        handleSelectEvent={handleSelectEvent}
        addEventSidebarOpen={addEventSidebarOpen}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
      />
    </CalendarWrapper>
  );
};

export default AppCalendar;
