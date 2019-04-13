const express = require('express');
const router = express.Router();
const vendorController = require('../data/api/controllers/vendors');

router.get('/', vendorController.getAll);
router.post('/', vendorController.create);
router.get('/:vendorId', vendorController.getById);
router.put('/:vendorId', vendorController.updateById);
router.delete('/:vendorId', vendorController.deleteById);

module.exports = router;