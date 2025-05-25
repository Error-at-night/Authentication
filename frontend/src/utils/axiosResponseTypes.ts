export type RegisterResponse = {
    message: string;
}

export type LoginResponse = {
  message: string;
  user: {
    fullName: string;
    userId: string;
    email: string;
  };
};
