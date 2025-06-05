export type RegisterResponse = {
  message: string;
}

export type VerifyEmailResponse = {
  message: string
}

export type ResendVerificationCodeResponse = {
  message: string
}

export type LoginResponse = {
  message: string;
  user: {
    fullName: string;
    userId: string;
    email: string;
  }
}

export type LogoutResponse = {
  message: string;
};

export type forgotPasswordResponse = {
  message: string;
}

export type resetPasswordResponse = {
  message: string;
}
