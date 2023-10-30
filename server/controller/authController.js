import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const check = await User.findOne({ email: email });
    if (!check) {
      const hash = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hash });
      await user.save();
      res.status(200).send("User added successfully");
    } else {
      res.status(403).send("User Already exists");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) next(genErr(404, "User Not Found"));
    if (!bcrypt.compareSync(req.body.password, user.password))
      next(genErr(401, "Invalid Password"));
    const token = jwt.sign({ id: user._id }, "OnePiece");

    const { password, ...withoutPassword } = user._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(withoutPassword);
  } catch (error) {
    next(error);
  }
};
