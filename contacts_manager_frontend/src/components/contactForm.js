import React, { useState } from 'react';
import { addContact } from '../api/contactApi';
import { TextField, Button, Box } from '@mui/material';


const ContactForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onAdd({name,email});
        setName('');
        setEmail('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Add Contact
            </Button>
        </Box>
    );
};

export default ContactForm;
