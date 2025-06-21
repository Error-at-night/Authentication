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
  },
  accessToken: string;
}

export type RefreshTokenResponse = {
  user: {
    fullName: string;
    userId: string;
    email: string;
  },
  accessToken: string;
}

export type LogoutResponse = {
  message: string;
};

export type ForgotPasswordResponse = {
  message: string;
}

export type ResetPasswordResponse = {
  message: string;
}