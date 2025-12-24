import express from 'express';
import { createProject, getProjects, updateProject } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createProject).get(protect, getProjects);
router.route('/:id').put(protect, updateProject);

export default router;