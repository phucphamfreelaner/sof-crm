import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const quocGiaService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: window?.__BASE_URL__ || "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "quocGiaService",
  endpoints: (builder) => ({
    getQuocGiaList: builder.query({
      transformResponse: (response: any) => response,
      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/quoc_gia?s=${name}&take=10`,
      }),
    }),
  }),
});

export const { useGetQuocGiaListQuery, useLazyGetQuocGiaListQuery } =
  quocGiaService;
