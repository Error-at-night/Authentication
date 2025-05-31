const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcryptjs');

const emailPattern = /@gmail\.com$/i
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your fullname'],
    minlength: 7,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your email"],
    trim: true,
    lowercase: true,
    validate: [
      {
        validator: validator.isEmail,
        message: "Please provide your email address",
      },
      {
        validator: function(value) {
          return emailPattern.test(value);
        },
        message: "Please provide a valid email address (eg johndoe@gmail.com)",
      },
      {
        validator: function(value) {
          const firstPart = value.split("@")[0];
          return firstPart.length >= 5;
        },
        message: "The name before '@' must be at least 5 characters long",
      },
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    validate: {
      validator: function(value) {
        return passwordPattern.test(value);
      },
      message: "Password must be at least 8 characters, include an uppercase letter, number, and symbol",
    },
  },
  verificationCode: String,
  verificationCodeExpiresAt: Date,
  verified: Date,
  isVerified: {
    type: Boolean,
    default: false,
  },
  lastVerificationEmailSentAt: {
    type: Date,
    default: null,
  },
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },

}, { timestamps: true })

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);