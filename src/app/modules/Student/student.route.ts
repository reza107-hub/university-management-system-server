import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidation } from './student.validation';

const router = express.Router();

router.get('/', studentController.getAllStudent);

router.post(
  '/',
  validateRequest(studentValidation.studentValidationSchema),
  studentController.creatingStudentWIthId,
);
router.post('/deny-student', studentController.denyStudent);

//-------------------------------------------

router.post('/add-student',studentController.creatingStudentWIthIdManually)

export const studentRouter = router;
