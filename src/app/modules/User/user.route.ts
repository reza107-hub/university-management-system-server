import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:email', userController.getPresentUser);
router.post('/', userController.createUser);
router.post('/contact-us',userController.sendContactEmail)

export const userRouter = router;
