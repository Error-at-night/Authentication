import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { BASE_URL } from "./constants";
import toast from "react-hot-toast";
import { navigate } from "./helpers/navigate";
import { startRefresh, endRefresh, setAuthData, clearAuthData } from "../features/auth/authSlice";
import { store } from "../store/store";
import { refreshToken } from "../services/authentication";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
  withCredentials: true,
  timeout: 50000,
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
  }, (error) => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      if (!store.getState().auth.isRefreshing) {
        try {
          store.dispatch(startRefresh())
          const data = await refreshToken()
          store.dispatch(setAuthData({ user: { user: data.user }, accessToken: data.accessToken}))
          return axiosInstance(originalRequest)
        } catch (error) {
          store.dispatch(clearAuthData())
          toast.error("Session expired, please login")
          navigate("/login")
          return Promise.reject(error)
        } finally {
          store.dispatch(endRefresh())
        }
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance