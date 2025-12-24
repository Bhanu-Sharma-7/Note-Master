import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        default: 'Untitled Project'
    },
    content: {
        type: String, 
        default: ''
    }
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

export default Project;