import express from "express";
import {
  newConversation,
  getConversation,
} from "../controller/conversationController.js";

const router = express.Router();

router.post("/conversation/add", newConversation);
router.post("/conversation/get", getConversation);

export default router;
