import mongoose, { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
  isTrash: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Note = models.Note || model("Note", NoteSchema);

export default Note;