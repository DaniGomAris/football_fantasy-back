const mongoose = require("mongoose");

// User model
const userSchema = new mongoose.Schema({
  _id: String,
  document_type: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  last_name1: { type: String, required: true },
  last_name2: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  phone: { type: String, required: true },
} , { timestamps: true });

module.exports = mongoose.model("User", userSchema);
