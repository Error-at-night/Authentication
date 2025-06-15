const { createAccessTokenJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const sendVerificationEmail = require("./sendVerificationEmail");
const resendVerificationCodeEmail = require('./resendVerificationCodeEmail');
const sendResetPasswordEmail = require("./sendResetPasswordEmail")
const resetPasswordSuccessEmail = require("./resetPasswordSuccessEmail")
const createHash = require("./createHash")

module.exports = {
  createAccessTokenJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  resendVerificationCodeEmail,
  sendResetPasswordEmail,
  resetPasswordSuccessEmail,
  createHash
};
