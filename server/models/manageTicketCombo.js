const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const manageTicketComboSchema = new mongoose.Schema({
  CreatedDate: {
    type: Date,
    default: Date.now,
  },
  TicketComboId: {
    type: String,
  },
  CardId: {
    type: String,
  },
});
module.exports = mongoose.model("manageTicketCombo", manageTicketComboSchema);
