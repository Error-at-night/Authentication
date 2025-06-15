import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { login } from "../../services/authentication"
import { useDispatch } from "react-redux";
import { setAuthData } from "../../features/auth/authSlice"

export function useLogin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(setAuthData({ user: { user: data.user }, accessToken: data.accessToken }))
      toast.success(data.message || "Login successful")
      navigate("/dashboard", { replace: true })
    },
    onError: (error) => {
      toast.error(error.message || "There was an error when trying to log you in")
    }
  })
  
  return { loginUser, isPending }
}