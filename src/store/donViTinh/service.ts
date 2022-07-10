import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";
import { keys } from "lodash-es";

export const donViTinhService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "donViTinhService",
  endpoints: (builder) => ({
    searchDonViTinh: builder.query({
      transformResponse: (response: any) =>
        keys(response)?.map?.((x: any) => ({ label: response[x], value: x })),
      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/don_vi?s=${name}&take=10`,
      }),
    }),
  }),
});

export const { useLazySearchDonViTinhQuery } = donViTinhService;
