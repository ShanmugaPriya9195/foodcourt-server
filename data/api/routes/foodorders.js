const express = require('express');
const router = express.Router();
const foodorderController = require('../data/api/controllers/foodorders');

router.get('/', foodorderController.getAll);
router.post('/', foodorderController.create);
router.get('/:foodorderId', foodorderController.getById);
router.put('/:foodorderId', foodorderController.updateById);
router.delete('/:foodorderId', foodorderController.deleteById);

module.exports = router;