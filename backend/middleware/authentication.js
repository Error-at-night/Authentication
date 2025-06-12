const CustomError = require('../errors');
const { isTokenValid, createHash } = require('../utils');
const Token = require('../models/Token');
const { attachCookiesToResponse } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const { accessToken } = req.signedCookies;

  try {
    if (!accessToken) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }

    const payload = isTokenValid(accessToken)
    req.user = payload.user
    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid')
  }
}

const authenticateRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.signedCookies

  if (!refreshToken) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid')
  }

  try {
    const payload = isTokenValid(refreshToken)

    const hashedRefreshToken = createHash(refreshToken)

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: hashedRefreshToken,
    })

    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }

    await existingToken.deleteOne()

    const newRefreshToken = crypto.randomBytes(40).toString('hex')
    const newHashedRefreshToken = createHash(newRefreshToken)

    await Token.create({
      user: payload.user.userId,
      refreshToken: newHashedRefreshToken,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    })

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: newRefreshToken,
    })

    req.user = payload.user
    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid')
  }
}

module.exports =  {
  authenticateUser,
  authenticateRefreshToken
}