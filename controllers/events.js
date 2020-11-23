const { response } = require('express');
const Event = require('../models/Event');

// Get Events
const getEvents = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Get Events'
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
const updateEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Update Events'
  });
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