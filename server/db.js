const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Only log the hostname, not the full connection string
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
  } catch (error) {
    // Mask potential sensitive info in error messages
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
