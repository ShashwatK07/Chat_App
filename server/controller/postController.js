import Posts from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comments.js";
import genError from "../error.js";

export const createPost = async (req, res, next) => {
  const newPost = new Posts({
    userId: req.user.id,
    ...req.body,
  });
  try {
    const savedPost = await newPost.save();
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.posts.push(savedPost._id);
    await user.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.userId === req.user.id) {
      await Posts.findByIdAndDelete(req.params.id);
      res.status(200).json("Video Deleted Successfully");
    } else {
      res.status(403).json("You can only delete your own video");
    }
  } catch (error) {
    next(error);
  }
};

// TO BE DONE
export const flagPost = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const randomPost = async (req, res, next) => {
  try {
    const posts = await Posts.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const followingPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const followingUsers = user.following;
    // console.log(followingUsers)
    const posts = await Posts.aggregate([
      {
        $match: {
          userId: { $in: followingUsers },
        },
      },
      {
        $sample: { size: 20 },
      },
    ]);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const showComment = async (req, res, next) => {
  try {
    const posts = await Posts.findById(req.params.id);
    const commentIds = posts.commentedBy;
    let allComments = [];

    for (const commentId in commentIds) {
      const com = Comment.findById(commentId);
      if (com) {
        allComments.push(com);
      }
    }
    res.status(200).json(allComments);
  } catch (error) {
    next(error);
  }
};
