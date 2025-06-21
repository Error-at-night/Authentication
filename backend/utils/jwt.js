const jwt = require('jsonwebtoken');

const createAccessTokenJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" })
  return token
}

const createRefreshTokenJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "2m" })
  return token
}

const isTokenValid = (token, secret) => jwt.verify(token, secret)

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const refreshTokenJWT = createRefreshTokenJWT({ payload: { user, refreshToken } })

//  const oneDay = 1000 * 60 * 60 * 24
 const oneDay = 1000 * 60 * 2

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: "Strict",
    expires: new Date(Date.now() + oneDay)
  })
}

module.exports = {
  createAccessTokenJWT,
  isTokenValid,
  attachCookiesToResponse,
}