const { Router } = require('express');
const router = Router();

const passport = require('passport');
const { isNotLoggedIn, isLoggedIn, isNotActivated } = require('../lib/auth');
const {
    getLogout,
    getLogin,
    getRegister,
    getRules, postRules,
    getRecover, postRecover,
    getActivation, postActivation,
    getChangeEmail, postChangeEmail
} = require('../controllers/auth.controller');

// GET routes
router.get('/logout', isLoggedIn, getLogout)
router.get('/login', isNotLoggedIn, getLogin);
router.get('/register', isNotLoggedIn, getRegister);
router.get('/rules', isNotLoggedIn, getRules);
router.get('/recover', isNotLoggedIn, getRecover);
router.get('/activation', isLoggedIn, isNotActivated, getActivation);
router.get('/changeemail', isLoggedIn, getChangeEmail);

// POST routes
router.post('/login', isNotLoggedIn, passport.authenticate('local.singin', {
    successRedirect: '/panel',
    failureRedirect: '/auth/login',
    failureFlash: true
}));
router.post('/register', isNotLoggedIn, passport.authenticate('local.singup', {
    successRedirect: '/profile',
    failureRedirect: '/auth/register',
    failureFlash: true
}));
router.post('/rules', isNotLoggedIn, postRules);
router.post('/recover', isNotLoggedIn, postRecover);
router.post('/activation', isLoggedIn, isNotActivated, postActivation)
router.post('/changeemail', isLoggedIn, postChangeEmail);

module.exports = router;