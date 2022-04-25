const pool = require('../database');
const { getFlashMessage } = require('../lib/helpers');


const controller = {
    getLogout: (req, res) => {
        req.logOut();
        delete req.session.passport;
        res.redirect('/');
    },

    getLogin: (req, res) => {
        res.render('pages/auth/login', {
            stylesheet: '/css/pages/auth/login.css',
            flash: getFlashMessage(req),
            strings: require('../lib/langSelector').auth.login(req)
        });
    },

    getRules: (req, res) => {
        res.render('pages/auth/rules', {
            stylesheet: '/css/pages/auth/rules.css',
            strings: require('../lib/langSelector').auth.rules(req)
        });
    },

    postRules: (req, res) => {
        req.session.rulesAccepted = true;
        res.redirect('/auth/register');
    },

    getRegister: async (req, res) => {
        if (req.session.rulesAccepted) {
            const preload = req.session.preload;
            delete req.session.preload;
            if (preload !== undefined) {
                if (preload.username.length === 0) delete preload.username;
                if (preload.email.length === 0) delete preload.email;
                if (preload.reason.length === 0) delete preload.reason;
                if (preload.tellUs.length === 0) delete preload.tellUs;
            }
            const discoveredItemsDB = await pool.query('SELECT * FROM legion_latinoamericana_website.discovered;');
            const discoveredItems = [];
            if (discoveredItemsDB.length > 0)
                discoveredItemsDB.forEach((element) => {
                    let tag = undefined;
                    if (req.session.lang === 'en') tag = element.en;
                    if (req.session.lang === 'es') tag = element.es;
                    discoveredItems.push({id: element.iddiscovered, tag});
                });
            if (preload !== undefined && (preload.username || preload.email || preload.reason || preload.tellUs)) {
                res.render('pages/auth/register.hbs', {
                    stylesheet: '/css/pages/auth/register.css',
                    script: '/js/pages/auth/register.js',
                    flash: getFlashMessage(req),
                    discoveredItems,
                    preload,
                    strings: require('../lib/langSelector').auth.register(req)
                });
            } else {
                res.render('pages/auth/register.hbs', {
                    stylesheet: '/css/pages/auth/register.css',
                    script: '/js/pages/auth/register.js',
                    flash: getFlashMessage(req),
                    discoveredItems,
                    strings: require('../lib/langSelector').auth.register(req)
                });
            }
            
        } else {
            res.redirect('/auth/rules');
        }
    },

    getRecover: (req, res) => {
        res.render('pages/auth/recover', {
            stylesheet: '/css/pages/auth/recover.css',
            strings: require('../lib/langSelector').auth.recover(req)
        });
    },

    postRecover: (req, res) => {

    },
    
    getActivation: (req, res) => {
        res.render('pages/auth/activation', {
            stylesheet: '/css/pages/auth/activation.css',
            flash: require('../lib/helpers').getFlashMessage(req),
            strings: require('../lib/langSelector').auth.activation(req)
        });
    },

    postActivation: (req, res) => {

    },

    getChangeEmail: (req, res) => {
        res.render('pages/auth/changeEmail', {
            stylesheet: '/css/pages/auth/changeEmail.css',
            strings: require('../lib/langSelector').auth.changeEmail(req)
        });
    },

    postChangeEmail: (req, res) => {

    }
};

module.exports = controller;