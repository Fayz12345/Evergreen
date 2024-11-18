// backend/routes/memoryRoutes.js
const express = require('express');
const { createMemory, getAllMemories , deleteMemory, updateMemory} = require('../Controllers/memoryController');

const router = express.Router();

// Route to create a new memory option
router.post('/memories', createMemory);
router.delete('/memories/:id', deleteMemory); // Ensure the :id param is defined correctly
router.put('/memories/:id', updateMemory); // Add this route for updating memory

// Route to get all memory options
router.get('/memories', getAllMemories);

module.exports = router;


