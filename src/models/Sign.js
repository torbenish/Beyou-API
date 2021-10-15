const mongoose = require("../database/db");
const { isEmail } = require("validator");

const SignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  socialname: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, "invalid email"],
  },
  telephone: {
    type: Number,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Sign = mongoose.model("Sign", SignSchema);

module.exports = Sign;
