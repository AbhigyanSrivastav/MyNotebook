import React, { useContext, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext'

const AddNote = () => {
  const value = useContext(NoteContext)
  const{addNote}=value
  const intialNote={
    title: '',
    description:''
  }
  const [note, setNote] = useState(intialNote)
  const handleSubmit=(e) => {
    e.preventDefault()
    addNote(note)
    setNote(intialNote)

  };
  const handleChange = (e) => {
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
      <div className="container mt-5 p-3">
        <form onSubmit={handleSubmit}>
          <h1 className="display-3 mb-3">Make a note..</h1>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" onChange={handleChange}  value={note.title} placeholder='Add a title...' id="title" name="title" minLength={5} required={true}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" placeholder="Add a description..." onChange={handleChange} value={note.description} id="description" name="description" minLength={5} required={true}></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Add Note</button>
        </form>
      </div>
    </>
  )
}

export default AddNote