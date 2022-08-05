import { axiosBaseQuery } from "@/store/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { LOCAL_KEY } from "@/constants";

export const smsTemplatesService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: window?.__BASE_URL__ || "https://apisf.interphase.vn/api",
    onError: (err) => toast.error(err.error || "Something went wrong!"),
    token: () => localStorage.getItem(LOCAL_KEY.TOKEN),
  }),
  reducerPath: "smsTemplatesService",
  endpoints: (builder) => ({
    searchsmsTemplates: builder.query({
      transformResponse: (response: any) =>
        response?.data.map((x) => ({ label: x.ten, value: x.id })),
      query: ({ search = {} }) => ({
        method: "GET",
        url: `/sms-templates`,
        params: {
          s: search,
          take: 10,
        },
      }),
    }),
    viewSmsTemplate: builder.query({
      transformResponse: (response: any) => response?.data,
      query: ({ objectId, recordId, template_id }) => ({
        method: "GET",
        url: `/${objectId}/${recordId}/view-sms`,
        params: {
          template_id: template_id,
        },
      }),
    }),
    sendSmsTemplate: builder.query({
      transformResponse: (response: any) => response?.data,
      query: ({ objectId, recordId, payload }) => ({
        method: "POST",
        url: `/${objectId}/${recordId}/send-sms`,
        data: payload,
      }),
    }),
  }),
});

export const {
  useLazySearchsmsTemplatesQuery,
  useSearchsmsTemplatesQuery,
  useLazyViewSmsTemplateQuery,
  useLazySendSmsTemplateQuery,
} = smsTemplatesService;
