import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const congTyService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
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
  }),
});

export const { useGetCongTyListQuery, useLazyGetCongTyListQuery } =
  congTyService;
