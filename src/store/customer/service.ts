import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";
import { ICustomer, IGetCustomersList } from "@/types";

export const customerService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "customerService",
  endpoints: (builder) => ({
    getCustomerById: builder.query({
      transformResponse: (res) => res?.data as ICustomer,
      query: ({ id }) => ({
        method: "GET",
        url: `/khach-hang/${id}`,
      }),
    }),
    updateCustomerByID: builder.mutation({
      transformResponse: (res) => res,
      query: ({ id, ...body }) => ({
        method: "PUT",
        url: `/khach-hang/${id}`,
        data: body,
      }),
    }),
    getCustomerList: builder.query({
      transformResponse: (response: any) => response as IGetCustomersList,
      query: ({ limit, page, code, order_by, search }) => ({
        method: "GET",
        url: `/khach-hang?limit=${limit}&page=${page}&with[]=user_tao&s[code]=${code}&${order_by}${search}`,
      }),
    }),
  }),
});

export const {
  useGetCustomerByIdQuery,
  useGetCustomerListQuery,
  useUpdateCustomerByIDMutation,
} = customerService;
