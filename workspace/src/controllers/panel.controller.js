

const controller = {
    getPanel: async (req, res) => {
        const userExtra = await require('../lib/userExtra')(req);
        res.render('pages/panel', {
            stylesheet: '/css/pages/panel.css',
            script: '/js/pages/panel.js',
            userExtra,
            panelMessage: require('../lib/helpers').getPanelMessage(req),
            strings: require('../lib/langSelector').panel(req)
        });
    },
    
    getCbi: async (req, res) => {
        const userExtra = await require('../lib/userExtra')(req);
        const pageConf = {}
        if (userExtra.cbi == false) pageConf.cbiDone = true;
        res.render('pages/panel/cbi', {
            stylesheet: '/css/pages/panel/cbi.css',
            script: '/js/pages/panel/cbi.js',
            strings: require('../lib/langSelector').cbi(req),
            pageConf
        });
    },

    courses: {
        requestCourse: require('./panel/courses.controller').requestCourse,
        schedule: require('./panel/courses.controller').schedule,
        administration: require('./panel/courses.controller').administration
    }
}

module.exports = controller;