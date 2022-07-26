import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const trangThaiService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "trangThaiService",
  endpoints: (builder) => ({
    getTrangThaiList: builder.query({
      transformResponse: (response: any) => response,
      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/tinh_trang_co_hoi?s=${name}&take=10`,
      }),
    }),
    searchTrangThaiList: builder.query({
      transformResponse: (response: any) =>
        Object.keys(response).map((key) => {
          return { label: response[key], value: key };
        }),
      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/tinh_trang_co_hoi?s=${name}&take=10`,
      }),
    }),
    getTrangThaiOptions: builder.query({
      transformResponse: (response: any) =>
        Object.keys(response).map((key) => {
          return { label: response[key], value: key };
        }),
      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/tinh_trang_co_hoi?s=${name}&take=10`,
      }),
    }),
    getTrangThaiByKey: builder.query({
      transformResponse: (response: any) => response,
      query: ({ key }) => ({
        method: "GET",
        url: `/cau-hinh/group/tinh_trang_co_hoi/key/${key}`,
      }),
    }),
  }),
});

export const {
  useGetTrangThaiListQuery,
  useLazyGetTrangThaiListQuery,
  useLazySearchTrangThaiListQuery,
  useLazyGetTrangThaiOptionsQuery,
  useLazyGetTrangThaiByKeyQuery,
} = trangThaiService;
