const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser')
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// Route 1: fetch all notes using: GET "api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// Route 2: add a new Note using: Post "api/notes/addnote".
router.post('/addnote', fetchuser, [
    body('title', 'Title must be at least 1 characters').isLength({ min: 1 }),
    body('description', 'Description must be at least 1 characters').isLength({ min: 1 }),
    body('content', 'Content cannot be empty').isLength({ min: 1 })
], async (req, res) => {
    const { title, description, tag, content } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, content,
            user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Updating a already existing Note using: Put "api/notes/updatenote".
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag, content } = req.body
    try {
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }
        if (content) {
            newNote.content = content
        }

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("You can only update your own notes")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 4: Deleting a existing Note using: Delete "api/notes/deletenote".
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("You can only delete your own notes")
        }

        await Note.findByIdAndDelete(req.params.id)
        res.json({ message: "Note has been deleted successfully" })

    } catch {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 5: Fetch a single note by ID using: GET "api/notes/fetchnote/:id". login required
router.get('/fetchnote/:id', fetchuser, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("You can only access your own notes");
        }
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router