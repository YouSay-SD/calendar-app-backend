/*
  UEvent Routes
  /api/events
*/ 

const { Router } = require('express');
const { validateJwt } = require('../middlewares/validateJwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// All requests get this validation
router.use(validateJwt);

// Get Events
router.get('/', getEvents);

// Create New Event
router.post('/', createEvent);

// Update Event
router.put('/:id', updateEvent);

// Delete Event
router.delete('/:id', deleteEvent);


module.exports = router;