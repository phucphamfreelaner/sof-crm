import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const authService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "authService",
  endpoints: (builder) => ({
    login: builder.query({
      transformResponse: (res) => res?.token,
      query: ({ username, password }) => ({
        method: "POST",
        url: `/user/login`,
        data: { username, password },
      }),
    }),
  }),
});

export const { useLazyLoginQuery } = authService;
