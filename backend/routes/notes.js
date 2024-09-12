const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser')
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// Route 1: fetch all notes using: GET "api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try{
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// Route 2: add a new Note using: Post "api/notes/createnote".
router.post('/addnote', fetchuser, [
    body('title', 'Title must be atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res)=>{

    try {
        const {title, description, tag} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag,
            user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Error Occurred");
    }
})

module.exports = router