module.exports = {
    flash: (req) => {
        if (req.session.lang === 'en') return require('../strings/flashMessages/en');
    },
    home: (req) => {
        if (req.session.lang == 'en') {
            strings = require('../strings/pages/en').home;
            strings.header = require('../strings/pages/en').header;
            strings.link = require('../strings/links').home;
            return strings;
        }
    },
    credits: (req) => {
        if (req.session.lang == 'en') return require('../strings/pages/en').credits;
    },
    conf: (req) => {
        if (req.session.lang == 'en') return require('../strings/pages/en').conf;
    },
    auth: {
        register: (req) => {
            if (req.session.lang == 'en') return require('../strings/pages/en').register;
        },
        login: (req) => {
            if (req.session.lang == 'en') return require('../strings/pages/en').login;
        },
        rules: (req) => {
            if (req.session.lang == 'en') return require('../strings/pages/en').rules;
        },
        recover: (req) => {
            if (req.session.lang == 'en') return require('../strings/pages/en').recover;
        },
        activation: (req) => {
            if (req.session.lang == 'en') return require('../strings/pages/en').activation;
        },
        changeEmail: (req) => {
            if (req.session.lang == 'en') return require('../strings/pages/en').changeEmail;
        }
    },
    profile: (req) => {
        if (req.session.lang == 'en') return require('../strings/pages/en').profile;
    },
    roster: (req) => {
        if (req.session.lang == 'en') return require('../strings/pages/en').roster;
    },
    panel: (req) => {
        if (req.session.lang == 'en') return require('../strings/pages/en').panel;
    },
    cbi: (req) => {
        if (req.session.lang == 'en') return require('../strings/pages/en').cbi;
    }
}