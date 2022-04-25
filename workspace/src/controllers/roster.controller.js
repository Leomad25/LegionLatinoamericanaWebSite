const pool = require('../database');

const pageConf = {};

const controller = {
    getRouter: (req, res) => {
        if (req.query.filter == undefined) {
            console.log('no filter');
        } else {
            console.log('filter');
        }
        res.render('pages/roster', {
            stylesheet: '/css/pages/roster.css',
            script: '/js/pages/roster.js',
            strings: require('../lib/langSelector').roster(req),
            pageConf
        });
    }
}

module.exports = controller;