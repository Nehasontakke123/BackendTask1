// import mongoose from 'mongoose';

// const importLogSchema = new mongoose.Schema({
//   fileName: String,
//   timestamp: { type: Date, default: Date.now },
//   totalFetched: Number,
//   totalImported: Number,
//   newJobs: Number,
//   updatedJobs: Number,
//   failedJobs: [
//     {
//       reason: String,
//       jobId: String
//     }
//   ]
// });

// export default mongoose.model('ImportLog', importLogSchema);



import mongoose from 'mongoose';

const failedJobSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
    trim: true
  },
  jobId: {
    type: String,
    trim: true
  }
}, { _id: false }); // Prevents extra _id for each failedJob

const importLogSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  totalFetched: {
    type: Number,
    required: true
  },
  totalImported: {
    type: Number,
    required: true
  },
  newJobs: {
    type: Number,
    required: true
  },
  updatedJobs: {
    type: Number,
    required: true
  },
  failedJobs: {
    type: [failedJobSchema],
    default: [] // ✅ Even if no failures, default is safe
  }
});

// ✅ Prevent "Cannot overwrite model" error in dev
const ImportLog = mongoose.models.ImportLog || mongoose.model('ImportLog', importLogSchema);

export default ImportLog;
