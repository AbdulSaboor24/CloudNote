import React, { useEffect, useState } from 'react';
import NoteEditor from '../components/NoteEditor';
import NoteAdder from '../components/NoteAdder';
import NotesList from '../components/NotesList';
import noteService from '../services/noteService';
import { useNavigate } from 'react-router-dom';

const Home = ({mode}) => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [addingNote, setAddingNote] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await noteService.fetchAllNotes();
        setNotes(response);
      } catch (err) {
        console.error('Error fetching notes:', err.message);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchNotes();
  }, [navigate]);

  const handleCancel = () => {
    setEditingNote(null);
    setAddingNote(false);
  };

  const handleSave = async () => {
    try {
      const response = await noteService.fetchAllNotes();
      setNotes(response);
      setEditingNote(null);
      setAddingNote(false);
    } catch (err) {
      console.error('Error refreshing notes:', err.message);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setAddingNote(false);
  };

  const handleDelete = async (id) => {
    try {
      await noteService.deleteNote(id);
      const response = await noteService.fetchAllNotes();
      setNotes(response);
    } catch (err) {
      console.error('Error deleting note:', err.message);
    }
  };

  return (
    <div className="container my-4">
      {editingNote ? (
        <NoteEditor note={editingNote} onSave={handleSave} onCancel={handleCancel} mode={mode}/>
      ) : addingNote ? (
        <NoteAdder onSave={handleSave} onCancel={handleCancel} mode={mode}/>
      ) : (
        <div>
          <button className="btn btn-primary mb-3" onClick={() => setAddingNote(true)}>
            Add Note
          </button>
          <NotesList notes={notes} onNoteEdit={handleEdit} onNoteDelete={handleDelete} mode={mode}/>
        </div>
      )}
    </div>
  );
};

export default Home;