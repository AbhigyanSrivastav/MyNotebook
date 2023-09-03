const express = require('express');
const Notes = require('../models/NotesModel')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const NotesModel = require('../models/NotesModel');
const router = express.Router();


//Route 1: Adding Notes,Login Required,POST method,param: title,description
router.post(
    '/addnote',
    [
        body('title', "Enter a valid title")
            .notEmpty()
            .isLength({ min: 2 }),
        body('description', "Enter a valid description")
            .notEmpty()
            .isLength({ min: 5 })
    ],
    fetchuser,
    async (req, res) => {


        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }
        try {

            let note = await Notes.create(
                {
                    user: req.user.id,
                    title: req.body.title,
                    description: req.body.description
                }
            );

            res.send(note)
        } catch (err) {
            res.status(500).send({message: err.message });

        }

    })

//Route 2: Fetching Notes,Login Required,POST method,param:NA

router.post('/fetchnotes', fetchuser, async (req, res) => {

    try {
        let userId = req.user.id
        let notes = await Notes.find({ user: userId })
        res.send(notes)

    } catch (err) {
        res.status(500).send({message: err.message });
    }
})

//Route 3: Editing a note,Login Required,PUT method,param:noteId

router.put('/editnote/:noteid', fetchuser, async (req, res) => {
    
    try {
        const{title,description}=req.body;
        let noteId=req.params.noteid
        let note = await Notes.findById(noteId)
        if (!note) {
        return res.status(404).json({ error: "Not Found" });
        }
        if (note.user.toString()!==req.user.id){
        return res.status(404).json({ error: "Access Denied" });

        }
        let newNote={}
        if(title){
            newNote.title=title;
        }
        if(description){
            newNote.description=description;
            }
        note=await NotesModel.findByIdAndUpdate(
            noteId,
           {$set:newNote},
           {new:true}
        )
        res.send(note)
    } catch (err) {
        res.status(500).send({message: err.message });

    }
})

//Route 4: Deleting a note,Login Required,Delete method,param:noteId

router.delete('/deletenote/:noteid', fetchuser, async (req, res) => {
    
    try {
        let noteId=req.params.noteid
        let note = await Notes.findById(noteId)
        if (!note) {
        return res.status(404).json({ error: "Not Found" });
        }
        if (note.user.toString()!==req.user.id){
        return res.status(404).json({ error: "Access Denied" });
        }
  
        note=await Notes.findByIdAndDelete(noteId)
        res.send({message:"Note deleted successfully"})
    } catch (err) {
        res.status(500).send({message: err.message });

    }
})

// Route 5: Share a note, Login Required, POST method, param: noteId
router.post('/sharenote/:noteid',fetchuser, async (req, res) => {
    
    try{
        let noteId=req.params.noteid
        let email = req.body.recipientEmail;
        let note = await Notes.findById(noteId)
        if (!note) {
            return res.status(404).json({ error: "Not Found" });
        }
        if (note.user.toString()!==req.user.id){
            return res.status(404).json({ error: "Access Denied" });
        }

            note.sharedWith.push(email)
            note.shared=true
            await note.save();
            console.log(email)
            res.send({ message: "Note shared successfully",email });
    } catch (err) {
            res.status(500).send({ message: err.message });
        }
})

// Route 6: Fetch shared notes, Login Required, POST method, param: NA
router.post('/fetchsharednotes', fetchuser, async (req, res) => {
    try {
      const userId = req.user.id;
      let notes = await Notes.find({ user: userId, shared: true });
  
      res.send(notes);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
  
module.exports = router