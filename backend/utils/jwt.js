const jwt = require('jsonwebtoken');

const createJWT = ({ payload,  expiresIn = "1m" }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user }, expiresIn: "1m" });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken }, expiresIn: "7d" });

  // for testing
  const oneHour = 1000 * 60 

  // const oneHour = 1000 * 60 * 60
  const sevenDays = 1000 * 60 * 60 * 24 * 7

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: "Strict",
    expires: new Date(Date.now() + oneHour)
  });

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: "Strict",
    expires: new Date(Date.now() + sevenDays)
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};