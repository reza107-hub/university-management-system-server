import { Router } from "express";
import { userRouter } from "../modules/User/user.route";
import { usersAdditionalInformationRoute } from "../modules/usersAdditionalInformation/usersAdditionalInformation.route";
import { adminRouter } from "../modules/Admin/admin.route";
import { studentRouter } from "../modules/Student/student.route";
import { AdmissionRequestRoute } from "../modules/AdmissionRequest/adminRequest.route";


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
      path: '/students',
      route: studentRouter,
    },
    {
      path: '/admission-request',
      route: AdmissionRequestRoute,
    },
  ];

  moduleRoutes.forEach((route) => router.use(route.path, route.route));



export default router;