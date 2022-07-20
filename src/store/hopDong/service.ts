import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";
import { IGetHopDongList, IHopDong } from "@/types/hopDong";

export const hopDongService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "hopDongService",
  endpoints: (builder) => ({
    getHopDongById: builder.query({
      transformResponse: (res) => res?.data as IHopDong,
      query: ({ id }) => ({
        method: "GET",
        url: `/hop-dong/${id}`,
      }),
    }),
    putHopDongById: builder.query<any, { id: any; payload: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id, payload }) => ({
        method: "PUT",
        url: `/hop-dong/${id}`,
        data: payload,
      }),
    }),
    // createHopDong: builder.mutation({
    //   transformResponse: (res) => res,
    //   query: ({ ...body }) => ({
    //     method: "POST",
    //     url: `/hop-dong`,
    //     data: body,
    //   }),
    // }),
    createHopDong: builder.query<{ data: any }, { payload: any }>({
      transformResponse: (response: any) => response,
      query: ({ payload }) => ({
        method: "POST",
        data: payload,
        url: `/hop-dong`,
      }),
    }),
    deleteHopDong: builder.query<any, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "DELETE",
        url: `/hop-dong/${id}`,
      }),
    }),
    getViewHopDong: builder.query<string, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "GET",
        url: `/hop-dong/${id}/view`,
      }),
    }),
    getHopDongByCustomerId: builder.query<string, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "GET",
        url: `/hop-dong?customer_id=${id}&with[]=loai_tien&with[]=nhan_vien_tao&with[]=dai_dien&with[]=loai_hop_dong&with[]=bao_gia&limit=100&with[]=khach_hang&with[]=bao_gia_co_hoi_tien_trinh&view=pagination&order_by[id]=desc`,
      }),
    }),
    getHopDongList: builder.query({
      transformResponse: (response: any) => response as IGetHopDongList,
      query: ({ limit, page, name, order_by, search, customerQuery }) => ({
        method: "GET",
        url: `/hop-dong?with[]=khach_hang&with[]=nhan_vien_tao&with[]=loai_hop_dong&with[]=bao_gia_co_hoi_tien_trinh&limit=${limit}&page=${page}&s[name]=${name}&${order_by}${search}${customerQuery}`,
      }),
    }),
    getHopDongByName: builder.query({
      transformResponse: (response: any) =>
        response?.data.map((x) => ({ label: x.name, value: x.id })),
      query: ({ name }) => ({
        method: "GET",
        url: `/hop-dong?with[]=khach_hang&with[]=nhan_vien_tao&with[]=loai_hop_dong&with[]=bao_gia_co_hoi_tien_trinh&limit=10&page=1&s[name]=${name}`,
      }),
    }),
  }),
});

export const {
  useGetHopDongByIdQuery,
  useGetHopDongListQuery,
  useLazyGetHopDongListQuery,
  useLazyGetHopDongByNameQuery,
  useGetViewHopDongQuery,
  useGetHopDongByCustomerIdQuery,
  useLazyPutHopDongByIdQuery,
  useLazyCreateHopDongQuery,
  useLazyDeleteHopDongQuery,
} = hopDongService;
