import { Router } from "express";
import { userRouter } from "../modules/User/user.route";
import { usersAdditionalInformationRoute } from "../modules/usersAdditionalInformation/usersAdditionalInformation.route";
import { adminRouter } from "../modules/Admin/admin.route";
import { studentRouter } from "../modules/Student/student.route";
import { AdmissionRequestRoute } from "../modules/AdmissionRequest/adminRequest.route";
import { programRoute } from "../modules/Program/program.route";
import { DepartmentRoute } from "../modules/Department/department.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { batchRoute } from "../modules/batch/batch.route";
import { FacultyRouter } from "../modules/Faculty/faculty.route";


const router = Router();

const moduleRoutes = [
    {
      path: '/users',
      route: userRouter,
    },
    {
      path: '/userAdditionalInfo',
      route: usersAdditionalInformationRoute,
    },
    {
      path: '/admin',
      route: adminRouter,
    },
    {
      path: '/faculty',
      route: FacultyRouter,
    },
    {
      path: '/students',
      route: studentRouter,
    },
    {
      path: '/admission-request',
      route: AdmissionRequestRoute,
    },
    {
      path: '/program',
      route: programRoute,
    },
    {
      path: '/department',
      route: DepartmentRoute,
    },
    {
      path: '/semester-registrations',
      route: semesterRegistrationRoutes,
    },
    {
      path: '/academic-semesters',
      route: AcademicSemesterRoutes,
    },
    {
      path: '/batch',
      route: batchRoute,
    },
  ];

  moduleRoutes.forEach((route) => router.use(route.path, route.route));



export default router;