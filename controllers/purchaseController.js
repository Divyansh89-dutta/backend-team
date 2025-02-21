// controllers/purchaseController.js
const Ticket = require("../models/Ticket");
const { sendPurchaseNotification } = require("../utils/notification");
const purchaseTicket = async (req, res) => {
  try {
    const { ticketId, userEmail, quantity = 1 } = req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    if (ticket.quantity - ticket.sold < quantity) {
      return res.status(400).json({ message: "Not enough tickets available" });
    }
    ticket.sold += quantity;
    await ticket.save();
    if (userEmail) {
      sendPurchaseNotification(userEmail, ticket)
        .then(() => console.log("Notification sent"))
        .catch((err) => console.error("Notification error:", err));
    }
    res.status(200).json({ message: "Purchase successful", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = { purchaseTicket };
