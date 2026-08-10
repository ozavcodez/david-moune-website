import mongoose from 'mongoose';

export const connectDB = async (): Promise<boolean> => {
  try {
    if (mongoose.connection.readyState === 1) {
      return true;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/v0-foundation', {
      // Remove deprecated options
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn('MongoDB unavailable, continuing in test mode without database persistence.');
    return false;
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Close connection when process ends
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});