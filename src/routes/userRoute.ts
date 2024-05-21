import { Router } from "express";
import { addUser } from "../controllers/userController";

const router = Router();

router.post("/user/create", addUser);

export default router;
