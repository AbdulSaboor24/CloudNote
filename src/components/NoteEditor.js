import React, { useState, useEffect } from 'react';
import noteService from '../services/noteService';

const NoteEditor = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note ? note.title : '');
  const [description, setDescription] = useState(note ? note.description : '');
  const [tag, setTag] = useState(note ? note.tag : '');

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setDescription(note.description || '');
      setTag(note.tag || '');
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const updatedNote = {
      title,
      description,
      tag,
    };

    try {
      if (note._id) {
        await noteService.updateNote(note._id, updatedNote, token);
      } else {
        console.error('No note ID found for updating');
        return;
      }

      onSave();
    } catch (err) {
      console.error('Error updating note:', err.message);
    }
  };

  return (
    <div className="container">
      <h3>Edit Note</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default NoteEditor;