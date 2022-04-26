const pool = require('../database');

const pageConf = {};

const controller = {
    getRouter: (req, res) => {
        if (
            req.query.filter &&
            (req.query.filter == 'personal' || req.query.filter == 'ranks' || req.query.filter == 'awards')
        ) {
            // filter
            pageConf.filter = {};
            pageConf.filter.filter = req.query.filter;
            if (req.query.filter == 'personal') pageConf.filter.personal = true;
            if (req.query.filter == 'ranks') pageConf.filter.ranks = true;
            if (req.query.filter == 'awards') pageConf.filter.awards = true;

            // render
            res.render('pages/roster', {
                stylesheet: '/css/pages/roster.css',
                script: '/js/pages/roster.js',
                strings: require('../lib/langSelector').roster(req),
                pageConf
            });
        } else res.redirect('/roster?filter=personal');
    }
}

module.exports = controller;