import User from "../models/user.js";
import genError from "../error.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(genError(error));
    }
  } else {
    next(genError(403, "User can Update only its own account"));
  }
};

export const del = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedUser);
    } catch (error) {
      next(genError(error));
    }
  } else {
    next(genError(403, "User can Delete only its own account"));
  }
};

export const get = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      next(genError(404, "User not found"));
    }
  } catch (error) {
    next(genError(error));
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).json(users);
    } else {
      next(genError(404, "User not found"));
    }
  } catch (error) {
    next(genError(error));
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.friends || user.friends.length === 0) {
      return res.status(200).json([]);
    }

    const friends = await Promise.all(
      user.friends.map(async (friendId) => {
        const friend = await User.findById(friendId);
        return { _id: friend._id, name: friend.name };
      })
    );

    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((friendId) => friendId !== friendId);
      friend.friends = friend.friends.filter((userId) => userId !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );
    const formattedFriends = friends.map(({ _id, name }) => ({
      _id,
      name,
    }));

    res.status(200).json({ formattedFriends });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const save = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    await User.findByIdAndUpdate(userId, {
      $push: { savedPost: postId },
    });
  } catch (error) {
    next(genError(error));
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;
  const postId = req.params.id;
  try {
    const post = await Post.findByIdAndUpdate(postId, {
      $push: { likedBy: id },
    });
    if (!post) {
      res.status(403).json("Post Not Found");
    } else {
      res.status(200).json("Like Added");
    }
  } catch (error) {
    next(error);
  }
};

export const follow = async (req, res, next) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      next(genError(404, "User Not Found"));
    }
    await User.findByIdAndUpdate(req.user.id, {
      $push: { following: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $push: { followers: req.user.id },
    });
    res.status(200).json("Now following");
  } catch (error) {
    next(error);
  }
};
