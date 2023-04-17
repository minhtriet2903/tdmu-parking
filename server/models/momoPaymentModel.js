const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const momoPaymentSchema = new mongoose.Schema({
  Amount: {
    type: Number,
    default: 0,
  },
  CreatedDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Momo", momoPaymentSchema);
