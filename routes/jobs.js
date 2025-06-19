import express from 'express';
import { fetchAndConvert } from '../services/fetchJobs.js';
import Job from '../models/Job.js';
import ImportLog from '../models/ImportLog.js';

const router = express.Router();

// ✅ Only JSON API now
const urls = [
  { url: '', name: 'jobicy-json' },
];

router.get('/import', async (req, res) => {
  try {
    for (const feed of urls) {
      const jobs = await fetchAndConvert(feed.url); // URL not needed for JSON

      let total = jobs.length;
      let newCount = 0;
      let updateCount = 0;
      let failed = 0;
      let failures = [];

      for (const jobItem of jobs) {
        try {
          const jobId = jobItem.id || jobItem.url; // use a unique ID
          const existing = await Job.findOne({ jobId });

          if (existing) {
            await Job.updateOne({ jobId }, jobItem);
            updateCount++;
          } else {
            await Job.create({ jobId, ...jobItem });
            newCount++;
          }
        } catch (err) {
          failed++;
          const jobId = jobItem.id || jobItem.url;
          failures.push({ jobId, reason: err.message });
        }
      }

      // await ImportLog.create({
      //   fileName: feed.name,
      //   totalFetched: total,
      //   totalImported: newCount + updateCount,
      //   newJobs: newCount,
      //   updatedJobs: updateCount,
      //   failedJobs: failed,
      //   failures,
      // });

      await ImportLog.create({
  fileName: feed.name,
  totalFetched: total,
  totalImported: newCount + updateCount,
  newJobs: newCount,
  updatedJobs: updateCount,
  failedJobs: failures, // ✅ Use array of objects
});

    }

    res.status(200).json({ message: '✅ Jobs imported successfully' });
  } catch (error) {
    console.error('❌ Error while importing jobs:', error.message);
    res.status(500).json({ message: 'Error importing jobs', error: error.message });
  }
});

export default router;
