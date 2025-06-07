import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `connected to database and server is running on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

const gracefulShutdown = () => {
  console.log('shutting down gracefully');
  mongoose.connection
    .close()
    .then(() => {
      console.log('MongoDB connection closed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error closing MongoDB connection:', error);
      process.exit(1);
    });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
