import express from "express";
import {
  createPost,
  deletePost,
  flagPost,
  randomPost,
  followingPost,
  showComment,
} from "../controller/postController.js";
import getToken from "../getToken.js";

const router = express.Router();

// ** Create a POST
router.post("/", getToken, createPost);

//** Delete a POST */
router.delete("/:id", getToken, deletePost);

//!! Flag a POST */
router.put("/flag/:id", getToken, flagPost);

//** Random POST */
router.get("/rand", randomPost);

//** Following POST */
router.get("/following", getToken, followingPost);

//** Show Comment */
router.get("/comments/:id", getToken, showComment);

export default router;
