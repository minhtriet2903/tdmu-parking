const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const ticketComboSchema = new mongoose.Schema({
  CreatedDate: {
    type: Date,
    default: Date.now,
  },
  AvailableDays: {
    type: Number,
    default: 0,
  },
  Description: {
    type: String,
    default: "",
  },
  IsDelete: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("ticketCombo", ticketComboSchema);
