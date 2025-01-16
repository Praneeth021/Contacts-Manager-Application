import React, { useState } from 'react';
import { addContact } from '../api/contactApi';

const ContactForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addContact({ name, email });
        onAdd();
        setName('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <button type="submit">Add</button>
        </form>
    );
};

export default ContactForm;
