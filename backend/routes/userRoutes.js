const express = require("express");
const UserRole = require("../models/UserRole");

const router = express.Router();

// ✅ Fetch All Users
router.get("/", async (req, res) => {
    try {
        const users = await UserRole.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Add a User
router.post("/", async (req, res) => {
    const { user_email, role, sub_role } = req.body;

    if (!user_email || !role) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const newUser = new UserRole({ user_email, role, sub_role });
        await newUser.save();
        res.json({ message: "User added successfully", user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Delete a User
router.delete("/", async (req, res) => {
    const { user_email } = req.body;

    if (!user_email) {
        return res.status(400).json({ error: "Missing user email" });
    }

    try {
        const deletedUser = await UserRole.findOneAndDelete({ user_email });
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
