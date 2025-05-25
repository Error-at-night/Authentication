const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcryptjs');

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
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email"
    }
  },
  password: {
    type: String,
    required: [true, "Please provide your password"]
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
  }

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