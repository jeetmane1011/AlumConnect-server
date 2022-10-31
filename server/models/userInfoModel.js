const mongoose = require("mongoose");

const detailSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String, trim: true },
    worksAs: { type: String },
    worksAt: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    github: { type: String },
    gender: { type: String },
  }    
);

const userDetail = mongoose.model("Detail", detailSchema);
module.exports = userDetail;
