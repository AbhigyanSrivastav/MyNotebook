import React, { useContext } from "react";
import AuthContext from "../Context/Auth/AuthContext";
import NoteContext from "../Context/Notes/NoteContext";
import '../UserProfile.css'
const UserProfile = () => {
  const authContext = useContext(AuthContext);
  const noteContext = useContext(NoteContext);
  const { result } = authContext;
  const { notes } = noteContext;
  
  return (
    <div className="user-profile-container">
      <div className="user-profile-content">
        <h1 className="display-4 mb-4">User Profile</h1>
        <div className="user-details-container">
          <div className="user-details">
            <p>
              <strong>Name:</strong> {result.user.name}
            </p>
            <p>
              <strong>Email:</strong> {result.user.email}
            </p>
            <p>
              <strong>Total Notes:</strong> {notes.length}
            </p>
            <p>
              <strong>Auth Token:</strong>{" "}
              <span className="auth-token">{result.authToken}</span>
            </p>
            <p>
              <strong>Logged In:</strong> {result.success.toString()}
            </p>
            </div>
        </div>
      </div>
    </div>

/* <div className="container mt-4">
<div className="row justify-content-center">
  <div className="col-lg-6">
    <div className="card shadow">
      <div className="card-body">
        <h1 className="card-title display-4 mb-4">User Profile</h1>
        <div className="user-details">
          <p>
            <strong>Name:</strong> {result.user.name}
          </p>
          <p>
            <strong>Email:</strong> {result.user.email}
          </p>
          <p>
            <strong>Auth Token:</strong>{" "}
            <span className="auth-token">{result.authToken}</span>
          </p>
          <p>
            <strong>Logged In:</strong> {result.success.toString()}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</div> */
  );
};

export default UserProfile;
