import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const congTyService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: window?.__BASE_URL__ || "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error || "congTyService: Có lỗi xẩy ra!");
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "congTyService",
  endpoints: (builder) => ({
    getCongTyList: builder.query({
      transformResponse: (response: any) => response?.data,
      query: ({ name }) => ({
        method: "GET",
        url: `/cong-ty?ngon_ngu_key=vi&&s[ten]=${name}`,
      }),
    }),
    searchCongTy: builder.query({
      transformResponse: (response: any) =>
        response?.data?.map((x) => ({
          label: x?.ten,
          value: x?.id,
        })),
      query: ({ name }) => ({
        method: "GET",
        url: `/cong-ty?ngon_ngu_key=vi&&s[ten]=${name}`,
      }),
    }),
    getCongTyById: builder.query<any, { id: string }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "GET",
        url: `/cong-ty/${id}`,
      }),
    }),
  }),
});

export const {
  useGetCongTyListQuery,
  useLazyGetCongTyListQuery,
  useLazySearchCongTyQuery,
  useGetCongTyByIdQuery,
  useLazyGetCongTyByIdQuery,
} = congTyService;
