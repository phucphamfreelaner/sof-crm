import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";
import { ICoHoiList } from "@/types/coHoi";

export const coHoiService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "coHoiService",
  endpoints: (builder) => ({
    getCoHoiList: builder.query({
      transformResponse: (response: any) => response as ICoHoiList,
      query: ({ limit, page, code, order_by, search }) => ({
        method: "GET",
        url: `/co-hoi?with[]=khach_hang&with[]=tien_trinh&with[]=trang_thai&with[]=nhan_vien_tao&with[]=co_hoi_cskh&with[]=co_hoi_chua_cham_soc&limit=${limit}&page=${page}&s[code]=${code}&${order_by}&s[name]=${search}`,
      }),
    }),
    searchCoHoi: builder.query({
      transformResponse: (response: any) =>
        response?.data?.map?.((x: any) => ({ label: x.name, value: x.id })),
      query: ({ name }) => ({
        method: "GET",
        url: `/co-hoi?limit=20&page=1&s[name]=${name}`,
      }),
    }),
    getCoHoiListByCustomerId: builder.query({
      transformResponse: (response: any) => response as ICoHoiList,
      query: ({ id, limit, page, code, order_by, search }) => ({
        method: "GET",
        url: `/co-hoi?with[]=khach_hang&with[]=tien_trinh&with[]=trang_thai&with[]=nhan_vien_tao&with[]=co_hoi_cskh&with[]=co_hoi_chua_cham_soc&limit=${limit}&page=${page}&s[code]=${code}&${order_by}&s[name]=${search}&customer_id=${id}`,
      }),
    }),
  }),
});

export const {
  useGetCoHoiListQuery,
  useLazyGetCoHoiListQuery,
  useLazySearchCoHoiQuery,
  useGetCoHoiListByCustomerIdQuery,
  useLazyGetCoHoiListByCustomerIdQuery,
} = coHoiService;
