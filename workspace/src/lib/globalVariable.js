module.exports = (req, next) => {
    language(req);
    next();
}

function language(req) {
    if (!req.session.lang) {
        if (req.session.lang) {
            req.session.lang = req.user.lang;
        } else {
            req.session.lang = 'en'; // set default language
        }
    }
}