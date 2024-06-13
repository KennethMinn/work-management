import { AxiosError, InternalAxiosRequestConfig } from "axios";

export const onRequestFulfilled = (
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  if (request.url && request.baseURL && request.url.includes("sanctum")) {
    request.baseURL = request.baseURL.replace("api", "");
  }

  return request;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] : [${JSON.stringify(error)}]`);
  console.log(error.request);
  return Promise.reject(error);
};
