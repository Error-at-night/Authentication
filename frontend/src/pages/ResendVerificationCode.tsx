import { useForm, type SubmitHandler } from "react-hook-form";
import type { ResendVerificationCodeFormData } from "../utils/types";
import ButtonSpinner from "../components/ButtonSpinner";
import { useResendVerificationCode } from "../hooks/authentication/useResendVerificationCode";

function ResendVerificationCode() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ResendVerificationCodeFormData>();
  
  const { resendUserVerificationCode, isPending } = useResendVerificationCode()
  
  const onSubmit: SubmitHandler<ResendVerificationCodeFormData> = (data) => {
    resendUserVerificationCode(data, { onSettled: () => {
      reset()
    }})
  }

  return (
    <main className="bg-[#F8F9FA] h-[100vh] flex items-center px-4">
      <form className="w-[500px] mx-auto bg-white p-4 pb-6 shadow-md rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">
          <h1 className="text-[#2B3445] font-bold text-[2rem]">Resend Verification Code</h1>
          <p className="text-[#92969F] text-[1rem]">Enter the email address you used when creating your account</p>
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
            {isPending ? <ButtonSpinner/> : "Resend Verification Code"}
          </button>
        </div>
      </form>
    </main>
  )
}

export default ResendVerificationCode