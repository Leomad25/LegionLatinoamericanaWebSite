const { Router } = require('express');
const router = Router();

const { getHome } = require('../controllers/home.controller');
const { getConf, getCredits, postConf } = require('../controllers/confAndCredits')

// GET routes
router.get('/', getHome);
router.get('/conf', getConf);
router.get('/credits', getCredits);

// POST routes
router.post('/conf/lang', postConf.lang);

// External routes
router.use('/auth', require('./auth.routes')); // add routes of the authenticated.
router.use('/profile', require('./profile.routes')); // add profile routes.
router.use('/roster', require('./roster.routes')); // add roster routes.
router.use('/panel', require('./panel.routes')); // add panel routes.

module.exports = router;