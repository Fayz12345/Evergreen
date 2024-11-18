const express = require('express');
const multer = require('multer');
const { uploadBatch , getBatches, downloadBatch, getBatchesByAddedBy, getBatchesByCustomer} = require('../Controllers/batchController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

router.post('/batch', upload.single('file'), uploadBatch);

router.get('/batches', getBatches); // New route to get batch data
router.get('/batches/:addedBy', getBatchesByAddedBy); // New route to get batch data
router.get('/batches/customer/:customerId', getBatchesByCustomer); // New route to get batch data
router.get('/download-batch/:batchId', downloadBatch); // Add this line
module.exports = router;
