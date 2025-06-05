import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { login } from "../../utils/authentication"

export function useLogin() {
  const navigate = useNavigate()
  
  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message || "Login successful")
      navigate("/dashboard", { replace: true })
    },
    onError: (error) => {
      toast.error(error.message || "There was an error when trying to log you in")
    }
  })
  
  return { loginUser, isPending }
}