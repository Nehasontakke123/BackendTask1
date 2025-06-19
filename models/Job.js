import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobId: { type: String, unique: true },
  title: String,
  company: String,
  location: String,
  description: String,
  url: String,
  category: String,
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
