import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { departmentValidation } from './department.validation';
import { departmentController } from './department.conroller';

const router = express.Router();

router.post(
  '/',
  validateRequest(departmentValidation.departmentValidationSchema),
  departmentController.createProgram,
);

router.get('/', departmentController.getDepartment);
router.delete('/delete-dept/:id', departmentController.deleteDepartment);

export const DepartmentRoute = router;
