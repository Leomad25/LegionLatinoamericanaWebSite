const controller = {
    getHome: async (req, res) => {
        if (!req.user) {
            res.render('pages/home', {
                stylesheet: '/css/pages/home.css',
                script: '/js/pages/home.js',
                pageConf: { header: true },
                strings: require('../lib/langSelector').home(req)
            });
        } else {
            const pageConf = { header: true };
            const userExtra = await require('../lib/userExtra')(req);
            try {
                pageConf.rank = (await userExtra.func.getRank(userExtra.idrank)).tag;
            } catch (e) { pageConf.rank = 'Error'; }
            res.render('pages/home', {
                stylesheet: '/css/pages/home.css',
                script: '/js/pages/home.js',
                pageConf, userExtra,
                strings: require('../lib/langSelector').home(req)
            });
        }
    },

    getPageNotFound: (req, res) => {
        res.status(404).redirect('/');
    }
}

module.exports = controller;