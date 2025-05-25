import axiosInstance from "./axios"
import { type LoginResponse, type RegisterResponse } from "./axiosRequestResponseTypes"
import { REGISTER_ENDPOINT } from "./constants"

export const register = async (credentials: {fullName: string, email: string, password: string, confirmPassword: string}) => {
  const response = await axiosInstance.post<RegisterResponse>(REGISTER_ENDPOINT, credentials) 
  return response.data
}

export const login = async () => {
  const response = await axiosInstance.post<LoginResponse>("/") 
  return response.data
}

