const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    description: "name must be a string",
  },
  type: {
    type: String,
    description: "type must be a string",
  },
  location: {
    type: String,
    description: "location must be a string",
  },
  organiser: {
    type: mongoose.Types.ObjectId,
    description: "organiser must be an objectId",
  },
  description: {
    type: String,
    description: "description must be an string",
  },
  dateAndTime: {
    type: String,
    description: "date must be a string",
  },
  updatedAt: {
    type: Date,
    description: "updatedAt must be an date",
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    description: "createdAt must be an date",
    default: Date.now(),
  },
});

const eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;
