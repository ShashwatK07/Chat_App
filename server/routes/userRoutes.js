import express from "express";
import {
  update,
  del,
  get,
  getAllUsers,
  getUserFriends,
  addRemoveFriend,
  getCurrentUser,
  save,
  follow,
  like,
} from "../controller/userController.js";
import getToken from "../getToken.js";

const router = express.Router();

router.put("/:id", getToken, update);

router.delete("/:id", getToken, del);

router.get("/find/:id", get);

router.get("/currentUser", getToken, getCurrentUser);

router.get("/users", getAllUsers);

router.get("/:id/friends", getUserFriends);

router.patch("/:id/:friendId", addRemoveFriend);

//Save a Post
router.put("/save/:id", getToken, save);

//Follow
router.put("/follow/:id", getToken, follow);

//Like
router.put("/like/:id", getToken, like);

export default router;
