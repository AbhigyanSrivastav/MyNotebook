import React, { useContext, useState } from 'react'
import '../LogIn.css'
import { Link } from "react-router-dom";
import AuthContext from '../Context/Auth/AuthContext'
import bgImage from "../assests/bg.jpg"
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const value = useContext(AuthContext)
  const { login, result } = value
  const [details, setDetails] = useState({ email: "", password: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    login(details)
    if (result.success) {
      localStorage.setItem('authToken', result.authToken)
      console.log("Login",result.authToken);
      navigate('/')
    }
  }

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const styles = {
    loginContainer: {
      minHeight: '100vh',
    },
    imageContainer: {
      minHeight: '100vh',
    },
    bgImage: {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    },
  };


return (
    <div className="container-fluid" style={styles.loginContainer}>
      <div className="row no-gutter" style={styles.imageContainer}>
        {/* The image half */}
        <div
          className="col-md-6 d-none d-md-flex bg-image"
          style={styles.bgImage}
        ></div>

        {/* The content half */}
        <div className="col-md-6" style={{background:"black"}}>
          <div className="login d-flex align-items-center py-5">
            <div className="wrapper">
              <div className="text-center mt-4 name">My NoteBook</div>
              <form className="p-3 mt-3" onSubmit={handleSubmit} method="POST">
                <div className="form-field d-flex align-items-center">
                  <span className="fas fa-key"></span>
                  <input type="email" name="email" onChange={handleChange} id="email" placeholder="Email" required={true} />
                </div>
                <div className="form-field d-flex align-items-center">
                  <span className="fas fa-key"></span>
                  <input type="password" name="password" onChange={handleChange} id="pwd" placeholder="Password" required={true} minLength={5} />
                </div>
                <button className="btn btn-primary">Login</button>
              </form>
              <div className="text-center fs-6">
                New Here? 
                 <Link to="/signup">Sign up</Link>
              </div>
            </div>
            {/* End */}
          </div>
        </div>
        {/* End */}
      </div>
    </div>
  );
}

export default LogIn