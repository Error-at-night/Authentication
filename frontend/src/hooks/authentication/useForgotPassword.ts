import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { forgotPassword } from '../../utils/authentication';
import { useState } from "react";

export function useForgotPassword() {
  const [emailSent, setEmailSent] = useState<boolean>(false)
  
  const { mutate: sendForgotPassword, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      setEmailSent(true)
      toast.success(data.message || "Please check your email for the reset password link")
    },
    onError: (error) => {
      setEmailSent(false)
      toast.error(error.message || "There was an error when trying to send reset password link")
    }
  })
  
  return { sendForgotPassword, isPending, emailSent }
}