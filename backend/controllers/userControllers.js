import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../config/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const userExists = await User.findOne({
    email,
  });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      message: "User created successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create new user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const user = await User.findOne({
    email,
  });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.key && {
    $or: [
      { name: { $regex: req.query.key, $options: "i" } },
      { email: { $regex: req.query.key, $options: "i" } },
    ],
  };
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.status(200).send(users);
});

export { registerUser, authUser, allUsers };
