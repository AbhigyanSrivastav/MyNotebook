import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext'
import AuthContext from '../Context/Auth/AuthContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'
import { useNavigate } from "react-router-dom";


const Notes = () => {
  const navigate = useNavigate();
  const value = useContext(NoteContext)
  const authValue = useContext(AuthContext)
  const {result } = authValue
  const { notes, fetchNotes, edtNote, dltNote } = value
  const [note, setNote] = useState({title:"",description:""})
  const ref = useRef(null)

  const handleEdit=(incNote) => {
    setNote(incNote)
    console.log(incNote)
  }

  const handleDelete=(id) => {  
    dltNote(id)
  }

  const handleChange=(e) => {
    setNote({...note,[e.target.name]: e.target.value})
  }

  const handleSubmit=(e) => {
    e.preventDefault();
    edtNote(note)
    console.log("sent")
    ref.current.click()
  }

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      fetchNotes()
    }else{
      navigate('/login')
    }
     // eslint-disable-next-line 
  },[])

  return (
    <>
      <AddNote />
      <div className="container">
        {/* Modal Start */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5"  id="exampleModalLabel">Edit your note..</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.title} placeholder='Add a title...' id="title" name="title"  onChange={handleChange} minLength={5} required={true}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" value={note.description} placeholder="Add a description..." id="description" name="description" onChange={handleChange} minLength={5} required={true}></textarea>
                  </div>

                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal End */}
        <div className="row my-3">
          <h2>Your Notes</h2>
          <div className="container">
            {
              !(notes.length) && "No Notes"
            }
          </div>
          {
            notes.map((note) => {
              return <NoteItem note={note} key={note._id} handleEdit={handleEdit} handleDelete={handleDelete}/>
            })
          }
        </div>
      </div>
    </>
  )
}

export default Notes