// // routes/ticketRoutes.js
// const express = require("express");
// const router = express.Router();
// const Ticket = require("../models/Ticket");
// const Event = require("../models/Event");

// // Create Ticket for an Event
// router.post("/:eventId/tickets", async (req, res) => {
//     try {
//         const { eventId } = req.params;
//         const { name, price, quantity } = req.body;

//         // Check if event exists
//         const event = await Event.findById(eventId);
//         if (!event) {
//             return res.status(404).json({ message: "Event not found" });
//         }

//         // Create new ticket
//         const ticket = new Ticket({
//             event: eventId,
//             name,
//             price,
//             quantity,
//             sold: 0,
//         });
//         await ticket.save();
        
//         res.status(201).json(ticket);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// // Get a Single Ticket by ID (to view the updated ticket)
// router.get("/tickets/:ticketId", async (req, res) => {
//     try {
//         const { ticketId } = req.params;
//         const ticket = await Ticket.findById(ticketId);
//         if (!ticket) {
//             return res.status(404).json({ message: "Ticket not found" });
//         }
//         res.json(ticket);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// // Update Ticket
// // Update Ticket
// router.put("/tickets/:ticketId", async (req, res) => {
//     try {
//         let { ticketId } = req.params;
//         // Trim any extra whitespace or newline characters
//         ticketId = ticketId.trim();
//         console.log("Updating ticket with ID:", JSON.stringify(ticketId));

//         const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body, { new: true });
//         if (!updatedTicket) {
//             return res.status(404).json({ message: "Ticket not found" });
//         }
//         res.json(updatedTicket);
//     } catch (error) {
//         console.error("Update Ticket Error:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

// // Delete Ticket
// router.delete("/tickets/:ticketId", async (req, res) => {
//     try {
//         let { ticketId } = req.params;
//         // Trim any extra whitespace or newline characters
//         ticketId = ticketId.trim();
//         console.log("Deleting ticket with ID:", JSON.stringify(ticketId));

//         // Check if ticketId is a valid MongoDB ObjectId
//         if (!ticketId.match(/^[0-9a-fA-F]{24}$/)) {
//             return res.status(400).json({ message: "Invalid Ticket ID" });
//         }

//         const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
//         if (!deletedTicket) {
//             return res.status(404).json({ message: "Ticket not found" });
//         }

//         res.json({ message: "Ticket deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });

 
// module.exports = router;
// routes/ticketRoutes.js
const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const { purchaseTicket } = require("../controllers/purchaseController");

// Create Ticket for an Event
router.post("/:eventId/tickets", async (req, res) => {
  try {
    const { eventId } = req.params;
    const { name, price, quantity } = req.body;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Create new ticket
    const ticket = new Ticket({
      event: eventId,
      name,
      price,
      quantity,
      sold: 0,
    });
    await ticket.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get a Single Ticket by ID
router.get("/tickets/:ticketId", async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update Ticket
router.put("/tickets/:ticketId", async (req, res) => {
  try {
    let { ticketId } = req.params;
    ticketId = ticketId.trim();

    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body, { new: true });
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(updatedTicket);
  } catch (error) {
    console.error("Update Ticket Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete Ticket
router.delete("/tickets/:ticketId", async (req, res) => {
  try {
    let { ticketId } = req.params;
    ticketId = ticketId.trim();

    if (!ticketId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Ticket ID" });
    }
      
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Purchase Ticket Endpoint (with notification)
router.post("/purchase", purchaseTicket);

module.exports = router;
