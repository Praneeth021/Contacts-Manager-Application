import React, { useEffect, useState } from 'react';
import { getAllContacts, searchContacts, deleteContact } from '../api/contactApi';
import ContactForm from '../components/contactForm';
import ContactList from '../components/contactList';
import SearchBar from '../components/searchBar';

import { Container, Typography } from '@mui/material';

const HomePage = () => {
    const [contacts, setContacts] = useState([]);

    const fetchContacts = async () => {
        const response = await getAllContacts();
        setContacts(response.data);
    };

    const handleSearch = async (query) => {
        const response = await searchContacts(query);
        setContacts(response.data);
    };

    const handleDelete = async (id) => {
        await deleteContact(id);
        fetchContacts();
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Contact Manager
            </Typography>
            <ContactForm onAdd={fetchContacts} />
            <SearchBar onSearch={handleSearch} />
            <ContactList contacts={contacts} onDelete={handleDelete} />
        </Container>
    );
};

export default HomePage;
