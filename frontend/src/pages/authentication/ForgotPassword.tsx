import { useForm, type SubmitHandler } from "react-hook-form";
import type { ForgotPasswordFormData } from "../../utils/types";
import { useForgotPassword } from "../../hooks/authentication/useForgotPassword";
import ButtonSpinner from "../../components/ButtonSpinner";
import { Link } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
  const [emailSubmitted, setEmailSubmitted] = useState("")

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ForgotPasswordFormData>();
  
  const { sendForgotPassword, isPending, emailSent } = useForgotPassword()
  
  const onSubmit: SubmitHandler<ForgotPasswordFormData> = (data) => {
    setEmailSubmitted(data.email)
    sendForgotPassword(data, { onSettled: () => {
      reset()
    }})
  }

  return (
    <main className="bg-[#F8F9FA] h-[100vh] flex items-center px-4">
      {emailSent ? 
        <div className="text-center w-[500px] mx-auto bg-white p-4 pb-6 shadow-md rounded-lg">
          <h1 className="text-[#2B3445] font-bold text-[2rem]">Forgot Password</h1>
          <p className="text-[1rem]">If an account exists for <strong>{emailSubmitted}</strong>, you will receive an email to reset your password</p>
          <div className="mt-5">
            <p className="text-center">Back to {" "}
              <Link to="/login" className="underline cursor-pointer font-bold">Login</Link>
            </p>
          </div>
        </div> : 
        <form className="w-[500px] mx-auto bg-white p-4 pb-6 shadow-md rounded-lg" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center">
            <h1 className="text-[#2B3445] font-bold text-[2rem]">Forgot Password</h1>
            <p className="text-[#92969F] text-[1rem]">We'll send you a link to reset your password</p>
          </div>
          <div className="flex flex-col pt-4">
            <label htmlFor="email" className="text-[#2B3445] font-semibold mb-2">Email</label>
            <input type="email" id="email" 
              className={`${errors.email ? 
                "border-red-500 focus:border-red-500 focus:outline-none" : "border-[#DAE1E7]"} border w-full py-2 px-4 rounded-md`}
              {...register("email", {
                required: "Please provide your email",
                validate: (value) => {
                  const emailPattern = /^[\w.-]+@gmail\.com$/i

                  if (!emailPattern.test(value)) {
                    return "Please provide a valid email address (eg johndoe@gmail.com)"
                  }

                  const firstPart = value.split("@")[0];
                  if (firstPart.length < 5) {
                    return "The name before '@' must be at least 5 characters long"
                  }

                  return true
                },
              })}
              disabled={isPending}
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div className="pt-5">
            <button type="submit" className="text-white bg-black px-3 py-3 w-full rounded-md cursor-pointer font-semibold"
              disabled={isPending}
            >
              {isPending ? <ButtonSpinner/> : "Send Reset Password Link"}
            </button>
          </div>
          <div className="mt-5">
            <p className="text-center">Back to {" "}
              <Link to="/login" className="underline cursor-pointer font-bold">Login</Link>
            </p>
          </div>
        </form>
      }
    </main>
  )
}

export default ForgotPassword