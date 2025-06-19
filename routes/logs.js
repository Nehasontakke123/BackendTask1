// routes/logs.js
import express from 'express';
import ImportLog from '../models/ImportLog.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const logs = await ImportLog.find().sort({ timestamp: -1 }).limit(20); // latest 20 logs
    res.json(logs);
  } catch (error) {
    console.error('❌ Error fetching logs:', error.message);
    res.status(500).json({ message: 'Error fetching logs', error: error.message });
  }
});

export default router;
