

import express from 'express';
import { AdmissionRequestController } from './adminRequest.controller';


const router = express.Router();


router.get('/',AdmissionRequestController.getAllAdmissionRequest)
router.post('/',AdmissionRequestController.postAdmissionRequest)

export const AdmissionRequestRoute = router;