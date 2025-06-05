import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { logout } from '../../utils/authentication';
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate()

  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      toast.success(data.message || "Logout successful")
      navigate("/login", { replace: true })
    },
    onError: (error) => {
      toast.error(error.message || "There was an error when trying to log you out")
    }
  })
  
  return { logoutUser, isPending }
}