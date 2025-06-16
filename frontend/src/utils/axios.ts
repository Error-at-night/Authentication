import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { BASE_URL } from "./constants";
import toast from "react-hot-toast";
import { navigate } from './helpers/navigate';
import { startRefresh, endRefresh, setAuthData, clearAuthData } from '../features/auth/authSlice';
import { store } from '../store/store';
import { refreshToken } from '../services/authentication';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

type FailedRequest = {
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}

let failedQueue: FailedRequest[] = []

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve()
    }
  })
  failedQueue = []
}

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (store.getState().auth.isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(() => axiosInstance(originalRequest))
      }

      store.dispatch(startRefresh())
      originalRequest._retry = true

      try {
        const data = await refreshToken()
        store.dispatch(setAuthData({ user: { user: data.user }, accessToken: data.accessToken}))
        processQueue(null)
        return axiosInstance(originalRequest)
      } catch (error) {
        processQueue(error)
        store.dispatch(clearAuthData())
        toast.error("Session expired, please loginnnnnnnnn")
        navigate('/login')
        return Promise.reject(error)
      } finally {
        store.dispatch(endRefresh())
      }
  }

    return Promise.reject(error);
  }
);

export default axiosInstance;