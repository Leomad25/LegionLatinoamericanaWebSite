module.exports = {
    requestCourse: {
        get: async (req, res) => {
            const userExtra = await require('../../lib/userExtra')(req);
            res.render('pages/panel/courses/requestCourses', {
                stylesheet: '/css/pages/panel.css',
                script: '/js/pages/panel.js',
                userExtra,
                strings: require('../../lib/langSelector').panel(req)
            });
        },
        post: async (req, res) => {

        }
    },
    schedule: {
        get: async (req, res) => {
            const userExtra = await require('../../lib/userExtra')(req);
            res.render('pages/panel', {
                stylesheet: '/css/pages/panel.css',
                script: '/js/pages/panel.js',
                userExtra,
                strings: require('../../lib/langSelector').panel(req)
            });
        }
    },
    administration: {
        get:  async (req, res) => {
            const userExtra = await require('../../lib/userExtra')(req);
            res.render('pages/panel', {
                stylesheet: '/css/pages/panel.css',
                script: '/js/pages/panel.js',
                userExtra,
                strings: require('../../lib/langSelector').panel(req)
            });
        },
        post: async (req, res) => {

        }
    }
}