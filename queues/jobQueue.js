// import Bull from 'bull';
// import dotenv from 'dotenv';
// dotenv.config();

// const jobQueue = new Bull('job-import-queue', {
//   redis: {
//     host: process.env.REDIS_HOST,
//     port: Number(process.env.REDIS_PORT),
//     password: process.env.REDIS_PASSWORD,
//     tls: {}, // ✅ Required for Redis Cloud SSL
//     maxRetriesPerRequest: null, // ✅ Disable retry limit error
//   },
// });

// export default jobQueue;



import Bull from 'bull';
import dotenv from 'dotenv';
dotenv.config();

const jobQueue = new Bull('job-import-queue', process.env.REDIS_URL, {
  redis: {
    tls: {}, // ✅ Needed for SSL connection (Redis Cloud)
    maxRetriesPerRequest: null
  }
});

export default jobQueue;
