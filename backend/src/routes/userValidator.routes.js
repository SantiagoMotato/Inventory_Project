import { Router } from 'express';
import { validationUserData } from '../controllers/userValidator.controller.js';

const router = Router();

router.post("/", validationUserData);

export default router;