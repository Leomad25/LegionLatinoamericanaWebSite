const pool = require('../database');

const controller = {
    getConf: (req, res) => {
        res.render('pages/conf', {
            stylesheet: '/css/pages/conf.css',
            strings: require('../lib/langSelector').conf(req)
        });
    },

    postConf: {
        lang: (req, res) => {
            let { lang } = req.body;
            if (lang != 'en' && lang != 'es')
                lang = 'en';
            if (req.session.lang != lang) req.session.lang = lang;
            res.redirect('/conf');
        }
    },

    getCredits: (req, res) => {
        res.render('pages/credits', {
            stylesheet: '/css/pages/credits.css',
            strings: require('../lib/langSelector').credits(req)
        });
    }
}

module.exports = controller;