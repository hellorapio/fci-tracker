import express from "express";
import userController from "./user.controller";
import authorization from "../../middlewares/auth.middleware";

const router = express.Router();

router.use(authorization);

router
  .route("/me")
  .delete(userController.deleteMe)
  .patch(userController.updateMe)
  .get(userController.getMe);

router.route("/:username").get(userController.getUser);

export default router;
