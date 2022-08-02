import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

const OBJECT_LABEL = {
  co_hoi: "Cơ hội",
  customer: "Khách hàng",
};

export const calendarService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "calendarService",
  endpoints: (builder) => ({
    getEventsByObjId: builder.query<
      any,
      { object: "co-hoi" | "bao-gia" | "hop-dong"; objectId: number }
    >({
      transformResponse: (response: any) => response.data,
      query: ({ object, objectId }) => ({
        method: "GET",
        url: `/lich-hen/${object}/${objectId}`,
      }),
    }),
    getEventsByObj: builder.query<
      any,
      { object: "co-hoi" | "bao-gia" | "hop-dong" }
    >({
      transformResponse: (response: any) => response.data,
      query: ({ object }) => ({
        method: "GET",
        url: `/lich-hen/${object}`,
      }),
    }),
    getEvents: builder.query<any, any>({
      transformResponse: (response: any) =>
        response.data?.map((x: any) => ({
          ...x,
          id: x.id,
          title: x.ten,
          start: new Date(x.ngaybatdau),
          end: new Date(x.ngayketthuc),
          allDay: true,
          extendedProps: {
            calendar: OBJECT_LABEL?.[x.object],
          },
        })),
      query: ({}) => ({
        method: "GET",
        url: `/lich-hen?limit=1000`,
      }),
    }),
  }),
});

export const {
  useGetEventsByObjIdQuery,
  useGetEventsByObjQuery,
  useGetEventsQuery,
} = calendarService;
