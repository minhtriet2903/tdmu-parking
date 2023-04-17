const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const transactionSchema = new mongoose.Schema({
  Method: {
    type: String,
    default: "TDMU_Coin",
  },
  Amount: {
    type: Number,
    default: 0,
  },
  StudentCode: {
    type: String,
  },
  CreatedDate: {
    type: Date,
    default: Date.now,
  },
  TransType: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("Transaction", transactionSchema);
