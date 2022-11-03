const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      public_id: {
        type: String, required: false
      },
      url:{
        type: String, required: false, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      },
      // required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAlumni: {
      type: Boolean,
      required: true,
      default: false,
    },
    description: { type: "String", trim: true },
    worksAs: { type: "String" },
    worksAt: { type: "String" },
    facebook: { type: "String" },
    instagram: { type: "String" },
    linkedin: { type: "String" },
    github: { type: "String" },
    gender: { type: "String" },
    age: { type: "Number" },
    country: { type: "String", default: "India"},
    city: {type : "String" ,default: "Mumbai"}
  },
  { timestaps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
