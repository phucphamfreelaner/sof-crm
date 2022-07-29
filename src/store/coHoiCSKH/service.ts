import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";
import { omit } from "lodash-es";

// import { ICoHoiCSKH } from "@/store/types";

export const coHoiCSKHService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error || "Có lỗi xẩy ra!"),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "coHoiCSKHService",
  endpoints: (builder) => ({
    getCoHoiCSKHByCoHoiId: builder.query<
      { data: any[] },
      {
        cohoi_id?: any;
      }
    >({
      transformResponse: (response: any) => response?.data,
      query: ({ cohoi_id }) => ({
        method: "GET",
        url: `/co-hoi-cskh/get-by-co-hoi-id/${cohoi_id}`,
      }),
    }),
    createCoHoiCSKH: builder.query<{ data: any }, { payload: any }>({
      transformResponse: (response: any) => response,
      query: ({ payload }) => ({
        method: "POST",
        data: payload,
        url: `/co-hoi-cskh`,
      }),
    }),
    putCoHoiCSKHById: builder.query<any, { id: any; payload: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id, payload }) => ({
        method: "PUT",
        url: `/co-hoi-cskh/${id}`,
        data: payload,
      }),
    }),
    deleteCoHoiCSKH: builder.query<any, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "DELETE",
        url: `/co-hoi-cskh/${id}`,
      }),
    }),
  }),
});

export const {
  useGetCoHoiCSKHByCoHoiIdQuery,
  useLazyGetCoHoiCSKHByCoHoiIdQuery,
  useLazyCreateCoHoiCSKHQuery,
  useLazyDeleteCoHoiCSKHQuery,
  useLazyPutCoHoiCSKHByIdQuery,
} = coHoiCSKHService;
