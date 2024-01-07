
import express from 'express';
import { AdminController } from './admin.controller';
const router = express.Router();


router.get('/admin-list',AdminController.getAdminList)

export const adminRouter = router