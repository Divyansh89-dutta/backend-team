const Event = require("../models/Event");
const { uploadToCloudinary } = require("../utils/upload");

const createEvent = async (req, res) => {
  try {
    console.log(req.user)
    if (req.user.role !== "organizer") {
      return res.status(403).json({ message: "Access Denied" });
    }

    let imageUrl = "";
    if (req.file) {
      const uploadResponse = await uploadToCloudinary(req.file.path);
      imageUrl = uploadResponse.secure_url;
    }

    console.log(imageUrl, "Uploading image")

    // const newEvent = new Event({
    //   ...req.body,
    //   image: imageUrl,
    //   organizer: req.user._id,
    // });

    // const savedEvent = await newEvent.save();
    // res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Event Creation Error:", error); // Log full error
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    let imageUrl = event.image; 
    if (req.file) {
      const uploadResponse = await uploadToCloudinary(req.file.path);
      imageUrl = uploadResponse.secure_url;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imageUrl },
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};


module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};