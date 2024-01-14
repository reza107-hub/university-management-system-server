import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { departmentValidation } from './department.validation';
import { departmentController } from './department.conroller';


const router = express.Router();


router.post('/create-department', validateRequest(departmentValidation.departmentValidationSchema),departmentController.createProgram)


export const DepartmentRoute = router;