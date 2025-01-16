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
    
        // Log incoming request
        console.log(`Received request to add contact: ${JSON.stringify({ name, email })}`);
    
        if (!name || !email) {
            console.log('Validation failed: Name and Email are required.');
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Name and Email are required.' });
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log(`Validation failed: Invalid email format for email: ${email}`);
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid email format.' });
        }
    
        this.contactRepository.isEmailDuplicate(email, (err, row) => {
            if (err) {
                console.error(`Database error during duplicate check: ${err.message}`);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error checking email.', error: err.message });
            }
    
            if (row) {
                console.log(`Duplicate email found: ${email}`);
                return res.status(HttpStatus.CONFLICT).json({ message: 'Duplicate entry. Email already exists.' });
            }
    
            this.contactRepository.addContact({ name, email }, (err) => {
                if (err) {
                    console.error(`Database error during insert: ${err.message}`);
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error adding contact.', error: err.message });
                }
                console.log(`Successfully added contact: ${name}, ${email}`);
                res.status(HttpStatus.CREATED).json({ message: 'Contact added successfully.' });
            });
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