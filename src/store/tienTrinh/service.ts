import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const tienTrinhService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "tienTrinhService",
  endpoints: (builder) => ({
    getTienTrinhList: builder.query({
      transformResponse: (response: any) => response,
      query: ({ name, parentKey = "", parentValue = "" }) => ({
        method: "GET",
        url: `/cau-hinh/group/tien_trinh_co_hoi?s=${name}&take=10&parent-key=${parentKey}&parent-value=${parentValue}`,
      }),
    }),
  }),
});

export const { useGetTienTrinhListQuery, useLazyGetTienTrinhListQuery } =
  tienTrinhService;
