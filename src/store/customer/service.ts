import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { env } from "@/store/utils";

export const customerService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: env("REACT_APP_BASE_URL"),
    onError: (err) => {
      toast.error(err.error);
    },
    token: (getState: any) => getState()?.auth?.token || env("TOKEN"),
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
  }),
});

export const { useGetCustomerByIdQuery } = customerService;
