import axios from "axios"
import axiosInstance from "./axios"
import { type LoginResponse, type RegisterResponse } from "./axiosRequestResponseTypes"
import { REGISTER_ENDPOINT } from "./constants"

export const register = async (credentials: {fullName: string, email: string, password: string, confirmPassword: string}) => {
  try {
    const response = await axiosInstance.post<RegisterResponse>(REGISTER_ENDPOINT, credentials) 
    return response.data
  } catch (error){
    if(axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || "Unknown error";
      throw new Error(message);
    }
    throw error;
  }
}

export const login = async () => {
  const response = await axiosInstance.post<LoginResponse>("/") 
  return response.data
}

