const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const auth = require('../middleware/auth');

// Create a report
router.post('/', auth, async (req, res) => {
  try {
    const { location, description, image } = req.body;

    const newReport = new Report({
      location,
      description,
      image,
      reporter: req.user.id
    });

    const report = await newReport.save();
    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().populate('reporter', 'name').populate('volunteers', 'name');
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Volunteer for a report
router.put('/:id/volunteer', auth, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ msg: 'Report not found' });
    }

    // Check if already volunteered
    if (report.volunteers.some(volunteer => volunteer.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Already volunteered for this report' });
    }

    report.volunteers.unshift(req.user.id);
    
    // Update status if first volunteer
    if (report.volunteers.length === 1 && report.status === 'Pending') {
      report.status = 'In Progress';
    }

    await report.save();
    res.json(report.volunteers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;