import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const soLuongService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: window?.__BASE_URL__ || "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "soLuongService",
  endpoints: (builder) => ({
    getSoLuongList: builder.query({
      transformResponse: (response: any) => response,
      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/so_luong?s=${name}&take=10`,
      }),
    }),
    getSoLuongByName: builder.query({
      transformResponse: (response: any) => response,
      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/so_luong?s=${name}&take=10`,
      }),
    }),
    getSoLuongByValue: builder.query({
      transformResponse: (response: any) => response,
      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/so_luong/key/${name}`,
      }),
    }),
    getSoLuongOptions: builder.query({
      transformResponse: (response: any) =>
        Object.keys(response).map((key) => {
          return { label: response[key], value: key };
        }),
      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/so_luong?s=${name}&take=10`,
      }),
    }),
  }),
});

export const {
  useGetSoLuongListQuery,
  useLazyGetSoLuongListQuery,
  useLazyGetSoLuongOptionsQuery,
  useLazyGetSoLuongByNameQuery,
  useLazyGetSoLuongByValueQuery,
} = soLuongService;
