import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const loaiHdService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: window?.__BASE_URL__ || "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "loaiHdService",
  endpoints: (builder) => ({
    searchloaiHd: builder.query({
      transformResponse: (response: any) =>
        Object.keys(response).map((key) => ({
          label: response?.[key],
          value: key,
        })),

      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/loai_hd?take=10&s=${name}`,
      }),
    }),
    getLoaiHdById: builder.query({
      transformResponse: (response: any) => response,
      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/loai_hd?take=10&s=${name}`,
      }),
    }),
    getLoaiHdByCode: builder.query({
      transformResponse: (response: any) => response,
      query: ({ code }) => ({
        method: "GET",
        url: `/cau-hinh/group/loai_hd/key/${code}`,
      }),
    }),
    searchBenHd: builder.query({
      transformResponse: (response: any) =>
        Object.keys(response).map((key) => ({
          label: response?.[key],
          value: key,
        })),
      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/ben_hd?take=10&s=${name}`,
      }),
    }),
    searchBenHdById: builder.query({
      transformResponse: (response: any) => response,
      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/ben_hd?take=10&s=${name}`,
      }),
    }),
  }),
});

export const {
  useLazySearchloaiHdQuery,
  useSearchBenHdByIdQuery,
  useGetLoaiHdByIdQuery,
  useSearchloaiHdQuery,
  useLazySearchBenHdQuery,
  useLazyGetLoaiHdByIdQuery,
  useLazyGetLoaiHdByCodeQuery,
} = loaiHdService;
