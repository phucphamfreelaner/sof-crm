import qs from "qs";
import axios, { Method } from "axios";
import { env } from "./env";
import { isString } from "lodash-es";

export interface IOptions {
  url?: string;
  method?: Method;
  data?: any;
  params?: any;
}

export const axiosBaseQuery =
  ({
    baseUrl,
    token,
    onError,
    onSuccess,
  }: {
    baseUrl: string;
    token?: any;
    onError?: (error: { status: any; error: any }) => any;
    onSuccess?: (response: any) => any;
  }) =>
  async (opts: IOptions | null, { getState }: any) => {
    const _token = token?.(getState);

    try {
      const result = await axios({
        url: baseUrl + env("REACT_APP_API_BASE_PREFIX_PATH") + opts?.url,
        method: opts?.method,
        data: opts?.data,
        paramsSerializer: (params) => qs.stringify(params, { encode: false }),
        params: opts?.params,
        headers: token && { Authorization: `Bearer ${_token}` },
      });

      onSuccess?.(result.data);

      return { data: result.data };
    } catch (axiosError: any) {
      onError?.({
        status: axiosError.response?.status,
        error: isString(axiosError.response?.data?.error)
          ? axiosError.response?.data?.error
          : JSON.stringify(axiosError.response?.data?.error),
      });

      return {
        error: {
          status: axiosError.response?.status,
          error: axiosError.response?.data?.error,
        },
      };
    }
  };
