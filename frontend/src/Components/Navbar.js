import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../Context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const value = useContext(AuthContext);
  const { setResult } = value;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setResult({
      authToken: "",
    });
    console.log("removed");
    navigate("/login");
  };

  return (
    <div className="nav-container" style={{ position: "sticky",top: 0, zIndex: 100,backdropFilter: "blur(10px)" }}>
    <nav className="navbar navbar-expand-lg navbar-dark p-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          My Notebook
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link px-3" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/notesearch" className="nav-link px-3" activeClassName="active">
                Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/userprofile" className="nav-link px-3" activeClassName="active">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/sharednote" className="nav-link px-3" activeClassName="active">
                Shared
              </NavLink>
            </li>
          </ul>
        <button className="btn btn-primary text-light ml-auto " onClick={handleLogout}>
          Logout
        </button>
        </div>
      </div>
    </nav>
  </div>
  );
};

export default Navbar;
