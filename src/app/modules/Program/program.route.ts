
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProgramValidation } from "./program.validation";
import { programControllers } from "./program.controller";

const router = express.Router();

router.post('/create-program',validateRequest(ProgramValidation.programValidationSchema),programControllers.createProgram)
router.get('/get-all-program',programControllers.getAllProgram)


export const programRoute = router;