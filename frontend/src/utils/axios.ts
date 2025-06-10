import axios from "axios";
import { BASE_URL } from "./constants";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
  withCredentials: true,
});

axios.interceptors.response.use(function(response) {
    return response
  }, function(error) {
      if (error.response?.status === 401 && window.location.pathname !== "/login") {
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  });

export default axiosInstance;
