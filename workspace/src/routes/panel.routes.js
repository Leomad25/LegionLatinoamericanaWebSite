const { Router } = require('express');
const router = Router();

const { isLoggedIn, isActivated, isCoursesAdmin } = require('../lib/auth');
const {
    getPanel,
    getCbi,
    courses
} = require('../controllers/panel.controller');

// GET routes
router.get('/', isLoggedIn, isActivated, getPanel);
router.get('/cbi', isLoggedIn, isActivated, getCbi);
    // courses
    router.get('/courses/requestCourse', isLoggedIn, isActivated, courses.requestCourse.get);
    router.get('/courses/schedule', isLoggedIn, isActivated, courses.schedule.get);
    router.get('/courses/administration', isLoggedIn, isActivated, isCoursesAdmin, courses.administration.get);

// POST routes
    // courses
    router.post('/courses/requestCourse', isLoggedIn, isActivated, isCoursesAdmin, courses.requestCourse.post);

module.exports = router;