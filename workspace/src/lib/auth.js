module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/auth/login');
        }
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/');
        }
    },

    isActivated(req, res, next) {
        if (req.user.activated == true) {
            return next();
        } else {
            return res.redirect('/auth/activation')
        }
    },

    isNotActivated(req, res, next) {
        if (req.user.activated == false) {
            return next();
        } else {
            return res.redirect('/')
        }
    },

    async isCoursesAdmin(req, res, next) {
        const pool = require('../database');
        const instructors = await pool.query('SELECT * FROM legion_latinoamericana_website.instructors WHERE `iduser` = ?;', [req.user.iduser]);
        if (req.user.permissions == 5 || req.user.permissions == 9 || instructors.length > 0) {
            return next();
        } else {
            req.flash('panelMessageError', require('../lib/langSelector').panelMessage(req).error.youDoNotHaveThePermissionsToAccessThisAddress);
            return res.redirect('/panel');
        }
    }
}