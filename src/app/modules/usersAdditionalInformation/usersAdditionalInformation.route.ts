import express from 'express';
import { UserAdditionalInformationController } from './usersAdditionalInformation.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userAdditionalInformationValidation } from './usersAdditionalInformation.validation';
const router = express.Router();

router.get(
  '/',
  UserAdditionalInformationController.getIsUserHasAdditionalInformation,
);
router.post(
  '/create',
  validateRequest(userAdditionalInformationValidation.UserAdditionalInformationValidationSchema),
  UserAdditionalInformationController.postUserAdditionalInformation,
);
export const usersAdditionalInformationRoute = router;
