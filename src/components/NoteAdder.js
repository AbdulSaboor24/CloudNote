import React, { useState } from 'react';
import noteService from '../services/noteService';
import { useNavigate } from 'react-router-dom';

const NoteAdder = ({onCancel}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const noteData = {
      title,
      description,
      tag,
    };

    try {
      const createdNote = await noteService.createNote(noteData);
      
      navigate('/NotesList')

      setTitle('');
      setDescription('');
      setTag('');
    } catch (error) {
      setError(error.response?.data?.errors || error.message);
    }
  };

  return (
    <div className="container">
      <h3>Add Note</h3>
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

export default NoteAdder;
