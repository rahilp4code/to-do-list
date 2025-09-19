import express from "express";
import * as authController from "../controller/authController.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/", authController.signUp);

export default router;
