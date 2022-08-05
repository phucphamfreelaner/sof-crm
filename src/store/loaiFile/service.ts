import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const loaiFileService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: window?.__BASE_URL__ || "https://apisf.interphase.vn/api",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "loaiFileService",
  endpoints: (builder) => ({
    getLoaiFileList: builder.query({
      transformResponse: (response: any) => response,
      query: ({ name, parentKey = "", parentValue = "" }) => ({
        method: "GET",
        url: `/cau-hinh/group/loai_file?s=${name}&take=10&parent-key=${parentKey}&parent-value=${parentValue}`,
      }),
    }),
    searchLoaiFileList: builder.query({
      transformResponse: (response: any) =>
        Object.keys(response).map((key) => {
          return { label: response[key], value: key };
        }),
      query: ({ name, parentKey = "", parentValue = "" }) => ({
        method: "GET",
        url: `/cau-hinh/group/loai_file?s=${name}&take=10&parent-key=${parentKey}&parent-value=${parentValue}`,
      }),
    }),
    getLoaiFileOptions: builder.query({
      transformResponse: (response: any) =>
        Object.keys(response).map((key) => {
          return { label: response[key], value: key };
        }),
      query: ({ name, parentKey = "", parentValue = "" }) => ({
        method: "GET",
        url: `/cau-hinh/group/loai_file?s=${name}&take=10&parent-key=${parentKey}&parent-value=${parentValue}`,
      }),
    }),
    getLoaiFileByKey: builder.query({
      transformResponse: (response: any) => response,
      query: ({ key }) => ({
        method: "GET",
        url: `/cau-hinh/group/loai_file/key/${key}`,
      }),
    }),
  }),
});

export const {
  useGetLoaiFileListQuery,
  useLazyGetLoaiFileListQuery,
  useLazySearchLoaiFileListQuery,
  useLazyGetLoaiFileOptionsQuery,
  useLazyGetLoaiFileByKeyQuery,
} = loaiFileService;
