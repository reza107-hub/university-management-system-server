import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseControllers } from './OfferedCourse.controller';
import { OfferedCourseValidations } from './OfferedCourse.validation';

const router = express.Router();

router.get('/', OfferedCourseControllers.getAllOfferedCourses);

router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses);
router.get('/facultyRoutine/:facultyId', OfferedCourseControllers.getCoursesForSingleFaculty);

router.post(
  '/',
  // validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete('/:id', OfferedCourseControllers.deleteOfferedCourseFromDB);

export const offeredCourseRoutes = router;
