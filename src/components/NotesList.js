import React, { useState } from 'react';
import DeleteConfirmationModal from './DeleteModal';

const NotesList = ({ notes, onNoteEdit, onNoteDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleShowModal = (noteId) => {
    setSelectedNoteId(noteId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedNoteId(null);
    setShowModal(false);
  };

  return (
    <div>
      <ul className="list-group">
        {notes.map(note => (
          <li key={note._id} className="list-group-item d-flex justify-content-between align-items-center my-3">
            <div>
              <h5>{note.title}</h5>
              <p>{note.description}</p>
              <small>{note.tag}</small>
            </div>
            <div>
              <button className="btn btn-secondary btn-sm me-2" onClick={() => onNoteEdit(note)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleShowModal(note._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal 
        show={showModal} 
        onHide={handleCloseModal} 
        onDelete={() => {
          if (selectedNoteId) {
            onNoteDelete(selectedNoteId);
          }
          handleCloseModal();
        }} 
      />
    </div>
  );
};

export default NotesList;