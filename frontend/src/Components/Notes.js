import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/Notes/NoteContext";
// import AuthContext from '../Context/Auth/AuthContext'
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import "../Notes.css"
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const value = useContext(NoteContext);
  // const authValue = useContext(AuthContext)
  // const {result } = authValue
  const { notes, fetchNotes, edtNote, dltNote, shareNote } = value;
  const [note, setNote] = useState({ title: "", description: "" });
  const ref = useRef(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState("");

  const handleEdit = (incNote) => {
    setNote(incNote);
    console.log(incNote);
  };

  const handleDelete = (id) => {
    dltNote(id);
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
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
  const handleSubmit = (e) => {
    e.preventDefault();
    edtNote(note);
    console.log("sent");
    ref.current.click();
  };

  const handleShare = (note) => {
    setSelectedNote(note);
    setShowShareModal(true);
  };

  const handleShareNote = () => {
    shareNote(selectedNote._id, recipientEmail);
    setShowShareModal(false);
    setRecipientEmail("");
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      fetchNotes();
      console.log("Fetching notes", localStorage.getItem("authToken"));
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AddNote />
      <div className="container mt-2">
        {/* Modal Start */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-bs-backdrop="false"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit your note..
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={note.title}
                      placeholder="Add a title..."
                      id="title"
                      name="title"
                      onChange={handleChange}
                      minLength={5}
                      required={true}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      value={note.description}
                      placeholder="Add a description..."
                      id="description"
                      name="description"
                      onChange={handleChange}
                      minLength={5}
                      required={true}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={ref}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal End */}

        {/* Note sharing modal */}
        {selectedNote && showShareModal && (
          <div
            className="modal"
            style={{ display: showShareModal ? "block" : "none" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Share Note
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowShareModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="recipientEmail" className="form-label">
                        Recipient's Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="recipientEmail"
                        name="recipientEmail"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowShareModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleShareNote}
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Note Sharing Modal End */}
        <div className="row my-1">
          <h2 style={{ color: "#fff" }}>Your Notes</h2>
          {notes.length === 0 && <div className="container">No Notes</div>}
          {Array.isArray(notes) ? (
            notes.map((note) => (
              <NoteItem
                note={note}
                key={note._id}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleDownload={handleDownload}
                handleShare={handleShare}
              />
            ))
          ) : (
            <p>No notes found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
