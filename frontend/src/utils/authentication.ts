import axiosInstance from "./axios"
import { type LoginResponse, type RegisterResponse } from "./axiosResponseTypes"
import { REGISTER_ENDPOINT } from "./constants"
import { getErrorMessage } from "./helpers"

export const register = async (credentials: {fullName: string, email: string, password: string, confirmPassword: string}) => {
  try {
    const response = await axiosInstance.post<RegisterResponse>(REGISTER_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.log(error.response.data.message)
    throw new Error(errorMessage);
  }
}

export const login = async () => {
  const response = await axiosInstance.post<LoginResponse>("/") 
  return response.data
}

