import Message from "../models/message.js";
import Conversation from "../models/conversation.js";
import grid from "gridfs-stream";
import mongoose from "mongoose";

export const newMessage = async (req, res) => {
  try {
    const newMess = new Message(req.body);
    await newMess.save();
    await Conversation.findByIdAndUpdate(req.body.conversationId, {
      message: req.body.text,
    });
    return res.status(200).json("Message sent successfully");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const url = "http://localhost:5000";

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadImage = (req, response) => {
  if (!req.file) return response.status(404).json("File not found");

  const imageUrl = `${url}/file/${req.file.filename}`;

  response.status(200).json(imageUrl);
};

export const getImage = async (req, response) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    // const readStream = gfs.createReadStream(file.filename);
    // readStream.pipe(response);
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};
