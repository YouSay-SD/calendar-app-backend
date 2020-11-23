const { response } = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const { use } = require('../routes/auth');
// const { generateJwt } = require('../helpers/jwt'); 

// Get Events
const getEvents = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Get Events'
  });
}

// Create Event
const createEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Create Events'
  });
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