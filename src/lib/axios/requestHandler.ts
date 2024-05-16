import { AxiosError, InternalAxiosRequestConfig } from "axios";

export const onRequestFulfilled = (
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] : [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};
