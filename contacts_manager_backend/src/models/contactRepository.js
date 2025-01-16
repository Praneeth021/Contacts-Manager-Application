/**
 * Repository layer implementing data access logic.
 * Adheres to the Dependency Inversion Principle (SOLID - D).
 */
class ContactRepository {
    constructor(db) {
        this.db = db;
    }

    /**
     * Add a new contact to the database.
     * @param {Object} contact - The contact object containing name and email.
     * @param {Function} callback - Callback function to handle the result.
     */
    addContact(contact, callback) {
        const { name, email } = contact;
        this.db.run(
            'INSERT INTO contacts (name, email) VALUES (?, ?)',
            [name, email],
            callback
        );
    }


    /**
     * Check if an email already exists in the database.
     * @param {string} email - The email to check.
     * @param {Function} callback - Callback function to handle the result.
     */
    isEmailDuplicate(email, callback) {
        this.db.get('SELECT * FROM contacts WHERE email = ?', [email], callback);
    }

    /**
     * Retrieve all contacts from the database.
     * @param {Function} callback - Callback function to handle the result.
     */
    getAllContacts(callback) {
        this.db.all('SELECT * FROM contacts', [], callback);
    }

    /**
     * Search for contacts by name or email.
     * @param {string} query - Search query.
     * @param {Function} callback - Callback function to handle the result.
     */
    searchContacts(query, callback) {
        this.db.all(
            'SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ?',
            [`%${query}%`, `%${query}%`],
            callback
        );
    }

    /**
     * Delete a contact by ID.
     * @param {number} id - The ID of the contact to delete.
     * @param {Function} callback - Callback function to handle the result.
     */
    deleteContact(id, callback) {
        this.db.run('DELETE FROM contacts WHERE id = ?', [id], callback);
    }
}

module.exports = ContactRepository;