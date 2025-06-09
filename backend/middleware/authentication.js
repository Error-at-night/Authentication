const CustomError = require('../errors');
const { isTokenValid, createHash } = require('../utils');
const Token = require('../models/Token');
const { attachCookiesToResponse } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);

    const hashedRefreshToken = createHash(refreshToken)

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: hashedRefreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    const newRefreshToken = crypto.randomBytes(40).toString("hex")
    const newHashedRefreshToken = createHash(newRefreshToken)

    await existingToken.deleteOne()

    await Token.create({
      refreshToken: newHashedRefreshToken,
      user: payload.user.userId,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    })

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: newRefreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
}

module.exports = { 
  authenticateUser 
}