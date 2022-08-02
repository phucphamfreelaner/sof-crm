import { useState } from "react";
import { isEmpty, uniqueId } from "lodash-es";
import * as UI from "@/libs/ui";

import { useGetEventsQuery } from "@/store/calendar";

import Calendar from "@/components/Calendar";
import { CalendarWrapper } from "./styled";
import CalendarSidebar from "@/components/CalendarSidebar";
import { useAppDispatch } from "@/store";
import { openModalBottom } from "@/store/modal";

const calendarsColor: any = {
  "Cơ hội": "error",
  "Khách hàng": "primary",
  "Báo giá": "warning",
  "Hợp đồng": "success",
};

const AppCalendar = () => {
  const [calendarApi, setCalendarApi] = useState<null | any>(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false);
  const [addEventSidebarOpen, setAddEventSidebarOpen] =
    useState<boolean>(false);

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);

  const handleAddEventSidebarToggle = () =>
    setAddEventSidebarOpen(!addEventSidebarOpen);

  const { data: dataEvents } = useGetEventsQuery({});
  const dispatch = useAppDispatch();

  const handleAddEvent = () => {
    const id = uniqueId();
    dispatch(
      openModalBottom({
        data: {
          title: "Thêm lịch trình mới",
          height: "800px",
          width: "500px",
          id: `event-${id}`,
          type: "event-new",
          customerId: "1111",
        },
      })
    );
  };
  return (
    <CalendarWrapper className="app-calendar">
      <UI.Card
        elevation={10}
        sx={{
          pb: 5,
          pl: 5,
          pr: 3,
          pt: 2.25,
          flexGrow: 1,
          borderRadius: 1,
          boxShadow: "none",
          backgroundColor: "background.paper",
        }}
      >
        {!isEmpty(dataEvents) && (
          <Calendar
            events={dataEvents}
            updateEvent={() => {}}
            calendarApi={calendarApi}
            calendarsColor={calendarsColor}
            setCalendarApi={setCalendarApi}
            handleSelectEvent={(data) => {
              console.log("🚀 ~ handleSelectEvent", data);
            }}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          />
        )}
      </UI.Card>
      <CalendarSidebar onAddEvent={handleAddEvent} />
    </CalendarWrapper>
  );
};

export default AppCalendar;
