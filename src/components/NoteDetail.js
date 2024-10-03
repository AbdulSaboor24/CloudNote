import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoteService from '../services/noteService';

const NoteDetail = ({ mode }) => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  let tag = '';

  useEffect(() => {
    const getNote = async () => {
      try {
        const fetchedNote = await NoteService.fetchNoteById(id);
        setNote(fetchedNote);
      } catch (err) {
        setError('Error fetching note');
      }
    };
    getNote();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!note) {
    return <div>Error finding Note</div>;
  }

  if (note.tag) {
    tag = 'Tag:';
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1 className="text-center flex-grow-1">{note.title}</h1>
        <h6
          className="mb-0"
          style={{ color: mode === 'dark' ? 'white' : 'black' }}
        >
          {tag} {note.tag}
        </h6>
      </div>
      <hr />
      <pre
        style={{
          fontSize: '1.2rem',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {note.content}
      </pre>
    </div>
  );
};

export default NoteDetail;