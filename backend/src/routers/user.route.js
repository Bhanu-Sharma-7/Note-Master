import express from 'express'
import { Signup } from '../controllers/user.controller.js';
import { Login } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', Signup)
router.post('/login', Login)

export default router