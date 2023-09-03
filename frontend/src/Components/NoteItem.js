import React from "react";
import "../App.css";
import dlt from "../assests/delete.png";
import edt from "../assests/edit.png";
import dwnld from "../assests/download.png";
import shareIcon from "../assests/share.png";

const NoteItem = (props) => {
  const { note, handleEdit, handleDelete, handleDownload, handleShare } = props;

  return (
    <>
      <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Title:</h5>
          <p>{note.title}</p>
          <h5 className="card-title">Description:</h5>
          <p>{note.description}</p>
          <div className="d-flex justify-content-between">
            <img
              src={dlt}
              alt="Delete"
              id="delete"
              onClick={() => handleDelete(note._id)}
            />
            <img
              src={edt}
              alt="Edit"
              id="edit"
              onClick={() => handleEdit(note)}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            />
            <img
              src={dwnld}
              alt="Download"
              id="download"
              onClick={() => handleDownload(note)}
              style={{ width: "1.5rem", height: "1.5rem", cursor: "pointer" }}
            />
          
              <img
                src={shareIcon}
                alt="Share"
                style={{ width: "1.2rem", height: "1.2rem", marginRight: "5px",cursor: "pointer" }}
                onClick={() => handleShare(note)}
              />
              
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default NoteItem;
