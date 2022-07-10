import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

import { IBaoGia } from "@/store/types";

export const baoGiaService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "baoGiaService",
  endpoints: (builder) => ({
    getBaoGia: builder.query<{ data: IBaoGia[] }, { limit?: number }>({
      transformResponse: (response: any) => response,
      query: ({ limit }) => ({
        method: "GET",
        url: `/bao-gia?with[]=khach_hang&with[]=co_hoi&with[]=nhan_vien_nhap&with[]=loai_tien&limit=${limit}&order_by[created_at]=desc`,
      }),
    }),
  }),
});

export const { useGetBaoGiaQuery } = baoGiaService;
