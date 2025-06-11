import axios from "axios";
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return error.response.data?.message || "Invalid request. Please check your input and try again.";
        case 401:
          return error.response.data?.message || "Authentication required. Please login in.";
        case 403:
          return error.response.data?.message || "Access denied. You don’t have permission to perform this action.";
        case 404:
          return error.response.data?.message || "The page or resource you are trying to access does not exist.";
        case 500:
          return error.response.data?.message || "Something went wrong. Please try again later";
        default:
          return error.response.data?.message || "An unexpected error occurred";
      }
    } else if (error.request) {
      return "No response from server. Please check your internet connection and try again.";
    } else {
      return error.message || "An unknown error occurred.";
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return "An unexpected error occurred.";
}