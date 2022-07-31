import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const mailTemplatesService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error || "Something went wrong!"),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "mailTemplatesService",
  endpoints: (builder) => ({
    searchmailTemplates: builder.query({
      transformResponse: (response: any) =>
        response?.data.map((x) => ({ label: x.ten, value: x.id })),
      query: ({ search = {} }) => ({
        method: "GET",
        url: `/mail-templates`,
        params: {
          s: search,
          take: 10,
        },
      }),
    }),
    viewMailTemplate: builder.query({
      transformResponse: (response: any) => response?.data,
      query: ({ objectId, recordId, template_id }) => ({
        method: "GET",
        url: `/${objectId}/${recordId}/view-mail`,
        params: {
          template_id: template_id,
        },
      }),
    }),
    sendMailTemplate: builder.query({
      transformResponse: (response: any) => response?.data,
      query: ({ objectId, recordId, payload }) => ({
        method: "POST",
        url: `/${objectId}/${recordId}/send-mail`,
        data: payload,
      }),
    }),
  }),
});

export const {
  useLazySearchmailTemplatesQuery,
  useSearchmailTemplatesQuery,
  useLazyViewMailTemplateQuery,
  useLazySendMailTemplateQuery,
} = mailTemplatesService;
