import React, { useState, useContext, useEffect } from 'react';
import NoteContext from '../Context/Notes/NoteContext';
import NoteItem from './NoteItem';
import '../NoteSearch.css'

const NoteSearch = () => {
  const value = useContext(NoteContext);

  const { notes,fetchNotes, edtNote, dltNote } = value
  const [searchQuery, setSearchQuery] = useState('');

  // Filter notes based on search query
  const filteredNotes = 
  Array.isArray(notes) && notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    dltNote(id);
  };

  const handleEdit = (note) => {
    edtNote(note);
  };

  const handleDownload = (note) => {
    const textToSave = `Title: ${note.title}\nDescription: ${note.description}`;
    const blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${note.title}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Fetch notes when the component mounts
    fetchNotes();
    console.log("Fetching notes")
    // eslint-disable-next-line
  }, []);

  return (
    <div className="notes-list-container">
    <div className="container shadow p-4">
      <h2 className="text-center mb-4" style={{ color: "#fff" }}>Search Notes</h2>
      <div className="search-bar-container mb-3 text-center">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="row justify-content-center">
        {filteredNotes.length === 0 ? (
          <div className="col-12 text-center">
            <p>No matching notes found.</p>
          </div>
        ) : (
          Array.isArray(notes) ? (
            filteredNotes.map((note) => (
              <div className="col-md-4 mb-4" key={note._id}>
                <NoteItem
                  note={note}
                  handleDelete={() => handleDelete(note._id)}
                  handleEdit={() => handleEdit(note)}
                  handleDownload={() => handleDownload(note)}
                />
              </div>
            ))
          ) : (
            <p>No notes found.</p>
          )          
        )}
      </div>
    </div>
  </div>

  );
};

export default NoteSearch;
