// import { createClient } from 'redis';

// export const redisClient = createClient({
//   url: process.env.REDIS_URL || 'redis://localhost:6379',
// });

// redisClient.on('error', err => console.error('Redis Error:', err));
// await redisClient.connect();




import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected!');
});

redisClient.on('error', err => {
  console.error('❌ Redis Error:', err.message);
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('❌ Redis connect failed:', err.message);
  }
};
