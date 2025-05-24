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

    if(password !== confirmPassword) {
      throw new CustomError.BadRequestError("Passwords does not match")
    }

    const emailAlreadyExists = await User.findOne({ email })

    if(emailAlreadyExists) {
      throw new CustomError.BadRequestError("Email already exists")
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    // const verificationCodeExpiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes
    const verificationCodeExpiresAt = Date.now() + 2 * 60 * 1000; // 2 minutes


    const user = await User.create({ fullName, email, password, verificationCode, verificationCodeExpiresAt })
    
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

const resendVerificationCode = async (req, res, next) => {
  const email = req.body.email?.toLowerCase().trim()

  try {

    if(!email) {
      throw new CustomError.BadRequestError("Please provide your email")
    }

    const user = await User.findOne({ email })

    if(!user) {
      throw new CustomError.BadRequestError("Invalid email")
    }

    if(user.isVerified) {
      throw new CustomError.BadRequestError("Email is verified")
    }

    const now = Date.now();

    if (user.lastVerificationEmailSentAt && (now - user.lastVerificationEmailSentAt.getTime() < 60 * 1000)) {
      throw new CustomError.TooManyRequestsError("Please wait at least 1 minute before requesting another code.");
    }

    if (user.verificationCodeExpiresAt > now) {
      return res.status(StatusCodes.OK).json({ msg: "A verification code was already sent recently. Please check your inbox." })
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    // const verificationCodeExpiresAt = now + 10 * 60 * 1000 // 10 minutes
    const verificationCodeExpiresAt = now + 2 * 60 * 1000; // 2 minutes

    user.verificationCode = verificationCode
    user.verificationCodeExpiresAt = verificationCodeExpiresAt
    user.lastVerificationEmailSentAt = new Date(now);

    await user.save()

    await sendVerificationEmail({ email: user.email, fullName: user.fullName, verificationCode: user.verificationCode });

    res.status(StatusCodes.OK).json({ msg: "Verification code resent. Please check your inbox." });
  
  } catch(error) {
    next(error)
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
  verifyEmail,
  resendVerificationCode,
  login,
  logout,
  forgotPassword,
  resetPassword
}