const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    } else {
      await mongoose.connect(process.env.MONGO_URL);
      console.log('✅ Successfully connected to the database.');
    }
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
};

export default connectToDB;
