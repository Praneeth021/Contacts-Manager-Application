/**
 * Controller layer to handle HTTP requests and responses.
 * Adheres to the Single Responsibility Principle (SOLID - S).
 */
const HttpStatus = require('http-status-codes');

class ContactController {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }

    /**
     * Add a new contact.
     */
    addContact(req, res) {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Name and Email are required.' });
        }
        this.contactRepository.addContact({ name, email }, (err) => {
            if (err) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error adding contact.', error: err.message });
            }
            res.status(HttpStatus.CREATED).json({ message: 'Contact added successfully.' });
        });
    }

    /**
     * Get all contacts.
     */
    getAllContacts(req, res) {
        this.contactRepository.getAllContacts((err, rows) => {
            if (err) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving contacts.', error: err.message });
            }
            res.status(HttpStatus.OK).json(rows);
        });
    }

    /**
     * Search contacts by name or email.
     */
    searchContacts(req, res) {
        const { query } = req.query;
        this.contactRepository.searchContacts(query, (err, rows) => {
            if (err) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error searching contacts.', error: err.message });
            }
            res.status(HttpStatus.OK).json(rows);
        });
    }

    /**
     * Delete a contact by ID.
     */
    deleteContact(req, res) {
        const { id } = req.params;
        this.contactRepository.deleteContact(id, (err) => {
            if (err) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting contact.', error: err.message });
            }
            res.status(HttpStatus.OK).json({ message: 'Contact deleted successfully.' });
        });
    }
}

module.exports = ContactController;