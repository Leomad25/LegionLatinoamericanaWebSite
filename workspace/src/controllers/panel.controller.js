const controller = {
    getPanel: async (req, res) => {
        const userExtra = await require('../lib/userExtra')(req);
        res.render('pages/panel', {
            stylesheet: '/css/pages/panel.css',
            script: '/js/pages/panel.js',
            userExtra,
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
    }
}

module.exports = controller;