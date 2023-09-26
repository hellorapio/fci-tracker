import express from "express";
import authController from "./auth.controller";
import authorization from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/logout", authorization, authController.logout);

export default router;
