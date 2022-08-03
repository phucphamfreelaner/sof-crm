import React from "react";
import { isEmpty, uniqueId } from "lodash-es";
import * as UI from "@/libs/ui";
import { useQueryParams } from "@/hooks";
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
  const [addEventSidebarOpen, setAddEventSidebarOpen] =
    React.useState<boolean>(false);

  const handleAddEventSidebarToggle = () =>
    setAddEventSidebarOpen(!addEventSidebarOpen);

  const dispatch = useAppDispatch();

  const [queryParams, setQueryParams] = useQueryParams();

  const { data: dataEvents, refetch } = useGetEventsQuery({
    object: queryParams?.object,
  });

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
          onAfterCreate: () => {
            refetch();
          },
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
        {isEmpty(dataEvents) ? (
          <UI.Center>
            <UI.Typography variant="h6">Không có lịch trình!</UI.Typography>
          </UI.Center>
        ) : (
          <Calendar
            events={dataEvents}
            updateEvent={() => {}}
            calendarsColor={calendarsColor}
            handleSelectEvent={(data) => {
              console.log("🚀 ~ handleSelectEvent", data);
            }}
            handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          />
        )}
      </UI.Card>
      <CalendarSidebar
        object={queryParams?.object}
        onChangeSelect={(data) => {
          setQueryParams({ ...queryParams, object: data });
        }}
        onAddEvent={handleAddEvent}
      />
    </CalendarWrapper>
  );
};

export default AppCalendar;
