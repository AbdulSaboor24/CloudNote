import React, { useState, useEffect } from 'react';
import noteService from '../services/noteService';

const NoteEditor = ({ note, onSave, onCancel, mode }) => {
  const [title, setTitle] = useState(note ? note.title : '');
  const [description, setDescription] = useState(note ? note.description : '');
  const [tag, setTag] = useState(note ? note.tag : '');
  const [contentPages, setContentPages] = useState(note ? note.content.split('\n').reduce((acc, line) => {
    const currentPage = acc[acc.length - 1];
    if (currentPage.length < 21) {
      currentPage.push(line);
    } else {
      acc.push([line]);
    }
    return acc;
  }, [[]]) : [['']]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setDescription(note.description || '');
      setTag(note.tag || '');
      const pages = note.content.split('\n').reduce((acc, line) => {
        const currentPage = acc[acc.length - 1];
        if (currentPage.length < 21) {
          currentPage.push(line);
        } else {
          acc.push([line]);
        }
        return acc;
      }, [[]]);
      setContentPages(pages);
      setCurrentPage(0);
    }
  }, [note]);

  const handleContentChange = (e, pageIndex) => {
    const newContent = [...contentPages];
    newContent[pageIndex] = e.target.value.split('\n');

    const lineCount = newContent[pageIndex].length;

    if (lineCount > 21 && pageIndex === currentPage) {
      setContentPages([...newContent, ['']]);
      setCurrentPage(pageIndex + 1);
    } else {
      setContentPages(newContent);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const updatedNote = {
      title,
      description,
      tag,
      content: contentPages.map(page => page.join('\n')).join('\n'),
    };

    try {
      if (note._id) {
        await noteService.updateNote(note._id, updatedNote, token);
        onSave();
      } else {
        console.error('No note ID found for updating');
      }
    } catch (err) {
      console.error('Error updating note:', err.message);
    }
  };

  const style = {
    backgroundColor: mode==='dark'?'#13466e':'white',
    color: mode==='dark'?'white':'#042743'
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
          <label className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            style={style}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>

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
                backgroundColor: mode==='dark'?'#13466e':'white',
                color: mode==='dark'?'white':'#042743'
              }}
              value={contentPages[currentPage].join('\n')}
              onChange={(e) => handleContentChange(e, currentPage)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && currentPage > 0 && contentPages[currentPage].join('').trim() === '') {
                  e.preventDefault();
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

        <button type="submit" className="btn btn-primary mt-3">Save</button>
        <button type="button" className="btn btn-secondary ms-2 mt-3" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default NoteEditor;