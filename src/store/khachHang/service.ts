import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const khachHangService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) =>
      toast.error(
        err.error || "Có lỗi xẩy ra: Khách hàng không tồn tại hoặc đã bị xóa!"
      ),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "khachHangService",
  endpoints: (builder) => ({
    searchKhachHangList: builder.query({
      transformResponse: (response: any) =>
        response?.data.map((x) => ({ label: x.contact, value: x.code })),
      query: ({ name }) => ({
        method: "GET",
        url: `/khach-hang?s[contact]=${name}&limit=10&page=1`,
      }),
    }),
  }),
});

export const { useLazySearchKhachHangListQuery } = khachHangService;
