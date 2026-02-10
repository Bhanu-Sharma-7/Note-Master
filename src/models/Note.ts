import mongoose, { Schema, model, models } from "mongoose";

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    userId: { type: String, required: true }, // Baad mein auth ke saath connect karenge
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Note = models.Note || model("Note", NoteSchema);

export default Note;