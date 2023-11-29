import express from "express";
import { createComment } from "../controller/commentController.js";
import getToken from "../getToken.js";

const router = express.Router();

router.post("/:id", getToken, createComment);

export default router;
