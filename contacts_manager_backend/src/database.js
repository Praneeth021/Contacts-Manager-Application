// SQLite database setup and connection
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contacts.db', (err) => {
    if (err) console.error(err.message);
    else console.log('Connected to the contacts database.');
});

// Initialize database schema
const initializeDB = () => {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL
            );
        `);
    });
};

initializeDB();

module.exports = db;