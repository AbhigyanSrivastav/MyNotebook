import React,{useContext} from 'react'
import {Link} from "react-router-dom";
import AuthContext from '../Context/Auth/AuthContext'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const value = useContext(AuthContext)
  const { setResult } = value

  const handleLogout = () =>{
    localStorage.removeItem('authToken');
    setResult({
      authToken:""
    })
    console.log("removed")
    navigate('/login');
  }
  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">My Notebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    </div>
    
   { !(localStorage.getItem('authToken'))?<form className="d-flex"><Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
    <Link className="btn btn-primary mx-3" to="/signup" role="button">Signup</Link>
    </form>:<button className="btn btn-primary mx-3" onClick={handleLogout}>Logout</button>
   }
  </nav>
  </div>
  )
}

export default Navbar