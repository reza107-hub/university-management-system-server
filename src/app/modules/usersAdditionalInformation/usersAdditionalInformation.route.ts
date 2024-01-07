import express from "express";
import { UserAdditionalInformationController } from "./usersAdditionalInformation.controller";
const router = express.Router();


router.get('/',UserAdditionalInformationController.getIsUserHasAdditionalInformation)
router.post('/',UserAdditionalInformationController.postUserAdditionalInformation)
export const usersAdditionalInformationRoute = router