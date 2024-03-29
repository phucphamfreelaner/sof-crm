import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";
import { omit } from "lodash-es";

import { IBaoGia } from "@/store/types";

export const baoGiaService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: window?.__BASE_URL__ || "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error || "Có lỗi xẩy ra!"),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "baoGiaService",
  endpoints: (builder) => ({
    getBaoGia: builder.query<
      { data: IBaoGia[] },
      { limit?: number; page?: number; filter?: any; customerId?: any }
    >({
      transformResponse: (response: any) => response,
      query: ({ limit, page, filter = {}, customerId }) => ({
        method: "GET",
        url: `/bao-gia`,
        params: {
          limit,
          page,
          with: ["khach_hang", "co_hoi", "nhan_vien_nhap", "loai_tien"],
          customer_id: customerId,
          order_by: {
            created_at: "desc",
          },
          ...omit(filter, ["code"]),
          s: {
            code: filter?.code,
          },
        },
      }),
    }),
    createBaoGia: builder.query<{ data: any }, { payload: any }>({
      transformResponse: (response: any) => response,
      query: ({ payload }) => ({
        method: "POST",
        data: payload,
        url: `/bao-gia`,
      }),
    }),
    getViewBaoGia: builder.query<string, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "GET",
        url: `/bao-gia/${id}/view`,
      }),
    }),
    getBaoGiaById: builder.query<any, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "GET",
        url: `/bao-gia/${id}`,
      }),
    }),
    putBaoGiaById: builder.query<any, { id: any; payload: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id, payload }) => ({
        method: "PUT",
        url: `/bao-gia/${id}`,
        data: payload,
      }),
    }),
    deleteBaoGia: builder.query<any, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "DELETE",
        url: `/bao-gia/${id}`,
      }),
    }),
  }),
});

export const {
  useGetBaoGiaQuery,
  useLazyCreateBaoGiaQuery,
  useGetViewBaoGiaQuery,
  useLazyGetViewBaoGiaQuery,
  useLazyDeleteBaoGiaQuery,
  useGetBaoGiaByIdQuery,
  useLazyPutBaoGiaByIdQuery,
} = baoGiaService;
