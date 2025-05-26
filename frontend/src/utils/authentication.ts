import axiosInstance from "./axios"
import { type LoginResponse, type RegisterResponse, type VerifyEmailResponse } from "./axiosResponseTypes"
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT, VERIFY_EMAIL_ENDPOINT } from "./constants"
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

export const verifyEmail = async (credentials: { verificationCode: string }) => {
  try {
    const response = await axiosInstance.post<VerifyEmailResponse>(VERIFY_EMAIL_ENDPOINT, credentials) 
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

