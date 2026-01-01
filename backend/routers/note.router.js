import express from 'express';
import { 
    createNote, 
    getNotes, 
    updateNote, 
    deleteNote 
} from '../controllers/note.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Sabhi routes ko 'protect' kar diya gaya hai
// Taaki sirf authenticated user hi access kar sake
router.route('/')
    .post(protect, createNote)
    .get(protect, getNotes);

router.route('/:id')
    .put(protect, updateNote)
    .delete(protect, deleteNote);

export default router;