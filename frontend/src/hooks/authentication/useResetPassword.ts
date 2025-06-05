import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { resetPassword } from "../../utils/authentication"

export function useResetPassword() {
  const navigate = useNavigate()
  
  const { mutate: resetUserPassword, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successful")
      navigate("/login", { replace: true })
    },
    onError: (error) => {
      toast.error(error.message || "There was an error when trying to reset your password")
    }
  })
  
  return { resetUserPassword, isPending }
}