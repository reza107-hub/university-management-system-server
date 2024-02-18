import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { BatchValidation } from './batch.validation';
import { BatchControllers } from './batch.controller';

const router = express.Router();

router.post(
  '/create-batch',
  validateRequest(BatchValidation.batchValidationSchema),
  BatchControllers.createBatch,
);
router.patch(
  '/update-batch/:id',
  validateRequest(BatchValidation.updateBatchValidationSchema),
  BatchControllers.updateBatch,
);
router.get('/get-all-batch', BatchControllers.getAllBatch);

export const batchRoute = router;
