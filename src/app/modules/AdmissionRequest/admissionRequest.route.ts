import express from 'express';
import { AdmissionRequestController } from './admissionRequest.controller';

const router = express.Router();

router.get('/', AdmissionRequestController.getAllAdmissionRequest);
router.get('/:id', AdmissionRequestController.getSingleAdmissionRequest);
router.post('/', AdmissionRequestController.postAdmissionRequest);

export const AdmissionRequestRoute = router;
