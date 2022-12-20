import React, {useState} from 'react'
import AuthContext from './AuthContext'
const AuthState = (props) => {

    const [result, setResult] = useState({authToken:"",success:false})
    // const [success, setSuccess] = useState(result.success)

    const login=async(details) => {
      
        let response = await fetch('http://127.0.0.1:5000/api/auth/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(details)
          })
          let json=await response.json();
           setResult({
            authToken: json.authToken,
            success:json.success
          })
          result.success===true&&console.log("Login Authstate ",result.authToken)
          // result.success===true&&setSuccess(result.success)
    }

    const signup=async(details) => {
      
        let response = await fetch('http://127.0.0.1:5000/api/auth/signup', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(details)
          })
          let json=await response.json();
           setResult({
            authToken: json.authToken,
            success:json.success
          })
          result.success===true&&console.log("Signup Authstate ",result.authToken)

          // result.success===true&&setSuccess(result.success)
          
    }
  return (
    <div>
        <AuthContext.Provider value={{login,signup,result,setResult}}>
            {props.children}
        </AuthContext.Provider>
    </div>
  )
}

export default AuthState