const express = require('express');
const {
  createModel,
  getAllModels,
  updateModel,
  deleteModel,
  getModelsByManufacturer,
  search1,
  getModelList,
  getModelByID,
  generateSampleCSV1,
} = require('../Controllers/modelController');

const router = express.Router();

router.post('/Models', createModel);
router.get('/Models', getAllModels);
router.put('/Models/:id', updateModel); // Update route
router.delete('/Models/:id', deleteModel); // Delete route
router.get('/Models/:id', getModelByID); // Delete route
router.get('/Models/manufacturer/:manufacturerId', getModelsByManufacturer);
router.get('/search', search1);
router.get('/models/list', getModelList);
router.get('/sample-csv', generateSampleCSV1);
module.exports = router;
