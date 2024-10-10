import axios from 'axios';

const API_URL = "https://cloudnote-backend.vercel.app/api/notes";

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User authentication token is missing');
  }
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all notes
const fetchAllNotes = async () => {
  const response = await axios.get(`${API_URL}/fetchallnotes`, getAuthHeaders());
  return response.data;
};

// Create a new note
const createNote = async ({ title, description, tag, content }) => {
  const response = await axios.post(
    `${API_URL}/addnote`,
    { title, description, tag, content },
    getAuthHeaders()
  );
  return response.data;
};

// Update a note
const updateNote = async (id, note) => {
  const response = await axios.put(
    `${API_URL}/updatenote/${id}`,
    note,
    getAuthHeaders()
  );
  return response.data;
};

// Delete a note
const deleteNote = async (id) => {
  const response = await axios.delete(`${API_URL}/deletenote/${id}`, getAuthHeaders());
  return response.data;
};

// Fetch user details
const fetchUserDetails = async () => {
  const response = await axios.post(`http://localhost:5000/api/auth/getUser`, {}, getAuthHeaders());
  return response.data;
};

const fetchNoteById = async (id) => {
  const response = await axios.get(`${API_URL}/fetchnote/${id}`, getAuthHeaders());
  return response.data;
};

const NoteService = {
  fetchAllNotes,
  createNote,
  updateNote,
  deleteNote,
  fetchNoteById,
  fetchUserDetails,
};

export default NoteService;