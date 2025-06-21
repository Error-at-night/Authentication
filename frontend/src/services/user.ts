import axiosInstance from "../utils/axios"
import type { GetCurrentUserResponse } from "../utils/axiosResponseTypes/userTypes"
import { SHOW_CURRENT_USER_ENDPOINT } from "../utils/constants"
import { getErrorMessage } from "../utils/helpers/getErrorMessage"

export const getCurrentUser = async (): Promise<GetCurrentUserResponse> => {
  try {
    const response =  await axiosInstance.get(SHOW_CURRENT_USER_ENDPOINT)
    return response.data
  } catch(error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}