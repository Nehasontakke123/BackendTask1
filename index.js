import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { connectRedis } from './config/redis.js'; // ✅ Redis connect function
import './workers/jobWorker.js';
import jobsRoute from './routes/jobs.js';
import logsRoute from './routes/logs.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    // ✅ Connect to MongoDB
    connectDB();

    // ✅ Connect to Redis
    await connectRedis();
    // await client.quit(); 

    // ✅ Routes
    app.use('/api/jobs', jobsRoute);
    app.use('/api/logs', logsRoute);

    // ✅ Default route
    app.get('/', (req, res) => res.send('Job Importer API Running'));

    // ✅ Start server
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
  }
}

startServer();
