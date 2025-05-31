import { useEffect, useRef, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form";
import type { VerifyEmailFormData } from "../utils/types";
import { useVerifyEmail } from "../hooks/authentication/useVerifyEmail";
import ButtonSpinner from "../components/ButtonSpinner";
import { Link } from "react-router-dom";

function VerifyEmail() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<VerifyEmailFormData>()
  
  const { verifyUserEmail, isPending } = useVerifyEmail()

  const handleChange = (index: number, value: string) => {
    const newCode = [...code]

    if (value.length > 1) {
      return
    } else {
      newCode[index] = value
      setCode(newCode)
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').slice(0, 6)
    const pasteArray = pasteData.split('')

    const newCode = [...code]
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasteArray[i] || ""
    }
    setCode(newCode)

    const lastFilledIndex = newCode.findLastIndex(d => d !== "")
    const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
    inputRefs.current[focusIndex]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const onSubmit: SubmitHandler<VerifyEmailFormData> = (data) => {
    verifyUserEmail(data, {
      onSettled: () => {
        reset()
        setCode(["", "", "", "", "", ""])
      },
    })
  }

  useEffect(() => {
    const codeString = code.join("");
    setValue("verificationCode", codeString)
  }, [code, setValue])

  return (
    <main className="bg-[#F8F9FA] h-screen flex items-center px-4">
      <form className="w-full max-w-[500px] mx-auto bg-white p-4 pb-6 shadow-md rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">
          <h1 className="text-[#2B3445] font-bold text-[2rem]">Verify Your Email</h1>
          <p className="text-[#92969F] text-[1rem]">Enter the 6-digit code sent to your email address</p>
        </div>
        <input type="hidden"
          {...register("verificationCode", {
            required: "Enter the 6-digit code sent to your email address",
            validate: (value) => value.length === 6 || "Verification code must be 6 digits",
          })}
        />
        <div className="mt-5 flex justify-between">
          {code.map((digit, index) => (
            <input key={index} type="text" value={digit} maxLength={1}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              ref={(el) => {inputRefs.current[index] = el}}
              className={`${errors.verificationCode? "border-red-500 focus:border-red-500 focus:outline-none": 
                "border-[#DAE1E7]"} border w-12 h-12 text-center text-xl mx-1 rounded-md`}
            />
          ))}
        </div>
        {errors.verificationCode && <p className="text-red-500 mt-2 text-sm text-center">{errors.verificationCode.message}</p>}
        <div className="pt-5">
          <button type="submit" className="text-white bg-black px-3 py-3 w-full rounded-md cursor-pointer font-semibold"
            disabled={isPending}
          >
            {isPending ? <ButtonSpinner /> : "Verify email"}
          </button>
        </div>
        <div className="mt-5 text-center">
          <Link to="/resend-verification-code" className="underline cursor-pointer">Resend verification code</Link>
        </div>
      </form>
    </main>
  )
}

export default VerifyEmail