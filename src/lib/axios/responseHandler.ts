import { AxiosError, AxiosResponse } from "axios";

export const OnResponse = (response: AxiosResponse) => {
  return response;
};

export const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};
