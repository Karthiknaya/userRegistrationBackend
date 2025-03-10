const mongoose = require("mongoose");

// ✅ Step 1: Define the User Schema
const userSchema = new mongoose.Schema({
  
  // Step 1.1: User's Name (Required, at least 2 characters)
  name: { 
    type: String, 
    required: true, 
    minlength: 2 
  },

  // Step 1.2: User's Age (Required, must be between 0 and 120)
  age: { 
    type: Number, 
    required: true, 
    min: 0, 
    max: 120 
  },

  // Step 1.3: Date of Birth (Required, stored as a Date object)
  dob: { 
    type: Date, 
    required: true 
  },

  // Step 1.4: Password (Required, at least 10 characters, must include a digit)
  password: { 
    type: String, 
    required: true, 
    minlength: 10, 
    match: /\d/  // Ensures at least one digit in the password
  },

  // Step 1.5: Gender (Required, must be Male, Female, or Other)
  gender: { 
    type: String, 
    required: true, 
    enum: ["Male", "Female", "Other"] 
  },

  // Step 1.6: About Section (Optional, max length 5000 characters)
  about: { 
    type: String, 
    maxlength: 5000 
  },
});

// ✅ Step 2: Export the User Model for use in controllers
module.exports = mongoose.model("User", userSchema);
