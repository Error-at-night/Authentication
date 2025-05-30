const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
// const checkPermissions = require('./checkPermissions');
const sendVerificationEmail = require("./sendVerificationEmail");
const resendVerificationCodeEmail = require('./resendVerificationCodeEmail');
const sendResetPasswordEmail = require("./sendResetPasswordEmail")

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  // checkPermissions,
  sendVerificationEmail,
  resendVerificationCodeEmail,
  sendResetPasswordEmail
};
