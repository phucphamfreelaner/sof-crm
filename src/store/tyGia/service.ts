import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const tyGiaService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: window?.__BASE_URL__ || "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "tyGiaService",
  endpoints: (builder) => ({
    searchTyGiaGia: builder.query<any, { name: string }>({
      transformResponse: (response: any) => response,
      query: ({ name }) => ({
        method: "GET",
        url: `/ty-gia?s[ten]=${name}`,
      }),
    }),
  }),
});

export const { useSearchTyGiaGiaQuery, useLazySearchTyGiaGiaQuery } =
  tyGiaService;
