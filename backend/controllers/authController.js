const User = require("../models/User")
const Token = require("../models/Token")
const CustomError = require("../errors")
const { StatusCodes } = require("http-status-codes")
const { attachCookiesToResponse, createTokenUser, sendVerificationEmail, resendVerificationCodeEmail, sendResetPasswordEmail, createHash, resetPasswordSuccessEmail, createAccessTokenJWT, isTokenValid } = require("../utils/index")
const crypto = require('crypto');

const register = async (req, res, next) => {
  const { fullName, email, password, confirmPassword } = req.body

  try {

    if(!fullName || !email || !password || !confirmPassword) {
      throw new CustomError.BadRequestError("All fields are required")
    }

    if(password !== confirmPassword) {
      throw new CustomError.BadRequestError("Passwords do not match")
    }

    const emailAlreadyExists = await User.findOne({ email })

    if(emailAlreadyExists) {
      throw new CustomError.BadRequestError("Email already exists")
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const verificationCodeExpiresAt = Date.now() + 5 * 60 * 1000 

    const user = await User.create({ fullName, email, password, verificationCode, verificationCodeExpiresAt })
    
    await sendVerificationEmail({ email: user.email, fullName: user.fullName, verificationCode: user.verificationCode });

    res.status(StatusCodes.CREATED).json({ message: "Please verify your email" })

  } catch(error) {
    next(error)
  }
}

const verifyEmail = async (req, res, next) => {
  const { verificationCode } = req.body

  try {
    const user = await User.findOne({ verificationCode })

    if(!user) {
      throw new CustomError.BadRequestError("Invalid or expired verification code")
    }

    if(user.isVerified) {
      throw new CustomError.BadRequestError("Email is already verified")
    }

    if(user.verificationCodeExpiresAt && user.verificationCodeExpiresAt < Date.now()) {
      throw new CustomError.BadRequestError("Invalid or expired verification code")
    }

    user.isVerified = true
    user.verified = Date.now()
    user.verificationCode = ""
    user.verificationCodeExpiresAt = null

    await user.save()

    res.status(StatusCodes.OK).json({ message: "Email verified" })
  } catch (error) {
    next(error)
  }
}

const resendVerificationCode = async (req, res, next) => {
  const { email } = req.body

  try {

    if(!email) {
      throw new CustomError.BadRequestError("Please provide your email")
    }

    const user = await User.findOne({ email })

    if (!user) {
      throw new CustomError.NotFoundError("Email does not exist")
    }

    if(user.isVerified) {
      throw new CustomError.BadRequestError("Email is already verified")
    }

    const now = Date.now()

    if(user.lastVerificationEmailSentAt && (now - user.lastVerificationEmailSentAt.getTime() < 60 * 1000)) {
      throw new CustomError.TooManyRequestsError("A verification code has already been sent, please check your email")
    }

    if(user.verificationCodeExpiresAt && user.verificationCodeExpiresAt > now) {
      return res.status(StatusCodes.OK).json({ message: "A verification code was already sent recently, please check your email." })
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const verificationCodeExpiresAt = now + 5 * 60 * 1000

    user.verificationCode = verificationCode
    user.verificationCodeExpiresAt = verificationCodeExpiresAt
    user.lastVerificationEmailSentAt = new Date(now)

    await user.save()

    await resendVerificationCodeEmail({ email: user.email, fullName: user.fullName, verificationCode: user.verificationCode })

    res.status(StatusCodes.OK).json({ message: "Verification code resent, please check your email." })
  
  } catch(error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  
  try {
    if (!email || !password) {
      throw new CustomError.BadRequestError("Please provide your email and password")
    }

    const user = await User.findOne({ email })

    if (!user) {
      throw new CustomError.BadRequestError("Invalid email or password")
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
      throw new CustomError.BadRequestError("Invalid email or password")
    }

    if (!user.isVerified) {
      throw new CustomError.UnauthorizedError("Please verify your email")
    }

    const tokenUser = createTokenUser(user)

    const accessTokenJWT = createAccessTokenJWT({ payload: { user: tokenUser }})

    const refreshToken = crypto.randomBytes(40).toString("hex")
    const hashedRefreshToken = createHash(refreshToken)

    await Token.findOneAndDelete({ user: user._id })

    await Token.create({
      refreshToken: hashedRefreshToken,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      user: user._id,
    })

    attachCookiesToResponse({ res, user: tokenUser, refreshToken })

    res.status(StatusCodes.OK).json({ message: "Login successful", user: tokenUser, accessToken: accessTokenJWT })
  } catch (error) {
    next(error)
  }
}

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.signedCookies

  try {
    if (!refreshToken) {
      throw new CustomError.UnauthenticatedError("Authentication invalid")
    }

    const payload = isTokenValid(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const plainRefreshToken = payload.refreshToken

    if(!plainRefreshToken) {
      throw new CustomError.UnauthenticatedError("Authentication invalid")
    }

    const hashedRefreshToken = createHash(plainRefreshToken)

    const existingToken = await Token.findOne({
      refreshToken: hashedRefreshToken,
      user: payload.user.userId,
    })

    if (!existingToken || !existingToken.isValid) {
      throw new CustomError.UnauthenticatedError("Authentication invalid")
    }

    await existingToken.deleteOne()

    const newRefreshToken = crypto.randomBytes(40).toString("hex")
    const newHashedRefreshToken = createHash(newRefreshToken)

    await Token.create({
      user: payload.user.userId,
      refreshToken: newHashedRefreshToken,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    })

    const newAccessTokenJWT = createAccessTokenJWT({ payload: { user: payload.user }})

    attachCookiesToResponse({ res, user: payload.user, refreshToken: newRefreshToken })

    res.status(StatusCodes.OK).json({ user: payload.user, accessToken: newAccessTokenJWT })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    await Token.findOneAndDelete({ user: req.user.userId })
    
    res.cookie("refreshToken", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    
    res.status(StatusCodes.OK).json({ message: "Logout successful" })
  } catch(error) {
    next(error)
  }
}

const forgotPassword = async (req, res, next) => {
  const { email } = req.body

  try {

    if(!email) {
      throw new CustomError.BadRequestError("Please provide your email")
    }

    const user = await User.findOne({ email })

    if(user) {
      const origin = "http://localhost:5173"

      const passwordToken = crypto.randomBytes(70).toString("hex")

      const tenMinutes = 1000 * 60 * 10

      const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes)

      user.passwordToken = createHash(passwordToken)
      user.passwordTokenExpirationDate = passwordTokenExpirationDate

      await user.save()

      await sendResetPasswordEmail({ fullName: user.fullName, email: user.email, token: passwordToken, origin })
    }

    res.status(StatusCodes.OK).json({ message: "Please check your email for the reset password link" })

  } catch(error) {
    next(error)
  }
}

const resetPassword = async (req, res, next) => {
  const { token } = req.params
  const { password, confirmPassword } = req.body

  try {
    if (!password) {
      throw new CustomError.BadRequestError("Please provide a new password")
    }

    if(!confirmPassword) {
      throw new CustomError.BadRequestError("Please confirm your new password")
    }

    if(password !== confirmPassword) {
      throw new CustomError.BadRequestError("Passwords do not match")
    }

    const hashedToken = createHash(token)
    
    const user = await User.findOne({
      passwordToken: hashedToken,
      passwordTokenExpirationDate: { $gt: new Date() } 
    })

    if(!user) {
      throw new CustomError.BadRequestError("Invalid or expired link")
    }
    
    user.password = password
    user.passwordToken = null
    user.passwordTokenExpirationDate = null
    await user.save()

    await resetPasswordSuccessEmail({ fullName: user.fullName, email: user.email })

    res.status(StatusCodes.OK).json({ message: "Password reset successful" })

  } catch(error) {
    next(error)
  }
}

module.exports = {
  register,
  verifyEmail,
  resendVerificationCode,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword
}