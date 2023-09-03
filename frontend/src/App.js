import React from 'react'
import Notes from './Components/Notes'
import NotesState from './Context/Notes/NotesState'
import AuthState from './Context/Auth/AuthState'
import NotesSearch from './Components/NoteSearch'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import UserProfile from './Components/UserProfile';
import SharedNote from './Components/SharedNote';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { NavbarWrapper } from './Components/NavbarWrapper'
import "./App.css"

const App = () => {
  const bgStyle={
    background: "radial-gradient(circle at -10.9% 66.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)",
      minHeight:"100vh",
      // backgroundAttachment: "fixed",
      backgroundPosition: "center", 
      backgroundRepeat: "no-repeat",
  }

  return (
    <div className='App-container' style={bgStyle}>
      <AuthState>
      <NotesState>
        <Router>
          <NavbarWrapper/>
            <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Notes />} />
            <Route path="/notesearch" element={<NotesSearch />} />
            <Route path="/userprofile" element={<UserProfile />}/>
            <Route path="/sharednote" element={<SharedNote />}/>
            </Routes>
        </Router>
      </NotesState>
      </AuthState>
    </div>
  )
}

export default App