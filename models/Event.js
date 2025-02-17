const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    image: { type: String },
    ticketTypes: [
      {
        type: { type: String, required: false },
        price: { type: Number, required: false },
        quantity: { type: Number, required: false },
      },
    ],
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Event", EventSchema);