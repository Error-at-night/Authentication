export type RegisterFormData = {
  fullName: string,
  email:  string,
  password: string,
  confirmPassword: string
}

export type VerifyEmailFormData = {
  verificationCode: string
}

export type ResendVerificationCodeFormData = {
  email: string
}

export type LoginFormData = {
  email:  string,
  password: string,
}

export type ForgotPasswordFormData = {
  email: string
}