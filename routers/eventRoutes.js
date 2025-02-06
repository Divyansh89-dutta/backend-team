const express = require('express');
const Event = require('../models/Event');
const { protect } = require('../middleware/authMiddleware'); // Authentication middleware

const router = express.Router();

// ✅ Create Event (Only for Organizers)
router.post('/', protect, async (req, res) => {
    try {
        if (req.user.role !== 'organizer') {
            return res.status(403).json({ message: 'Access Denied: Only organizers can create events' });
        }

        const newEvent = new Event({ ...req.body, organizer: req.user.id });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
});

// ✅ Get All Events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
});

// ✅ Get Single Event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error: error.message });
    }
});

// ✅ Update Event (Only for Organizers)
router.put('/:id', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.organizer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized: You can only edit your own events' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
});

// ✅ Delete Event (Only for Organizers)
router.delete('/:id', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.organizer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized: You can only delete your own events' });
        }

        await Event.deleteOne({ _id: req.params.id });
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
});

module.exports = router;
