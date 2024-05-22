import { Router } from "express";
import { addUser, loginUser } from "../controllers/userController";

const router = Router();

router.post("/user/create", addUser);
router.post("/user/login", loginUser);

export default router;
