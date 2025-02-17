// routes/ticketRoutes.js
const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const Event = require("../models/Event");


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
        res.status(500).json({ message: "Server error", error });
    }
});

// Get Tickets for an Event
router.get("/:eventId/tickets", async (req, res) => {
    try {
        const { eventId } = req.params;
        const tickets = await Ticket.find({ event: eventId });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Update Ticket
router.put("/tickets/:ticketId", async (req, res) => {
    try {
        const { ticketId } = req.params;
        const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body, { new: true });
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Delete Ticket
router.delete("/tickets/:ticketId", async (req, res) => {
    try {
        const { ticketId } = req.params;
        await Ticket.findByIdAndDelete(ticketId);
        res.json({ message: "Ticket deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;