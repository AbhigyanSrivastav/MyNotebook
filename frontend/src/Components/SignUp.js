import React, { useContext, useEffect, useState } from 'react'
import '../SignUp.css'
import { Link } from "react-router-dom";
import AuthContext from '../Context/Auth/AuthContext'
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const value = useContext(AuthContext)
  const { signup, result } = value
  const [details, setDetails] = useState({ name: "", email: "", password: "" })
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(details)  
  }

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  useEffect(() => {
     if (result.success) {
      console.log("Signup Signupjs",result.authToken);
      localStorage.setItem('authToken', result.authToken)
      navigate('/')
    }
    // eslint-disable-next-line
  }, [result.success])
  

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <h2 className="card-title text-center">Register</h2>
              <div className="card-body py-md-4">
                <form _lpchecked="1" onSubmit={handleSubmit} method='POST'>
                  <div className="form-group">
                    <input type="text" className="form-control" id="name" name="name" placeholder="Name" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control" id="email" name="email" placeholder="Email" onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={handleChange} />
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <div> Been Here? <Link to="/login">Login</Link></div>
                    <button className="btn btn-primary">Create Account</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp