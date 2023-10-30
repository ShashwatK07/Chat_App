import express from "express";
import upload from "../utils/upload.js";
const router = express.Router();
import {
  newMessage,
  getMessages,
  uploadImage,
  getImage,
} from "../controller/messageController.js";

router.post("/message/add", newMessage);
router.get("/messages/get/:id", getMessages);
router.post("/file", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);

export default router;
