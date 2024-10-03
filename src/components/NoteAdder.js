import React, { useState } from 'react';
import noteService from '../services/noteService';
import { useNavigate } from 'react-router-dom';

const NoteAdder = ({ onCancel, mode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [contentPages, setContentPages] = useState(['']);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  const handleInitialize = (e) => {
    e.preventDefault();
    setIsInitialized(true);
  };

  const handleContentChange = (e, pageIndex) => {
    const content = e.target.value;
    const newContent = [...contentPages];

    newContent[pageIndex] = content;

    const lineCount = newContent[pageIndex].split('\n').length;

    if (lineCount > 21 && pageIndex === currentPage) {
      setContentPages([...newContent, '']);
      setCurrentPage(pageIndex + 1);
    } else {
      setContentPages(newContent);
    }
  };

  const handleSave = async () => {
    setError(null);

    const noteData = {
      title,
      description,
      tag,
      content: contentPages.join('\n'),
    };

    try {
      await noteService.createNote(noteData);
      navigate('/NotesList');

      setTitle('');
      setDescription('');
      setTag('');
      setContentPages(['']);
      setCurrentPage(0);
      setIsInitialized(false);
    } catch (error) {
      setError(error.response?.data?.errors || error.message);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < contentPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const style = {
    backgroundColor: mode === 'dark' ? '#13466e' : 'white',
    color: mode === 'dark' ? 'white' : '#042743',
  };

  return (
    <div className="container">
      <h3>Add Note</h3>
      {!isInitialized ? (
        <form onSubmit={handleInitialize}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              style={style}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              style={style}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tag (Optional)</label>
            <input
              type="text"
              className="form-control"
              style={style}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Initialize Note</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancel</button>
        </form>
      ) : (
        <>
          <div className="mb-3">
            <label className="form-label">Content (Page {currentPage + 1})</label>
            <div className="d-flex">
              <textarea
                className="form-control"
                style={{
                  height: '535px',
                  fontSize: '1.2rem',
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  lineHeight: '1.5rem',
                  backgroundColor: mode === 'dark' ? '#13466e' : 'white',
                  color: mode === 'dark' ? 'white' : '#042743',
                }}
                value={contentPages[currentPage]}
                onChange={(e) => handleContentChange(e, currentPage)}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && currentPage > 0 && contentPages[currentPage].trim() === '') {
                    e.preventDefault();
                    const newContent = [...contentPages];
                    newContent[currentPage - 1] = newContent[currentPage - 1].trim();
                    setContentPages(newContent);
                    handlePreviousPage();
                  }
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              Previous Page
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleNextPage}
              disabled={currentPage === contentPages.length - 1}
            >
              Next Page
            </button>
          </div>
          <button className="btn btn-primary mt-3" onClick={handleSave}>Save Note</button>
          <button className="btn btn-secondary ms-2 mt-3" onClick={onCancel}>Cancel</button>
          
          {error && (
            <div className="alert alert-danger mt-3">
              {Array.isArray(error) ? error.join(', ') : error}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NoteAdder;