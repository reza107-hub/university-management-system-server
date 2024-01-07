
import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidation } from './student.validation';

const router = express.Router();


router.get('/',studentController.getAllStudent)

router.post('/',validateRequest(studentValidation.studentValidationSchema),studentController.creatingStudentWIthId)
export const studentRouter = router;