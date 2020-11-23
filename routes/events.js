/*
  UEvent Routes
  /api/events
*/ 

const { Router } = require('express');
const { validateJwt } = require('../middlewares/validateJwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// Get Events
router.get('/', validateJwt, getEvents);

// Create New Event
router.post('/', validateJwt, createEvent);

// Update Event
router.put('/:id', validateJwt, updateEvent);

// Delete Event
router.delete('/:id', validateJwt, deleteEvent);


module.exports = router;