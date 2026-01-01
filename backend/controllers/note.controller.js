import Note from '../models/note.model.js';

// @desc    Naya note banayein
// @route   POST /api/notes
export const createNote = async (req, res) => {
    try {
        const { title, content, category } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title aur Content dono chahiye" });
        }

        // Note create ho raha hai aur user ID req.user se aa rahi hai (Middleware ki wajah se)
        const note = new Note({
            user: req.user._id, 
            title,
            content,
            category
        });

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: "Note banane mein error aaya", error: error.message });
    }
};

// @desc    Logged-in user ke saare notes mangwayein
// @route   GET /api/notes
export const getNotes = async (req, res) => {
    try {
        // Find mein humne { user: req.user._id } dala hai
        // Iska matlab hai ki database sirf wahi notes dhundega jo is user ke hain
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Notes dikhane mein error aaya", error: error.message });
    }
};

// @desc    Note ko update karein
// @route   PUT /api/notes/:id
export const updateNote = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note nahi mila" });
        }

        // SECURITY CHECK: Kya ye note isi user ka hai?
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Aap kisi aur ka note edit nahi kar sakte" });
        }

        note.title = title || note.title;
        note.content = content || note.content;
        note.category = category || note.category;

        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Update karne mein error aaya", error: error.message });
    }
};

// @desc    Note ko delete karein
// @route   DELETE /api/notes/:id
export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note nahi mila" });
        }

        // SECURITY CHECK: Kya ye note isi user ka hai?
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Aap kisi aur ka note delete nahi kar sakte" });
        }

        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Note delete ho gaya hai" });
    } catch (error) {
        res.status(500).json({ message: "Delete karne mein error aaya", error: error.message });
    }
};