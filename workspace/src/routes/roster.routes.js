const { Router } = require('express');
const router = Router();

const { getRouter } = require('../controllers/roster.controller');

// GET routes
router.get('/', getRouter);

module.exports = router;