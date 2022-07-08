import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";

export const testService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://lab.connect247.vn/ucrmapi-sso",
    onError: (err) => {
      toast.error(err.error);
    },
    token: () =>
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTcyNzQwMzksIlRlbmFudHMiOiJ0bnRfdGVzdGVtYWlsdmVyMl85OTk3NTMiLCJJRCI6IjYxZGU3NWRkZmZhYmY5MjhlMTlkZjFlOCIsIkVtYWlsIjoidmVyMi5lbWFpbEBiYXNlYnMuY29tIiwiSXNfQWRtaW4iOnRydWV9.Dpao0V5HmTz7Kw3vsEwini7H8mrzxYjuYcix4JlCaLs",
  }),
  reducerPath: "testService",
  endpoints: (builder) => ({
    getSampleData: builder.query({
      transformResponse: (response: any) => response,
      query: () => ({
        method: "GET",
        url: `/import-users/generate-sample-data`,
      }),
    }),
  }),
});

export const { useLazyGetSampleDataQuery } = testService;
