import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const activityLogsService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error || "activityLogsService: Có lỗi xẩy ra!");
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "activityLogsService",
  endpoints: (builder) => ({
    getLogByUser: builder.query({
      transformResponse: (response: any) => response?.data,
      query: ({ userId, type }) => ({
        method: "GET",
        url: `/customer/customer-log/${userId}?type=${type}`,
      }),
    }),
  }),
});

export const { useGetLogByUserQuery } = activityLogsService;
