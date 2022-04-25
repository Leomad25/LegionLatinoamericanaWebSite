const { Router } = require('express');
const router = Router();

const { isLoggedIn, isActivated } = require('../lib/auth');
const { getProfile, postProfile } = require('../controllers/profile.controller');

// GET routes
router.get('/', isLoggedIn, isActivated, getProfile);

// POST routes
router.post('/email', isLoggedIn, isActivated, postProfile.email);
router.post('/password', isLoggedIn, isActivated, postProfile.password);
router.post('/lang', isLoggedIn, isActivated, postProfile.lang);
router.post('/role', isLoggedIn, isActivated, postProfile.role);

module.exports = router;