import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

import { IBaoGia } from "@/store/types";

export const baoGiaService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) =>
      toast.error(
        err.error || "Có lỗi xẩy ra: Báo giá không tồn tại hoặc đã bị xóa!"
      ),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "baoGiaService",
  endpoints: (builder) => ({
    getBaoGia: builder.query<
      { data: IBaoGia[] },
      { limit?: number; page?: number; filter?: any; customerId?: any }
    >({
      transformResponse: (response: any) => response,
      query: ({ limit, page, filter, customerId }) => ({
        method: "GET",
        url: `/bao-gia?${
          customerId ? "customer_id=" + customerId : ""
        }limit=${limit}&order_by[created_at]=desc&page=${page}&with[]=khach_hang&with[]=co_hoi&with[]=nhan_vien_nhap&with[]=loai_tien`,
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
  }),
});

export const {
  useGetBaoGiaQuery,
  useLazyCreateBaoGiaQuery,
  useGetViewBaoGiaQuery,
} = baoGiaService;
