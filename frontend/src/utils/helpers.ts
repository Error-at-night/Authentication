import axios from "axios";
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return error.response.data?.message || "Bad request. Please check your input.";
        case 401:
          return "Unauthorized. Please login and try again.";
        case 403:
          return "You do not have permission to perform this action.";
        case 404:
          return "Resource not found. Please try again later.";
        case 500:
          return "Internal server error. Please try again later.";
        default:
          return error.response.data?.message || `An unexpected error occurred`;
      }
    } else if (error.request) {
      return "No response from server. Please check your internet connection.";
    } else {
      return error.message || "An unknown error occurred.";
    }
  }

  return "An unexpected error occurred.";
}