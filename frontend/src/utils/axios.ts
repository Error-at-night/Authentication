import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { BASE_URL, REFRESH_TOKEN_ENDPOINT } from "./constants";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
  withCredentials: true,
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    console.log(originalRequest.url)

    const isUnauthorized = error.response?.status === 401;
    const isNotLoginOrRefresh = !originalRequest.url?.includes("/login") && !originalRequest.url?.includes("/refresh-token");

    if (isUnauthorized && isNotLoginOrRefresh && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.get(REFRESH_TOKEN_ENDPOINT);

        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        toast.error("Session expired, please login again")
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;