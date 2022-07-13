import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const mauInService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "mauInService",
  endpoints: (builder) => ({
    searchMauIn: builder.query({
      transformResponse: (response: any) =>
        response?.data.map((x) => ({ label: x.tieu_de, value: x.id })),
      query: ({ name }) => ({
        method: "GET",
        url: `/document-templates?order_by[uu_tien]=desc&s[code]=${name}`,
      }),
    }),
  }),
});

export const { useLazySearchMauInQuery } = mauInService;
