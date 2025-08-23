import axiosInstance from "../utils/axios"
import type { ForgotPasswordResponse, LoginResponse, LogoutResponse, RefreshTokenResponse, RegisterResponse, ResendVerificationCodeResponse, ResetPasswordResponse, VerifyEmailResponse } from "../utils/axiosResponseTypes/authenticationTypes"
import { FORGOT_PASSWORD_ENDPOINT, LOGIN_ENDPOINT, REFRESH_TOKEN_ENDPOINT, LOGOUT_ENDPOINT, REGISTER_ENDPOINT, RESEND_VERIFICATION_CODE_ENDPOINT, RESET_PASSWORD_ENDPOINT, VERIFY_EMAIL_ENDPOINT } from "../utils/constants"
import { getErrorMessage } from "../utils/helpers/getErrorMessage"

export const register = async (credentials: 
  { fullName: string, email: string, password: string, confirmPassword: string }): Promise<RegisterResponse> => {
  try {
    const response = await axiosInstance.post(REGISTER_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const verifyEmail = async (credentials: { verificationCode: string }): Promise<VerifyEmailResponse> => {
  try {
    const response = await axiosInstance.post(VERIFY_EMAIL_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const resendVerificationCode = async (credentials: { email: string }): Promise<ResendVerificationCodeResponse> => {
  try {
    const response = await axiosInstance.post(RESEND_VERIFICATION_CODE_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const login = async (credentials: { email: string, password: string }): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post(LOGIN_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  try {
    const response = await axiosInstance.post(REFRESH_TOKEN_ENDPOINT)
    return response.data
  } catch(error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await axiosInstance.delete(LOGOUT_ENDPOINT) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const forgotPassword = async (credentials: { email: string }): Promise<ForgotPasswordResponse> => {
  try {
    const response = await axiosInstance.post(FORGOT_PASSWORD_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export const resetPassword = async ({ password, confirmPassword, token }: 
  { password: string, confirmPassword: string, token: string }): Promise<ResetPasswordResponse> => {
  try {
    const response = await axiosInstance.post(`${RESET_PASSWORD_ENDPOINT}/${token}`, {
      password,
      confirmPassword
    }) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

