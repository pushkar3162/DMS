const mongoose = require("mongoose");

const UserRoleSchema = new mongoose.Schema({
    user_email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["Admin", "User"], required: true },
    sub_role: { type: String, required: true }
}, { timestamps: true });

const UserRole = mongoose.model("UserRole", UserRoleSchema);
module.exports = UserRole;
