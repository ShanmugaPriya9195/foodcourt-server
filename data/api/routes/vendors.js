const express = require('express');
const router = express.Router();
const vendorController = require('../data/api/controllers/vendors');


router.post('/register', vendorController.create);
router.post('/authenticate', vendorController.authenticate);

module.exports = router;