import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { resendVerificationCode } from "../../services/authentication"

export function useResendVerificationCode() {
  const navigate = useNavigate()
  
  const { mutate: resendUserVerificationCode, isPending } = useMutation({
    mutationFn: resendVerificationCode,
    onSuccess: (data) => {
      toast.success(data.message || "Verification code resent. Please check your inbox.")
      navigate("/verify-email", { replace: true })
    },
    onError: (error) => {
      toast.error(error.message || "There was an error when trying to resend the verification code")
    }
  })
  
  return { resendUserVerificationCode, isPending }
}