import axiosInstance from "../utils/axios"
import type { forgotPasswordResponse, LoginResponse, LogoutResponse, RefreshTokenResponse, RegisterResponse, ResendVerificationCodeResponse, resetPasswordResponse, VerifyEmailResponse } from "../utils/axiosResponseTypes/authenticationTypes"
import { FORGOT_PASSWORD_ENDPOINT, LOGIN_ENDPOINT, REFRESH_TOKEN_ENDPOINT, LOGOUT_ENDPOINT, REGISTER_ENDPOINT, RESEND_VERIFICATION_CODE_ENDPOINT, RESET_PASSWORD_ENDPOINT, VERIFY_EMAIL_ENDPOINT } from "../utils/constants"
import { getErrorMessage } from "../utils/helpers/getErrorMessage"

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

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  try {
    const response = await axiosInstance.get(REFRESH_TOKEN_ENDPOINT)
    return response.data
  } catch(error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const logout = async () => {
  try {
    const response = await axiosInstance.delete<LogoutResponse>(LOGOUT_ENDPOINT) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const forgotPassword = async (credentials: { email: string }) => {
  try {
    const response = await axiosInstance.post<forgotPasswordResponse>(FORGOT_PASSWORD_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const resetPassword = async ({ password, confirmPassword, token }: { password: string, confirmPassword: string, token: string }) => {
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

