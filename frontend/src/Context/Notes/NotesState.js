import NoteContext from './NoteContext'
import React, { useContext, useState } from 'react'
import AuthContext from '../Auth/AuthContext'


const NotesState = (props) => {
  const [notes, setNotes] = useState([])
  const value = useContext(AuthContext)
  const { result } = value


    const fetchNotes=async() => {
      let response = await fetch('http://127.0.0.1:5000/api/notes/fetchnotes', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken:`${result.authToken}`
        },
      })
      let json=await response.json();
      setNotes(json)

      console.log("fetchnotes",result.authToken)
    }
    const addNote=async(incNote) => { //inc->Incomming note
      let note={
        title: incNote.title,
        description: incNote.description,
      }
      let response = await fetch('http://127.0.0.1:5000/api/notes/addnote', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken:`${result.authToken}`
        },
        body:JSON.stringify(note)
      })
      let json=await response.json();
      setNotes(notes.concat(json))
     
    }
    const edtNote=async(note) => { 
    
      let newNotes= JSON.parse(JSON.stringify(notes))

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id===note._id){
          newNotes[index].title=note.title
          newNotes[index].description=note.description
          break;
        }
        
      }    
      
      let response = await fetch(`http://127.0.0.1:5000/api/notes/editnote/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authToken:`${result.authToken}`
        },
        body:JSON.stringify(note)
      })
      let json=await response.json();
      setNotes(newNotes)
      console.log(json);
    }


    const dltNote=async(id) => {
      let newNotes= notes.filter(note => note._id!==id);
      let response = await fetch(`http://127.0.0.1:5000/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authToken:`${result.authToken}`
        },
      })
      let json=await response.json();
      console.log(json);
      setNotes(newNotes);
    }

    const fetchSharedNotes = async () => {
      try {
        let response = await fetch(`http://127.0.0.1:5000/api/notes/fetchsharednotes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authToken: `${result.authToken}`,
          },
        });
        let json = await response.json();
        setNotes(json);
      } catch (error) {
        console.error('Error fetching shared notes:', error);
      }
    };
  
    const shareNote = async (noteId, recipientEmail) => {
      try {
        let response = await fetch(`http://127.0.0.1:5000/api/notes/sharenote/${noteId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authToken: `${result.authToken}`,
          },
          body: JSON.stringify({ recipientEmail }),
        });
        let json = await response.json();
        console.log('Note shared successfully:', json);
      } catch (error) {
        console.error('Error sharing note:', error);
      }
    };
  
  return (
    <>
    {
        <NoteContext.Provider value={{notes,fetchNotes,addNote,edtNote,dltNote,fetchSharedNotes,shareNote}}>
            {props.children}
        </NoteContext.Provider>
    }
    </>
  )
}

export default NotesState