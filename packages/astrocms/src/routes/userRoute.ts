import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.post("/user/create", userController.addUser);
router.post("/user/login", userController.loginUser);

export default router;
