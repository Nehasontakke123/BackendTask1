import axios from 'axios';

export const fetchAndConvert = async () => {
  try {
    const response = await axios.get('https://jobicy.com/api/v2/remote-jobs');
    return response.data.jobs; // ✅ JSON list of jobs
  } catch (err) {
    console.error('❌ Error fetching jobs:', err.message);
    throw new Error('Failed to fetch jobs from Jobicy API');
  }
};
