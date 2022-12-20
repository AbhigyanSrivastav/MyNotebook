import React from 'react'
import '../App.css'
import dlt from '../assests/delete.png'
import edt from '../assests/edit.png'

const NoteItem = (props) => {
   const {note,handleEdit,handleDelete}=props
   
    return (
        <>
       
            <div className="card col-md-4 m-3 p-2" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex justify-content-between m-1">
                        <img src={dlt} alt="Delete" id="delete" onClick={()=>handleDelete(note._id)}/>
                        <img src={edt} alt="Edit" id="edit" onClick={()=>handleEdit(note)} data-bs-toggle="modal" data-bs-target="#exampleModal"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem