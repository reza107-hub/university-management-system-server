import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidation } from './admin.validation';
const router = express.Router();

router.get('/admin-list', AdminController.getAdminList);

router.post(
  '/createAdmin',
  validateRequest(adminValidation.adminValidationSchema),
  AdminController.createAdmin,
);
router.post('/send-email',AdminController.sendEmailToFaculty)
router.get('/:email', AdminController.getUserIsAdmin);

router.patch('/delete', AdminController.deleteAdmin);

export const adminRouter = router;
