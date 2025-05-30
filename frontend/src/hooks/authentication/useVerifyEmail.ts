import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { verifyEmail } from '../../utils/authentication';

export function useVerifyEmail() {
  const navigate = useNavigate()
  
  const { mutate: verifyUserEmail, isPending } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      navigate("/", { replace: true })
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message ||  "There was an error when trying to verify your email")
    }
  })
  
  return { verifyUserEmail, isPending }
}