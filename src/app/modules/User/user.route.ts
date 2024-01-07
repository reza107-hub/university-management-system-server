
import express from "express";
import { userController } from "./user.controller";
const router = express.Router();

router.get("/",userController.getUsers)
router.post("/",userController.createUser)

router.get("/admin/:email",userController.getIsUserAdminOrNot)
router.patch("/admin/:id",userController.makingAdmin)

router.patch('/:id',userController.makeStudent)
router.patch('/remove/admin/:id',userController.removeAdmin)

       

export const userRouter = router;