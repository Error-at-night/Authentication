const crypto = require("crypto");
const CustomError = require('../errors');
const { isTokenValid, createHash } = require('../utils');
const Token = require('../models/Token');
const { attachCookiesToResponse } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const { accessToken } = req.signedCookies

  try {
    if (!accessToken) {
      throw new CustomError.UnauthenticatedError("Authentication Invalid")
    }

    const payload = isTokenValid(accessToken)
    req.user = payload.user
    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid")
  }
}

const authenticateRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.signedCookies

  if (!refreshToken) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid")
  }

  try {
    const payload = isTokenValid(refreshToken);

    const plainRefreshToken = payload.refreshToken;

    if (!plainRefreshToken) {
      throw new CustomError.UnauthenticatedError('Invalid token');
    }

    const hashedRefreshToken = createHash(plainRefreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: hashedRefreshToken,
    });

    if (!existingToken || !existingToken.isValid) {
      console.log("Refresh token not found in DB or marked invalid")
      throw new CustomError.UnauthenticatedError("Authentication Invalid")
    }

    await existingToken.deleteOne()

    const newPlainRefreshToken = crypto.randomBytes(40).toString("hex")
    const newHashedRefreshToken = createHash(newPlainRefreshToken)

    await Token.create({
      user: payload.user.userId,
      refreshToken: newHashedRefreshToken,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    });

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: newPlainRefreshToken,
    })

    req.user = payload.user;
    next()
  } catch (error) {
    console.log("Refresh token validation failed", error.message)
    throw new CustomError.UnauthenticatedError("Authentication Invalid")
  }
}

module.exports =  {
  authenticateUser,
  authenticateRefreshToken
}