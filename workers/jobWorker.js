// workers/jobWorker.js
import jobQueue from '../queues/jobQueue.js';
import Job from '../models/Job.js';
import ImportLog from '../models/ImportLog.js';

jobQueue.process(async (job, done) => {
  const { data, fileName } = job.data;

  let total = data.length;
  let newCount = 0;
  let updateCount = 0;
  let failed = 0;
  let failures = [];

  for (const jobItem of data) {
    try {
      const existing = await Job.findOne({ jobId: jobItem.guid });

      if (existing) {
        await Job.updateOne({ jobId: jobItem.guid }, jobItem);
        updateCount++;
      } else {
        await Job.create({ jobId: jobItem.guid, ...jobItem });
        newCount++;
      }
    } catch (err) {
      failed++;
      failures.push({ jobId: jobItem.guid, reason: err.message });
    }
  }

  await ImportLog.create({
    fileName,
    totalFetched: total,
    totalImported: newCount + updateCount,
    newJobs: newCount,
    updatedJobs: updateCount,
    failedJobs: failed,
    failures,
  });

  done();
});
