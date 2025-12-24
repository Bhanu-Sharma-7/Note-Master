import Project from "../models/Project.js";

export const createProject = async (req, res) => {
    const { title } = req.body;
    
    const project = new Project({
        user: req.user._id,
        title: title || 'Untitled Project',
        content: ''
    });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
}

export const getProjects = async (req, res) => {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
}

export const updateProject = async (req, res) => {
    const { title, content } = req.body;
    const project = await Project.findById(req.params.id);

    if (project) {
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        project.title = title || project.title;
        project.content = content || project.content;
        
        const updatedProject = await project.save();
        res.json(updatedProject);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
}