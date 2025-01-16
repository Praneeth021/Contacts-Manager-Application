import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactList = ({ contacts, onDelete }) => (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {contacts.map((contact) => (
                <ListItem
                    key={contact.id}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(contact.id)}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    }
                >
                    <ListItemText primary={contact.name} secondary={contact.email} />
                </ListItem>
            ))}
    </List>
);

export default ContactList;
