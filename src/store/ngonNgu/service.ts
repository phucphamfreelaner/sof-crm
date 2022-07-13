import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const ngonNguService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "ngonNguService",
  endpoints: (builder) => ({
    getNgonNguList: builder.query({
      transformResponse: (response: any) => response?.data,
      query: ({ name }) => ({
        method: "GET",
        url: `/ngon-ngu?s[ten]=${name}`,
      }),
    }),
    searchNgonNgu: builder.query({
      transformResponse: (response: any) => response?.data?.map((x) => ({})),
      query: ({ name }) => ({
        method: "GET",
        url: `/ngon-ngu?s[ten]=${name}`,
      }),
    }),
  }),
});

export const { useLazyGetNgonNguListQuery } = ngonNguService;
