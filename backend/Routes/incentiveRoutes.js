const express = require('express');
const { getIncentiveHistory } = require('../Controllers/incentiveController');

const router = express.Router();

// Route to fetch incentive history
router.post('/incentive/history', getIncentiveHistory);

module.exports = router;
