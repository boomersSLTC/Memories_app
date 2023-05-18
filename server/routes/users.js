import express from 'express';
import { signin, signup } from '../controllers/user.js'; //parenthesis because default is not used


const router = express.Router();
router.post('/signin',signin);
router.post('/signup',signup);

export default router;