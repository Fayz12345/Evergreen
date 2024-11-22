// backend/routes/tradeRoutes.js
const express = require('express');

const multer = require('multer');
const { createTrade, getAllTrades, updateTradeStatus, getTradeById, getTradeByCustomerId, getTradeCounts, batchUploadTrades , getTradeCountsByManufacturer} = require('../Controllers/tradeController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Specify your desired upload directory


// Route to create a new trade entry
router.post('/trade', createTrade);
router.get('/trade/list', getAllTrades);
router.get('/trade/listByUser/:addedBy', getTradeById);
router.post('/trade/listByCustomer', getTradeByCustomerId);
router.get('/trade/listByCustomer/:addedBy', getTradeByCustomerId);
// New route to get trade by ID
router.get('/trade/:id', getTradeById);
router.put('/trade/status/:id', updateTradeStatus);
router.get('/trade-counts', getTradeCounts);
router.get('/tradeCountByManufacturer', getTradeCountsByManufacturer);
router.post('/trade/batch-upload', upload.single('file'), batchUploadTrades); // Add this line

module.exports = router;
