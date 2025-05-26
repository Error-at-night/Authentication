import axiosInstance from "./axios"
import { type LoginResponse, type RegisterResponse } from "./axiosResponseTypes"
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "./constants"
import { getErrorMessage } from "./helpers"

export const register = async (credentials: { fullName: string, email: string, password: string, confirmPassword: string }) => {
  try {
    const response = await axiosInstance.post<RegisterResponse>(REGISTER_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(errorMessage);
  }
}

export const login = async (credentials: { email: string, password: string }) => {
  try {
    const response = await axiosInstance.post<LoginResponse>(LOGIN_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(errorMessage);
  }
}

