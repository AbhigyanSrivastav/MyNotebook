import React from 'react'
import Navbar from './Components/Navbar'
// import Alert from './Components/Alert'
import Notes from './Components/Notes'
import NotesState from './Context/Notes/NotesState'
import AuthState from './Context/Auth/AuthState'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <>
      <AuthState>
      <NotesState>
        <Router>
          <Navbar/>
           {/* <Alert /> */}
            <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
      </NotesState>
      </AuthState>
    </>
  )
}

export default App