import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";
import { keys } from "lodash-es";

export const chatLieuService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: window?.__BASE_URL__ || "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "chatLieuService",
  endpoints: (builder) => ({
    searchChatLieu: builder.query({
      transformResponse: (response: any) =>
        keys(response)?.map?.((x: any) => ({ label: response[x], value: x })),
      query: ({ name }) => ({
        method: "GET",
        url: `/cau-hinh/group/chat_lieu?s=${name}&take=10`,
      }),
    }),
    getLoaiBaoGiaByKey: builder.query<any, { value: string }>({
      transformResponse: (response: any) => response,
      query: ({ value }) => ({
        method: "GET",
        url: `/cau-hinh/group/chat_lieu/key/${value}`,
      }),
    }),
  }),
});

export const { useLazySearchChatLieuQuery, useLazyGetLoaiBaoGiaByKeyQuery } =
  chatLieuService;
