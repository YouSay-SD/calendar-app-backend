const { response } = require('express');
const Event = require('../models/Event');

// Get Events
const getEvents = async (req, res = response) => {

  const events = await Event.find().populate('user', 'name');

  res.json({
    ok: true,
    events
  });
}

// Create Event
const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const eventSaved = await event.save();

    res.json({
      ok: true,
      event: eventSaved
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}

// Update Event
const updateEvent = async (req, res = response) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: "The event with that id don't exist"
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You don't have privileges to edit this event"
      });
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

    res.json({
      ok: true,
      event: updateEvent
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk to the admin'
    });
  }
}

// Delete Event
const deleteEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Delete Events'
  });
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}