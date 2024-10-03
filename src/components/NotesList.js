import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteModal';

const NotesList = ({ notes, onNoteEdit, onNoteDelete, mode }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [hoveredNoteId, setHoveredNoteId] = useState(null);
  const [searchTag, setSearchTag] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const navigate = useNavigate();

  useEffect(() => {
    const filtered = notes.filter(note =>
      note.tag.toLowerCase().includes(searchTag.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchTag, notes]);

  const handleShowModal = (noteId, e) => {
    e.stopPropagation();
    setSelectedNoteId(noteId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedNoteId(null);
    setShowModal(false);
  };

  const handleMouseEnter = (noteId) => {
    setHoveredNoteId(noteId);
  };

  const handleMouseLeave = () => {
    setHoveredNoteId(null);
  };

  const handleNoteClick = (noteId) => {
    navigate(`/note/${noteId}`);
  };

  const handleEditClick = (note, e) => {
    e.stopPropagation();
    onNoteEdit(note);
  };

  const handleSearchChange = (e) => {
    setSearchTag(e.target.value);
  };

  const style = {
    backgroundColor: mode==='dark'?'#13466e':'white',
    color: mode==='dark'?'white':'#042743'
  };

  return (
    <div>
      <input
        type="text"
        style={style}
        value={searchTag}
        onChange={handleSearchChange}
        className="form-control mb-3"
        placeholder="Search by tag"
      />
      <ul className="list-group">
        {filteredNotes.map(note => (
          <li
            key={note._id}
            className={`list-group-item d-flex justify-content-between align-items-center my-3 text-${mode === 'light' ? 'dark' : 'light'}`}
            onMouseEnter={() => handleMouseEnter(note._id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleNoteClick(note._id)}
            style={{
              backgroundColor: mode === 'dark' ? '#2d3e50' : 'white',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              boxShadow: hoveredNoteId === note._id ? '0 4px 12px rgba(0, 0, 0, 0.3)' : 'none',
              transform: hoveredNoteId === note._id ? 'scale(1.01)' : 'scale(1)',
              cursor: 'pointer',
              border: `1px solid ${mode === 'dark' ? '#3c5976' : '#ddd'}`,
            }}
          >
            <div>
              <h5>{note.title}</h5>
              <p>{note.description}</p>
              <small>{note.tag}</small>
            </div>
            <div>
              <button
                className={`btn btn-${mode === 'light' ? 'secondary' : 'light'} btn-sm me-2`}
                onClick={(e) => handleEditClick(note, e)}
              >
                Edit
              </button>
              
              <button
                className="btn btn-danger btn-sm"
                onClick={(e) => handleShowModal(note._id, e)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <DeleteConfirmationModal 
        show={showModal} 
        onHide={handleCloseModal} 
        onDelete={() => {
          if (selectedNoteId) {
            onNoteDelete(selectedNoteId);
          }
          handleCloseModal();
        }}
        mode={mode}
      />
    </div>
  );
};

export default NotesList;