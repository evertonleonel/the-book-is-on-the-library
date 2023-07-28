import { AxiosError } from "axios";
import { api } from "@/lib/services/api";

export const useRequest = () => {
  const apiRequest = async (
    method: "put" | "post" | "get" | "delete" | "patch",
    url: string,
    options?: {
      data?: any;
      params?: any;
      isUpload?: boolean;
    }
  ) => {
    let urlApi = url;
    const headers =
      options && options.isUpload
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" };

    const params = { ...options?.params };
    const urlSearch = new URLSearchParams(params).toString();

    if (options?.params) urlApi += `?${urlSearch}`;

    try {
      const response = await api[method](
        urlApi,
        {
          data: options?.data,
        },
        {
          headers: { ...headers },
        }
      );
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 401) {
        }
      }

      return Promise.reject(error);
    }
  };

  return { apiRequest };
};
