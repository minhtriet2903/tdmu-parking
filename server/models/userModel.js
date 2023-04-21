const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    default: "",
  },
  Email: {
    type: String,
    default: "",
    // required: true,
    // unique: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  //   minLength: 6,
  // },
  // birthDate: {
  //   type: Date,
  // },
  // sex: {
  //   type: String,
  //   default: "male",
  // },
  // address: {
  //   type: String,
  //   default: "",
  // },
  // avatar: {
  //   type: String,
  //   default: "https://tanangroup.com/omg/img/profile.jpg",
  // },
  Role: {
    type: String,
    default: "Student",
  },
  CreatedDate: {
    type: Date,
    default: Date.now,
  },
  PhoneNumber: {
    type: String,
    default: "",
  },
  StudentCode: {
    type: String,
    default: "",
  },
  TotalAmount: {
    type: Number,
    default: 0,
  },
  CurrentAmount: {
    type: Number,
    default: 0,
  },
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model("user", userSchema);
module.exports = User;
