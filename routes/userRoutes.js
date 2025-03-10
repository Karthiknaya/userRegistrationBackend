const express = require("express");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router(); // Create an instance of Express Router

// ✅ Define API routes for user operations

// 🔹 GET: Fetch all users
router.get("/", getUsers);

// 🔹 POST: Register a new user
router.post("/register", createUser);

// 🔹 PUT: Update user details by ID
router.put("/:id", updateUser);

// 🔹 DELETE: Remove a user by ID
router.delete("/:id", deleteUser);

module.exports = router; // Export the router to be used in the main app
