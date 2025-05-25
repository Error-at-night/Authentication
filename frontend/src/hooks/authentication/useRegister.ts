import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export function useRegister() {
  const navigate = useNavigate()
  
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      // navigate("/email-verification", { replace: true })
      toast.success("Verify your email address")
    },
    onError: (error) => {
      toast.error(error.message ||  "There was an error when trying to sign you up")
    }
  })
  
  return { registerUser, isPending }
}