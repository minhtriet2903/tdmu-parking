const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const transactionSchema = new mongoose.Schema({
  Method: {
    type: String,
    default: "Cash",
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
  TransContent: {
    type: String,
    default: "Nạp tiền",
  },
  TransType: {
    type: String,
    default: "NapTien",
  },
  UserId: {
    type: String,
    default: "",
  },
  IdCardNapTien: {
    type: String,
    default: "",
  },
  Status: {
    type: String,
    default: "Pending",
  },
  PaymentId: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("Transaction", transactionSchema);
