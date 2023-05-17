const mongoose = require("mongoose");

const citizenSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  confirmpassword: {
    type: Number,
    required: true,
  },
});

const Register = new mongoose.model("CitizensData", citizenSchema);

module.exports = Register;
