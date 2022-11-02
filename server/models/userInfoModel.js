const mongoose = require("mongoose");

const detailSchema = mongoose.Schema(
  {
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
    city: {type : "String" }
  }    
);

const userDetail = mongoose.model("Detail", detailSchema);
module.exports = userDetail;
