const User = require("../models/User.js"); // Import User model for database operations
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing

// ✅ Get All Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// ✅ Create User
exports.createUser = async (req, res) => {
    try {
        const { name, age, dob, password, gender, about } = req.body;

        // Validate required fields
        if (!name || !age || !dob || !password || !gender) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate password strength
        if (password.length < 10 || !/\d/.test(password)) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 10 characters and include a digit" 
            });
        }

        // Hash Password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({ name, age, dob, password: hashedPassword, gender, about });

        await newUser.save(); // Save the user in the database

        res.status(201).json({ success: true, message: "User created successfully", data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating user", error: error.message });
    }
};

// ✅ Update User
exports.updateUser = async (req, res) => {
    try {
        // Find user by ID and update the provided fields
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User updated successfully", data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user", error: error.message });
    }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
    try {
        // Find user by ID and delete
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting user", error: error.message });
    }
};
