import { useForm, type SubmitHandler } from "react-hook-form";
import { useResetPassword } from "../../hooks/authentication/useResetPassword"; 
import type { ResetPasswordFormData } from "../../utils/types";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ButtonSpinner from "../../components/ButtonSpinner";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const { token } = useParams()

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ResetPasswordFormData>();

  const passwordValue = watch("password")

  const { resetUserPassword, isPending } = useResetPassword()

  const onSubmit: SubmitHandler<ResetPasswordFormData> = (data) => {
    if (!token) {
      toast.error("Invalid or missing link")
      return
    }

    resetUserPassword({...data, token}, { onSettled: () => {
      reset()
    }})
  }
  
  return (
    <main className="bg-[#F8F9FA] h-[100vh] flex items-center px-4">
      <form className="w-[500px] mx-auto bg-white p-4 pb-6 shadow-md rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">
          <h1 className="text-[#2B3445] font-bold text-[2rem]">Reset Password</h1>
          <p className="text-[#92969F] text-[1rem]">Enter your new password</p>
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="password" className="text-[#2B3445] font-semibold mb-2">Password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} id="password"
              className={`${errors.password ? 
                "border-red-500 focus:border-red-500 focus:outline-none" : "border-[#DAE1E7]"} 
                border w-full py-2 px-4 rounded-md`}
              {...register("password", {
                required: "Please provide your password",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                  message: "Password must be at least 8 characters, include an uppercase letter, number, and symbol",
                },
              })}
              disabled={isPending}
            />
            <span className="absolute top-3 right-5 cursor-pointer"
              onClick={() => setShowPassword((password) => !password)}
            >
              {showPassword ? <Eye size={20}/> : <EyeOff size={20}/> }
            </span>
          </div>
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-[#2B3445] font-semibold mb-2">Confirm Password</label>
          <div className="relative">
            <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword"
              className={`${errors.confirmPassword ? 
                "border-red-500 focus:border-red-500 focus:outline-none" : "border-[#DAE1E7]"} border w-full py-2 px-4 rounded-md`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === passwordValue || "Passwords do not match",
              })}
              disabled={isPending}
            />
            <span className="absolute top-3 right-5 cursor-pointer"
              onClick={() => setShowConfirmPassword((password) => !password)}
              >
              {showConfirmPassword ? <Eye size={20}/> : <EyeOff size={20}/> }
            </span>
          </div>
          {errors.confirmPassword && <p className="text-red-500 mt-1">{errors.confirmPassword.message}</p>}
        </div>
        <div className="pt-5">
          <button type="submit" className="text-white bg-black px-3 py-3 w-full rounded-md cursor-pointer font-semibold"
            disabled={isPending}
          >
            {isPending ? <ButtonSpinner/> : "Reset Password"}
          </button>
        </div>
      </form>
    </main>
  )
}

export default ResetPassword