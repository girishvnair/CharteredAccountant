const express = require('express');
const router = express.Router();
const Engagement = require('../models/engagement');

// GET: Fetch all ongoing engagements
router.get('/engagements', async (req, res) => {
  try {
    const engagements = await Engagement.find();
    res.status(200).json({ engagements });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching engagements', error });
  }
});

// PUT: Update engagement status
router.put('/update-engagement/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const engagement = await Engagement.findById(id);
    if (!engagement) {
      return res.status(404).json({ message: 'Engagement not found' });
    }

    engagement.status = status;
    await engagement.save();

    res.status(200).json({ message: 'Engagement status updated', engagement });
  } catch (error) {
    res.status(500).json({ message: 'Error updating engagement', error });
  }
});

module.exports = router;
