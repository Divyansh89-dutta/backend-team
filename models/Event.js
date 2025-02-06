const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true }, // Ensure this is a proper date type
    time: { type: String, required: true }, // Consider using Date if needed
    venue: { type: String, required: true },
    image: { type: String }, // URL for event image
    ticketTypes: [
      {
        type: { type: String, required: true }, // e.g., General, VIP
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
