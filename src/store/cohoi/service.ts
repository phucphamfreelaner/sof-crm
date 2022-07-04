import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";
import { ICohoi } from "@/types/cohoi";

export const cohoiService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "cohoiService",
  endpoints: (builder) => ({
    getCohoiList: builder.query({
      transformResponse: (response: any) => response?.data as ICohoi[],
      query: ({ limit = 0, page = 1, name }) => ({
        method: "GET",
        url: `/co-hoi?limit=${limit}&page=${page}&s[name]=${name}`,
      }),
    }),
  }),
});

export const { useGetCohoiListQuery, useLazyGetCohoiListQuery } = cohoiService;
