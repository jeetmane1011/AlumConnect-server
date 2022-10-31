const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    description: { type: String, trim: true },
  },
  {timestamps: true}    
);

const Post = mongoose.model("Detail", PostSchema);
module.exports = Post;
