

const express = require('express');
const router = express.Router();
const db = require('../database');
const ContactRepository = require('../models/contactRepository');
const ContactController = require('../controllers/contactController');

// Dependency injection for the repository and controller
const contactRepository = new ContactRepository(db);
const contactController = new ContactController(contactRepository);

router.post('/contacts', contactController.addContact.bind(contactController));
router.get('/contacts', contactController.getAllContacts.bind(contactController));
router.get('/contacts/search', contactController.searchContacts.bind(contactController));
router.delete('/contacts/:id', contactController.deleteContact.bind(contactController));

module.exports = router;
