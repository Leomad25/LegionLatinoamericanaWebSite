const { Router } = require('express');
const router = Router();

const { isLoggedIn, isActivated } = require('../lib/auth');
const {
    getPanel,
    getCbi
} = require('../controllers/panel.controller');

// GET routes
router.get('/', isLoggedIn, isActivated, getPanel);
router.get('/cbi', isLoggedIn, isActivated, getCbi);

// POST routes

module.exports = router;