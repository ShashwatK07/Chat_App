import express from "express";
import {
  update,
  del,
  get,
  getAllUsers,
  getUserFriends,
  addRemoveFriend,
  getCurrentUser,
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

export default router;
