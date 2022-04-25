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

    async isActivated(req, res, next) {
        if (req.user.activated == true) {
            return next();
        } else {
            return res.redirect('/auth/activation')
        }
    },

    async isNotActivated(req, res, next) {
        if (req.user.activated == false) {
            return next();
        } else {
            return res.redirect('/')
        }
    }
}