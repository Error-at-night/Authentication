export type RegisterResponse = {
    msg: string;
}

export type LoginResponse = {
  msg: string;
  user: {
    fullName: string;
    userId: string;
    email: string;
  };
};
