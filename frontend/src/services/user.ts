import axiosInstance from "../utils/axios"
import type { getCurrentUserResponse } from "../utils/axiosResponseTypes/userTypes"
import { SHOW_CURRENT_USER_ENDPOINT } from "../utils/constants"
import { getErrorMessage } from "../utils/helpers/getErrorMessage"

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get<getCurrentUserResponse>(SHOW_CURRENT_USER_ENDPOINT)
    return response.data
  } catch(error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}