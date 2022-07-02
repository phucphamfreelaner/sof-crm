import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";
import { ICustomer } from "@/types";

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
      transformResponse: (res) => res,
      query: ({ tableSchemaName, id }) => ({
        method: "GET",
        url: `/table/${tableSchemaName}/${id}`,
      }),
    }),
    getCustomerList: builder.query({
      transformResponse: (response: any) => response?.data as ICustomer[],
      query: ({ limit, page, contact_name }) => ({
        method: "GET",
        url: `/khach-hang?limit=${limit}&page=${page}&with[]=user_tao&order_by[created_at]=desc&s[contact]=${contact_name}`,
      }),
    }),
  }),
});

export const { useGetCustomerByIdQuery, useGetCustomerListQuery } =
  customerService;
