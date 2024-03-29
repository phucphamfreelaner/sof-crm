import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";
import { ICoHoi, ICoHoiList } from "@/types/coHoi";
import { omit } from "lodash-es";

export const coHoiService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: window?.__BASE_URL__ || "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "coHoiService",
  endpoints: (builder) => ({
    getCoHoiList: builder.query({
      transformResponse: (response: any) => response as ICoHoiList,
      query: ({ limit, page, filter = {}, customerId }) => ({
        method: "GET",
        url: `/co-hoi`,
        params: {
          limit,
          page,
          with: [
            "khach_hang",
            "tien_trinh",
            "trang_thai",
            "nhan_vien_tao",
            "co_hoi_cskh",
            "co_hoi_chua_cham_soc",
          ],
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
    searchCoHoi: builder.query<any, { name: string; customerId?: number }>({
      transformResponse: (response: any) =>
        response?.data?.map?.((x: any) => ({ label: x.name, value: x.id })),
      query: ({ name, customerId }) => ({
        method: "GET",
        url: `/co-hoi?limit=20&page=1&s[name]=${name}&customer_id=${customerId}`,
      }),
    }),
    getCoHoiListByCustomerId: builder.query({
      transformResponse: (response: any) => response as ICoHoiList,
      query: ({ id, limit, page, code, order_by, search }) => ({
        method: "GET",
        url: `/co-hoi?with[]=khach_hang&with[]=tien_trinh&with[]=trang_thai&with[]=nhan_vien_tao&with[]=co_hoi_cskh&with[]=co_hoi_chua_cham_soc&limit=${limit}&page=${page}&s[code]=${code}&${order_by}&s[name]=${search}&customer_id=${id}`,
      }),
    }),
    getCoHoiById: builder.query({
      transformResponse: (res) => res?.data as ICoHoi,
      query: ({ id }) => ({
        method: "GET",
        url: `/co-hoi/${id}`,
      }),
    }),
    createCoHoi: builder.mutation({
      transformResponse: (res) => res,
      query: ({ ...body }) => ({
        method: "POST",
        url: `/co-hoi`,
        data: body,
      }),
    }),
    updateCoHoiByID: builder.mutation({
      transformResponse: (res) => res,
      query: ({ id, ...body }) => ({
        method: "PUT",
        url: `/co-hoi/${id}`,
        data: body,
      }),
    }),
    deleteCoHoiByID: builder.mutation({
      transformResponse: (res) => res,
      query: ({ id }) => ({
        method: "DELETE",
        url: `/co-hoi/${id}`,
      }),
    }),
    deleteCoHoi: builder.query<any, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "DELETE",
        url: `/co-hoi/${id}`,
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
  useGetCoHoiByIdQuery,
  useCreateCoHoiMutation,
  useUpdateCoHoiByIDMutation,
  useDeleteCoHoiByIDMutation,
  useLazyDeleteCoHoiQuery,
} = coHoiService;
