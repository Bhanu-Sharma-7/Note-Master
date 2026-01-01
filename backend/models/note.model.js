import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    // Ye line sabse zaroori hai. Ye batati hai ki ye note kis user ka hai.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Ye 'User' model ki ID ko refer kar raha hai
    },
    title: {
      type: String,
      required: [true, "Title zaroori hai"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content zaroori hai"],
    },
    // Aap category bhi add kar sakte ho (Personal, Work, etc.)
    category: {
      type: String,
      default: "General",
    }
  },
  { 
    timestamps: true // Isse 'createdAt' aur 'updatedAt' apne aap mil jayenge
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;