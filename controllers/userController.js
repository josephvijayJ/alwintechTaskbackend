import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
// @desc Auth user and get token
// @route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Email or Password not Matched');
  }
});

// @desc Register a new User
// @route POST /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(401);
    throw new Error('user Already Exists');
  }
  try {
    console.log('entered try');
    const user = await new User({
      name: name,
      email: email,
      password: password,
    });

    await user.save();
    console.log('user created');
    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log('error');
    res.status(501);
    throw new Error('User not created');
  }
});

export { authUser, registerUser };
