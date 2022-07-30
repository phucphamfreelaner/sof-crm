import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";
import { omit } from "lodash-es";

import { INhiemVu } from "@/store/types";

export const nhiemVuService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error || "Có lỗi xẩy ra!"),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "nhiemVuService",
  endpoints: (builder) => ({
    getNhiemVuCohoi: builder.query<
      { data: INhiemVu[] },
      {
        cohoi_id?: any;
      }
    >({
      transformResponse: (response: any) => response?.data,
      query: ({ cohoi_id }) => ({
        method: "GET",
        url: `/nhiem-vu-doi-tuong/co_hoi/${cohoi_id}`,
      }),
    }),
    createNhiemVu: builder.mutation<{ data: any }, { payload: any }>({
      transformResponse: (response: any) => response,
      query: ({ payload }) => ({
        method: "POST",
        data: payload,
        url: `/nhiem-vu-doi-tuong`,
      }),
    }),
    getLoaiNhiemVu: builder.query<any, { search?: any }>({
      transformResponse: (response: any) => response,
      query: ({ search }) => ({
        method: "GET",
        url: `/cau-hinh/group/loai_nhiem_vu`,
        params: {
          s: search,
          take: 10,
        },
      }),
    }),
    getDanhGiaNhiemVu: builder.query<any, { search?: any }>({
      transformResponse: (response: any) => response,
      query: ({ search }) => ({
        method: "GET",
        url: `/cau-hinh/group/danh_gia_nhiem_vu`,
        params: {
          s: search,
          take: 10,
        },
      }),
    }),
    getTrangThaiNhiemVu: builder.query<any, { search?: any }>({
      transformResponse: (response: any) => response,
      query: ({ search }) => ({
        method: "GET",
        url: `/cau-hinh/group/trang_thai_nhiem_vu`,
        params: {
          s: search,
          take: 10,
        },
      }),
    }),
    putNhiemVuById: builder.mutation<any, { id: any; payload: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id, payload }) => ({
        method: "PUT",
        url: `/nhiem-vu-doi-tuong/${id}`,
        data: payload,
      }),
    }),
    deleteNhiemVu: builder.query<any, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "DELETE",
        url: `/nhiem-vu-doi-tuong/${id}`,
      }),
    }),
  }),
});

export const {
  useGetNhiemVuCohoiQuery,
  useLazyGetNhiemVuCohoiQuery,
  useCreateNhiemVuMutation,
  useLazyDeleteNhiemVuQuery,
  usePutNhiemVuByIdMutation,
  useGetLoaiNhiemVuQuery,
  useLazyGetLoaiNhiemVuQuery,
  useLazyGetDanhGiaNhiemVuQuery,
  useLazyGetTrangThaiNhiemVuQuery,
} = nhiemVuService;
