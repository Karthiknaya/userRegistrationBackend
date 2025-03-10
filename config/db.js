const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction

/**
 * Asynchronous function to connect to the MongoDB database.
 */
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using mongoose
        await mongoose.connect("mongodb://localhost:27017/Users");

        // If successful, log a confirmation message
        console.log('✅ MongoDB Connected...');
    } catch (error) {
        // If there's an error, log the failure reason
        console.error('❌ MongoDB connection failed:', error);

        // Exit the process with failure status (1) to indicate an issue
        process.exit(1);
    }
};

// Export the function to use it in other parts of the application
module.exports = connectDB;
