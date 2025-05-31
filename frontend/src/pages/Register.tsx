import { useForm, type SubmitHandler } from "react-hook-form";
import { type RegisterFormData } from "../utils/types"
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { useRegister } from '../hooks/authentication/useRegister';
import ButtonSpinner from "../components/ButtonSpinner";
import { Link } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<RegisterFormData>();

  const passwordValue = watch("password")

  const { registerUser, isPending } = useRegister()

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    registerUser(data, { onSettled: () => {
      reset()
    }})
  }

  return (
    <main className="bg-[#F8F9FA] h-[100vh] flex items-center px-4">
      <form className="w-[500px] mx-auto bg-white p-4 pb-6 shadow-md rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">
          <h1 className="text-[#2B3445] font-bold text-[2rem]">Create Your Account</h1>
          <p className="text-[#92969F] text-[1rem]">Please fill all forms to be continued</p>
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="name" className="text-[#2B3445] font-semibold mb-2">Full Name</label>
          <input type="text" id="name" className={`${errors.fullName ? 
            "border-red-500 focus:border-red-500 focus:outline-none" : "border-[#DAE1E7]"} border w-full py-2 px-4 rounded-md`}
            {...register("fullName", { required: "Please provide your fullname",  minLength: { value: 7,
                message: "Fullname must be at least 7 characters",
              }})
            }
            disabled={isPending}
          />
          {errors.fullName && <p className="text-red-500 mt-1">{errors.fullName.message}</p>}
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="email" className="text-[#2B3445] font-semibold mb-2">Email</label>
          <input type="email" id="email" 
            className={`${errors.email ? 
              "border-red-500 focus:border-red-500 focus:outline-none" : "border-[#DAE1E7]"} border w-full py-2 px-4 rounded-md`}
            {...register("email", {
              required: "Please provide your email",
              validate: (value) => {
                const emailPattern = /^[\w.-]+@gmail\.com$/i;

                if (!emailPattern.test(value)) {
                  return "Please provide a valid email address (eg johndoe@gmail.com)";
                }

                const firstPart = value.split("@")[0];
                if (firstPart.length < 5) {
                  return "The name before '@' must be at least 5 characters long";
                }

                return true;
              },
            })}
            disabled={isPending}
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="password" className="text-[#2B3445] font-semibold mb-2">Password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} id="password"
              className={`${errors.password ? 
                "border-red-500 focus:border-red-500 focus:outline-none" : "border-[#DAE1E7]"} border w-full py-2 px-4 rounded-md`}
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
            {isPending ? <ButtonSpinner/> : "Create Account"}
          </button>
        </div>
        <div className="mt-5">
          <p className="text-center">Already have an account? {" "} 
            <Link to="/login" className="underline cursor-pointer font-bold">Login</Link>
          </p>
        </div>
      </form>
    </main>
  )
}

export default Register