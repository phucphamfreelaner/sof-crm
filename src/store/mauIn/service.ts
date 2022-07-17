import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const mauInService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error || "mauInService: Có lỗi xẩy ra!"),
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
    getMauInById: builder.query<any, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "GET",
        url: `/document-templates/${id}`,
      }),
    }),
  }),
});

export const {
  useLazySearchMauInQuery,
  useGetMauInByIdQuery,
  useLazyGetMauInByIdQuery,
} = mauInService;
