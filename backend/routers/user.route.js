import express from 'express'
import { Signup } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/signup', Signup)

export default router