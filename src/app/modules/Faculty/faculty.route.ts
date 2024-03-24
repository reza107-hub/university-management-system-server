import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './faculty.validation';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.get('/faculty-list', FacultyController.getFacultyList);
router.get('/:email', FacultyController.getUserIsFaculty);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.facultyValidationSchema),
  FacultyController.createFaculty,
);

router.patch('/delete-faculty', FacultyController.deleteFaculty);

export const FacultyRouter = router;
