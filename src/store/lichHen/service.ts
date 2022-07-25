import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";
import { omit } from "lodash-es";

import { ILichHen } from "@/store/types";

export const lichHenService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error || "Có lỗi xẩy ra!"),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "lichHenService",
  endpoints: (builder) => ({
    getLichHen: builder.query<
      { data: ILichHen[] },
      { limit?: number; page?: number; filter?: any; customerId?: any }
    >({
      transformResponse: (response: any) => response,
      query: ({ limit, page, filter = {}, customerId }) => ({
        method: "GET",
        url: `/lich-hen`,
        params: {
          limit,
          page,
          with: ["khach_hang"],
          customer_id: customerId,
          order_by: {
            created_at: "desc",
          },
          ...filter,
          //s: filter,
        },
      }),
    }),
    createLichHen: builder.query<{ data: any }, { payload: any }>({
      transformResponse: (response: any) => response,
      query: ({ payload }) => ({
        method: "POST",
        data: payload,
        url: `/lich-hen`,
      }),
    }),
    getViewLichHen: builder.query<string, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "GET",
        url: `/lich-hen/${id}/view`,
      }),
    }),
    getLichHenById: builder.query<any, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "GET",
        url: `/lich-hen/${id}`,
      }),
    }),
    putLichHenById: builder.query<any, { id: any; payload: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id, payload }) => ({
        method: "PUT",
        url: `/lich-hen/${id}`,
        data: payload,
      }),
    }),
    deleteLichHen: builder.query<any, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "DELETE",
        url: `/lich-hen/${id}`,
      }),
    }),
  }),
});

export const {
  useGetLichHenQuery,
  useLazyCreateLichHenQuery,
  useGetViewLichHenQuery,
  useLazyDeleteLichHenQuery,
  useGetLichHenByIdQuery,
  useLazyPutLichHenByIdQuery,
} = lichHenService;
