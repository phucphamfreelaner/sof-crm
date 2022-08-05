import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const sanPhamService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "sanPhamService",
  endpoints: (builder) => ({
    searchSanPham: builder.query({
      transformResponse: (response: any) =>
        response?.data.map((x) => ({ label: x.name, value: x.id })),
      query: ({ name }) => ({
        method: "GET",
        url: `/san-pham?order_by[id]=desc&s[name]=${name}&take=10`,
      }),
    }),
    getSanPhamById: builder.query<any, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "GET",
        url: `/san-pham/${id}`,
      }),
    }),
    getSanPhamList: builder.query<any, any>({
      transformResponse: (response: any) => response?.data,
      query: () => ({
        method: "GET",
        url: `/san-pham`,
      }),
    }),
  }),
});

export const {
  useLazySearchSanPhamQuery,
  useLazyGetSanPhamByIdQuery,
  useGetSanPhamByIdQuery,
  useGetSanPhamListQuery,
} = sanPhamService;
