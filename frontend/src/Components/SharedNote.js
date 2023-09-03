import React, { useContext, useEffect } from 'react';
import NoteContext from '../Context/Notes/NoteContext'

const SharedNote = () => {
  const value = useContext(NoteContext);
  const { notes, fetchSharedNotes } = value;

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      fetchSharedNotes();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
    <h2 className="text-center mt-4 mb-3" style={{ color: "#fff" }}>Shared Notes</h2>
    <div className="row justify-content-center align-items-center">
      {notes.length === 0 && (
        <p className="text-center">No shared notes found.</p>
      )}
      {
       Array.isArray(notes) &&
      notes.map((note) => (
        <div key={note._id} className="col-lg-4 col-md-6 mb-4">
          <div className="card shadow rounded">
            <div className="card-header bg-primary text-white">
              Recipient's Email: {note.sharedWith.join(", ")}
            </div>
            <div className="card-body">
              <div className="mb-2">
                <strong>Title:</strong>
              </div>
              <p className="card-text">{note.title}</p>
              <div className="mb-2">
                <strong>Description:</strong>
              </div>
              <p className="card-text">{note.description}</p>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  </div>
  );
};

export default SharedNote;
