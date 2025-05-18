const User = require("../models/User")
const CustomError = require("../errors")
const { StatusCodes } = require("http-status-codes")
const sendVerificationEmail = require("../utils/sendVerificationEmail")

const register = async (req, res, next) => {
  const { fullName, email, password, confirmPassword } = req.body

  try {

    if(!fullName || !email || !password || !confirmPassword) {
      throw new CustomError.BadRequestError("All fields are required")
    }

    const emailAlreadyExists = await User.findOne({ email })

    if(emailAlreadyExists) {
      throw new CustomError.BadRequestError("Email already exists")
    }

    if(password !== confirmPassword) {
      throw new CustomError.BadRequestError("Passwords does not match")
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const verificationCodeExipresAt = Date.now() + 10 * 60 * 1000

    const user = await User.create({ fullName, email, password, verificationCode, verificationCodeExipresAt })
    
    await sendVerificationEmail({ email: user.email, fullName: user.fullName, verificationCode: user.verificationCode });

    res.status(StatusCodes.CREATED).json({ msg: "Please verify your email" })

  } catch(error) {
    next(error)
  }
}

const verifyEmail = async (req, res, next) => {
  const { verificationCode } = req.body;

  try {
    const user = await User.findOne({ verificationCode });

    if (!user) {
      throw new CustomError.BadRequestError("Invalid verification code");
    }

    if (user.verificationCodeExpiresAt < Date.now()) {
      throw new CustomError.BadRequestError("Expired verification code");
    }

    user.isVerified = true;
    user.verified = Date.now();
    user.verificationCode = "";
    user.verificationCodeExpiresAt = null;

    await user.save();

    res.status(StatusCodes.OK).json({ msg: "Email verified" });
  } catch (error) {
    next(error);
  }
}

const login = (req, res) => {
   try {

  } catch(error) {
    next(error)
  }
}

const logout = (req, res) => {

}

const forgotPassword = (req, res) => {

}

const resetPassword = (req, res) => {

}

module.exports = {
  register,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword
}