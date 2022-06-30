import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { env } from "@/store/utils";

export const demoService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api/",
    onError: (err) => toast.error(err.error),
    token: () => localStorage.getItem("access_token"),
  }),
  reducerPath: "demoService",
  endpoints: (builder) => ({
    getDemoById: builder.query({
      transformResponse: (res) => res?.token,
      query: ({ limit, order_by }) => ({
        method: "GET",
        url: `/khach-hang?limit=${limit}&order_by=${order_by}`,
      }),
    }),
  }),
});

export const { useGetDemoByIdQuery, useLazyGetDemoByIdQuery } = demoService;
