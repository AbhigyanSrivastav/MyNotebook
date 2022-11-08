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


        let success = false;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {

            let note = await Notes.create(
                {
                    user: req.user.id,
                    title: req.body.title,
                    description: req.body.description
                }
            );
            success = true;
            res.send({ success, note })
        } catch (err) {
            res.status(500).send({ success, message: err.message });

        }

    })

//Route 2: Fetching Notes,Login Required,POST method,param:NA

router.post('/fetchnotes', fetchuser, async (req, res) => {
    let success = false;

    try {
        let userId = req.user.id
        let notes = await Notes.find({ user: userId })
        success = true;
        res.send({ success, notes })

    } catch (err) {
        res.status(500).send({ success, message: err.message });
    }
})

//Route 3: Editing a note,Login Required,PUT method,param:noteId

router.put('/editnote/:noteid', fetchuser, async (req, res) => {
    let success = false;
    
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
        success = true;
        res.send({success,note})
    } catch (err) {
        res.status(500).send({ success, message: err.message });

    }
})

//Route 4: Deleting a note,Login Required,Delete method,param:noteId

router.delete('/deletenote/:noteid', fetchuser, async (req, res) => {
    let success = false;
    
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
        success = true;
        res.send({success,message:"Note deleted successfully"})
    } catch (err) {
        res.status(500).send({ success, message: err.message });

    }
})
module.exports = router