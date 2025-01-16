import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const addContact = (contact) => axios.post(`${API_URL}/contacts`, contact);
export const getAllContacts = () => axios.get(`${API_URL}/contacts`);
export const searchContacts = (query) => axios.get(`${API_URL}/contacts/search`, { params: { query } });
export const deleteContact = (id) => axios.delete(`${API_URL}/contacts/${id}`);
