const request = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

beforeAll((done) => {
    db.serialize(() => {
        db.run('DELETE FROM contacts'); // Clear database before tests
        db.run('INSERT INTO contacts (name, email) VALUES (?, ?)', ['Praneeth Kadampally', 'praneeth@kadampally.com']);
        db.run('INSERT INTO contacts (name, email) VALUES (?, ?)', ['Sreeja', 'Sreeja@gmail.com'], done);
    });
});

describe('Contact API Tests', () => {
    test('Should add a new contact', async () => {
        const response = await request(app)
            .post('/api/contacts')
            .send({ name: 'Chintu', email: 'chintu@gmail.com' });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Contact added successfully.');
    });

    test('Should retrieve all contacts', async () => {
        const response = await request(app).get('/api/contacts');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
    });

    test('Should search for contacts', async () => {
        const response = await request(app).get('/api/contacts/search').query({ query: 'Praneeth' });

        expect(response.status).toBe(200);
        expect(response.body[0].name).toBe('Praneeth Kadampally');
    });

    test('Should delete a contact', async () => {
        const response = await request(app).delete('/api/contacts/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Contact deleted successfully.');
    });
});
