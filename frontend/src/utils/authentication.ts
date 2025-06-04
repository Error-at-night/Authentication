import axiosInstance from "./axios"
import { type forgotPasswordResponse, type LoginResponse, type RegisterResponse, type ResendVerificationCodeResponse, type resetPasswordResponse, type VerifyEmailResponse } from "./axiosResponseTypes"
import { FORGOT_PASSWORD_ENDPOINT, LOGIN_ENDPOINT, REGISTER_ENDPOINT, RESEND_VERIFICATION_CODE_ENDPOINT, RESET_PASSWORD_ENDPOINT, VERIFY_EMAIL_ENDPOINT } from "./constants"
import { getErrorMessage } from "./helpers"

export const register = async (credentials: { fullName: string, email: string, password: string, confirmPassword: string }) => {
  try {
    const response = await axiosInstance.post<RegisterResponse>(REGISTER_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const verifyEmail = async (credentials: { verificationCode: string }) => {
  try {
    const response = await axiosInstance.post<VerifyEmailResponse>(VERIFY_EMAIL_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const resendVerificationCode = async (credentials: { email: string }) => {
  try {
    const response = await axiosInstance.post<ResendVerificationCodeResponse>(RESEND_VERIFICATION_CODE_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const login = async (credentials: { email: string, password: string }) => {
  try {
    const response = await axiosInstance.post<LoginResponse>(LOGIN_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

// logout

export const forgotPassword = async (credentials: { email: string }) => {
  try {
    const response = await axiosInstance.post<forgotPasswordResponse>(FORGOT_PASSWORD_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const resetPassword = async (credentials: { password: string, confirmPassword: string, token: string }) => {
  const { password, confirmPassword, token } = credentials
  try {
    const response = await axiosInstance.post<resetPasswordResponse>(`${RESET_PASSWORD_ENDPOINT}/${token}`, {
      password,
      confirmPassword
    }) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

