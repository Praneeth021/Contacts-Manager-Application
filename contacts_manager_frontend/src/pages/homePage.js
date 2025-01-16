import React, { useEffect, useState } from 'react';
import { getAllContacts, searchContacts, deleteContact, addContact } from '../api/contactApi';
import ContactForm from '../components/contactForm';
import ContactList from '../components/contactList';
import SearchBar from '../components/searchBar';

import { Container, Typography, Alert, Snackbar } from '@mui/material';

const HomePage = () => {
    const [contacts, setContacts] = useState([]);

    const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });

    const fetchContacts = async () => {
        try {
            const response = await getAllContacts();
            setContacts(response.data);
        } catch (error) {
            showAlert('Failed to fetch contacts.', 'error');
        }
    };

    const handleSearch = async (query) => {
        try {
            const response = await searchContacts(query);
            setContacts(response.data);
        } catch (error) {
            showAlert('Error searching contacts.', 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteContact(id);
            fetchContacts();
            showAlert('Contact deleted successfully.', 'success');
        } catch (error) {
            showAlert('Error deleting contact.', 'error');
        }
    };

    const handleAddContact = async (contact) => {
        try {
            await addContact(contact);
            fetchContacts();
            showAlert('Contact added successfully.', 'success');

        } catch (error) {
        
           // Handle specific backend errors
            if (error.response) {
                if (error.response.status === 409) {
                    // Duplicate entry
                    showAlert('Duplicate entry. Contact already exists.', 'warning');
                } else if (error.response.status === 400) {
                    // Bad request (e.g., invalid email)
                    showAlert(error.response.data.message, 'error');
                } else {
                    // Other errors
                    showAlert('An unexpected error occurred.', 'error');
                }
            } else {
                // Network or unknown errors
                showAlert('Failed to connect to the server.', 'error');
            }
        }
    };

    const showAlert = (message, severity) => {
        setAlert({ open: true, message, severity });
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Contact Manager
            </Typography>
            <ContactForm onAdd={handleAddContact} />
            <SearchBar onSearch={handleSearch} />
            <ContactList contacts={contacts} onDelete={handleDelete} />
            <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default HomePage;
