const express = require('express');
const router = express.Router();
const deviceController = require('../Controllers/deviceController');

router.get('/devices', deviceController.getAllDevices);
router.post('/devices', deviceController.addDevice);
router.put('/devices/:id', deviceController.updateDevice);
router.delete('/devices/:id', deviceController.deleteDevice);
router.get('/devices/search', deviceController.searchDevices);
module.exports = router;
