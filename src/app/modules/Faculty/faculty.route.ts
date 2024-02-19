import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './faculty.validation';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.get('/faculty-list', FacultyController.getFacultyList);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.facultyValidationSchema),
  FacultyController.createFaculty,
);

// router.get('/:email', AdminController.getUserIsAdmin);

router.patch('/delete-faculty', FacultyController.deleteFaculty);

export const FacultyRouter = router;
