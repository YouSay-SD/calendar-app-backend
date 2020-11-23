/*
  UEvent Routes
  /api/events
*/ 

const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validateFields');
const { validateJwt } = require('../middlewares/validateJwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// All requests get this validation
router.use(validateJwt);

// Get Events
router.get('/', getEvents);

// Create New Event
router.post(
  '/',
  [
    check('title', 'The title is required').not().isEmpty(),
    check('start', 'Initial Date is required').custom(isDate),
    check('end', 'End Date is required').custom(isDate),
    validateFields
  ], 
  createEvent
);

// Update Event
router.put('/:id', updateEvent);

// Delete Event
router.delete('/:id', deleteEvent);


module.exports = router;