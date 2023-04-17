const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const cardSchema = new mongoose.Schema({
  CreatedDate: {
    type: Date,
    default: Date.now,
  },
  BikeTicket: {
    type: Number,
    default: 0,
  },
  CardId: {
    type: String,
    default: "",
  },
  userId: {
    type: String,
    default: "",
  },
  studentCode: {
    type: String,
    default: "",
  },
  PhieuXeTheoGoi: {
    type: String,
    default: "",
  },
  IsActive: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("card", cardSchema);
