import express from "express";
const router = express.Router();

router.route("me").patch().get().delete();

export default router;
