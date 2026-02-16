import mongoose, { model, models, Schema } from "mongoose";

const NoteSchema = new Schema({
    heading: { type: String, required: true },
    content: { type: String }
})

const Note = models.Note || model('Note', NoteSchema)
export default Note