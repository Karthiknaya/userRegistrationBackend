require("dotenv").config(); // ✅ Load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes"); // ✅ Import user routes

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Define server port (default: 5000)
const MONGO_URI= process.env.MONGO_URI;

// ✅ Step 1: Middleware Setup
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS for cross-origin requests

// ✅ Step 2: Define API Routes
app.use("/api/users", userRoutes); // All user-related routes use the "/api/users" prefix

// ✅ Step 3: MongoDB Connection

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,  // Ensures MongoDB connection follows best practices
    useUnifiedTopology: true, // Improves connection handling
  })
  .then(() => console.log("✅ MongoDB Connected")) // Success message
  .catch((err) => console.error("❌ MongoDB Connection Error:", err)); // Error handling

// ✅ Step 4: Start the Express Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
