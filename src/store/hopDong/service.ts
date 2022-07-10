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
    updateHopDongByID: builder.mutation({
      transformResponse: (res) => res,
      query: ({ id, ...body }) => ({
        method: "PUT",
        url: `/hop-dong/${id}`,
        data: body,
      }),
    }),
    createHopDong: builder.mutation({
      transformResponse: (res) => res,
      query: ({ ...body }) => ({
        method: "POST",
        url: `/hop-dong`,
        data: body,
      }),
    }),
    deleteHopDongByID: builder.mutation({
      transformResponse: (res) => res,
      query: ({ id }) => ({
        method: "DELETE",
        url: `/hop-dong/${id}`,
      }),
    }),
    getHopDongList: builder.query({
      transformResponse: (response: any) => response as IGetHopDongList,
      query: ({ limit, page, code, order_by, search }) => ({
        method: "GET",
        url: `/hop-dong?with[]=nhan_vien_tao&with[]=loai_hop_dong&with[]=bao_gia_co_hoi_tien_trinh&limit=${limit}&page=${page}&s[code]=${code}&${order_by}${search}`,
      }),
    }),
  }),
});

export const {
  useGetHopDongByIdQuery,
  useGetHopDongListQuery,
  useUpdateHopDongByIDMutation,
  useCreateHopDongMutation,
  useDeleteHopDongByIDMutation,
} = hopDongService;
