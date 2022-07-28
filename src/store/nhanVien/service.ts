import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const nhanVienService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "nhanVienService",
  endpoints: (builder) => ({
    searchNhanVien: builder.query({
      transformResponse: (response: any) =>
        response?.data.map((x) => ({ label: x.name, value: x.id })),
      query: ({ name, chuc_vu_key }) => ({
        method: "GET",
        url: `/nhan-vien?order_by[id]=desc&s[name]=${name}&take=10&with[]=chuc_vu&${chuc_vu_key}`,
      }),
    }),
    getListNhanVien: builder.query({
      transformResponse: (response: any) =>
        Object.assign({}, ...response?.data?.map((p) => ({ [p.id]: p.name }))),
      //response?.data.map((x) => {return {label: x.name, value: x.id}}),
      //response?.data?.reduce((ac,{["Name Test"]:x,...rest}) => (ac[x] = rest,ac),{})

      query: () => ({
        method: "GET",
        url: `/nhan-vien?take=1000`,
      }),
    }),
    searchNhanVienByCode: builder.query<any, { id: any }>({
      transformResponse: (response: any) => response?.data,
      query: ({ id }) => ({
        method: "GET",
        url: `/nhan-vien/${id}`,
      }),
    }),
  }),
});

export const {
  useLazySearchNhanVienQuery,
  useSearchNhanVienQuery,
  useSearchNhanVienByCodeQuery,
  useGetListNhanVienQuery,
} = nhanVienService;
