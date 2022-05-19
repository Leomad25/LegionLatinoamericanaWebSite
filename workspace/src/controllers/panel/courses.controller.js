module.exports = {
    requestCourse: {
        get: async (req, res) => {
            const userExtra = await require('../../lib/userExtra')(req);
            const roles = await require('../../lib/helpers/requestCourse').getRolesToRequest(req, userExtra)
            res.render('pages/panel/courses/requestCourses', {
                stylesheet: '/css/pages/panel/courses/requestCourse.css',
                script: '/js/pages/panel/courses/requestCourse.js',
                userExtra, pageConf: { roles },
                panelMessage: require('../../lib/helpers').getPanelMessage(req),
                strings: require('../../lib/langSelector').panelCourses(req, 0)
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