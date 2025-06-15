import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { logout } from '../../services/authentication';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthData } from "../../features/auth/authSlice"

export function useLogout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      dispatch(clearAuthData())
      toast.success(data.message || "Logout successful")
      navigate("/login", { replace: true })
    },
    onError: (error) => {
      toast.error(error.message || "There was an error when trying to log you out")
    }
  })
  
  return { logoutUser, isPending }
}