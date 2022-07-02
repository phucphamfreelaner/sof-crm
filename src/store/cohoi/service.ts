import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";
import { ICohoi } from "@/types/cohoi";

export const cohoiService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "cohoiService",
  endpoints: (builder) => ({
    getCohoiList: builder.query({
      transformResponse: (response: any) => response?.data as ICohoi[],
      query: ({ limit, page }) => ({
        method: "GET",
        url: `/co-hoi?with[]=khach_hang&with[]=tien_trinh&with[]=trang_thai&with[]=nhan_vien_tao&with[]=co_hoi_cskh&with[]=co_hoi_chua_cham_soc&limit=${limit}&page=${page}&order_by%5Bcreated_at%5D=desc`,
      }),
    }),
  }),
});

export const { useGetCohoiListQuery } = cohoiService;
