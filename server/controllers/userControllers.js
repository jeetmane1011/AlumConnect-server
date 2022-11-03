const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const cloudinary= require("../utils/cloudinary");
// const { update } = require("../models/userModel");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.userId });
    res.json(user);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateUser = asyncHandler(async(req, res)=>{
  let updates = req.body;

  if('pic' in updates){
    try{
      if("url" in updates.pic){
        if(updates.pic.url){
          //update from db
          const result = await cloudinary.uploader.upload(updates.pic.url,{folder: "users", width: 300, crop: "scale"});
          updates.pic.public_id = result.public_id;
          updates.pic.url = result.secure_url
        }
      } else if('public_id' in updates.pic){
        //delete image from db
          await cloudinary.uploader.destroy(updates.pic.public_id);
          updates.pic = {
            url :"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
      }
    }catch(err){
      console.log(err);
      // res.status(401);
      throw new Error("Could not update image!!!")
    }
  }

  User.findOneAndUpdate({ _id: req.params.userId }, 
    updates,
    {new: true}).then(user=>{
    res.status(201).
    json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }).catch(err=>{
    res.status(400);
    throw new Error(err.message);
  })

})


//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  let result = undefined;

  if(pic){
    result = await cloudinary.uploader.upload(pic,{folder: "users", width: 300, crop: "scale"});
  }

  const user = await User.create({
    name,
    email,
    password,
    pic:{
      public_id: (result && result.public_id),
      url: (result && result.secure_url)
    }
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { allUsers, registerUser, authUser, getUserById, updateUser};