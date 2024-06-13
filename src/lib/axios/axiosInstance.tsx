import axios from "axios";
import { onRequestError, onRequestFulfilled } from "./requestHandler";
import { OnResponse, onResponseError } from "./responseHandler";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withXSRFToken: true,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosInstance.interceptors.request.use(onRequestFulfilled, onRequestError);
axiosInstance.interceptors.response.use(OnResponse, onResponseError);

export default axiosInstance;
