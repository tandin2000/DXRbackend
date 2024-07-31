import express from 'express';
const router = express.Router();

import authController from '../controllers/auth.js';


router.post('/login', authController.Login);
router.post('/Logout', authController.Logout);
router.post('/Register', authController.RegisterUser);

export default router;