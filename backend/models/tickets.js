const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Types.ObjectId,
    description: "event must be a string",
  },
  user: {
    type: mongoose.Types.ObjectId,
    description: "user must be a string",
  },
  createdAt: {
    type: Date,
    description: "price must be a number",
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    description: "price must be a number",
    default: Date.now()
  },
});

const ticketModel = mongoose.model("Ticket", ticketSchema);

module.exports = ticketModel;
