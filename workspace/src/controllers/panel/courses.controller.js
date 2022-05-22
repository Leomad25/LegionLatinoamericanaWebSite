module.exports = {
    requestCourse: {
        get: async (req, res) => {
            const userExtra = await require('../../lib/userExtra')(req);
            res.render('pages/panel/courses/requestCourses', {
                stylesheet: '/css/pages/panel/courses/requestCourse.css',
                script: '/js/pages/panel/courses/requestCourse.js',
                userExtra, pageConf: {
                    roles: await require('../../lib/helpers/requestCourse').getRolesToRequest(req, userExtra),
                    listed: await require('../../lib/helpers/requestCourse').getRolesListed(req)
                },
                panelMessage: require('../../lib/helpers').getPanelMessage(req),
                strings: require('../../lib/langSelector').panelCourses(req, 0)
            });
        },
        post: async (req, res) => {
            const flashMessage = require('../../lib/langSelector').panelMessage(req);
            if (await require('../../lib/helpers/requestCourse').isCheckRankOnBlackList( (await require('../../lib/userExtra')(req)).idrank)) {
                const { coursesSelected } = req.body;
                if (await require('../../lib/helpers/requestCourse').isRoleNameValid(coursesSelected)) {
                    if (await require('../../lib/helpers/requestCourse').isInsideToLimitOfRequestCourse(req.user.iduser)) {
                        if (await require('../../lib/helpers/requestCourse').isNotRepliedRequest(req.user.iduser, coursesSelected)) {
                            if (await require('../../lib/helpers/requestCourse').addRequestToDatabase(req.user.iduser, coursesSelected)) {
                                req.flash('panelMessageSuccess', flashMessage.success.yourRequestHasBeenCreated);
                            } else req.flash('panelMessageError', flashMessage.error.anErrorOccurredWhileSavingYourRequest);
                        } else req.flash('panelMessageError', flashMessage.error.youAlreadyHaveAnApplicationToThisCourse);
                    } else req.flash('panelMessageError', flashMessage.error.youAlreadyHaveTheMaximumLimitOfRequests);
                } else req.flash('panelMessageError', flashMessage.error.theRoleYouAreTryingToApplyToIsInvalid);
            } else req.flash('panelMessageError', flashMessage.error.yourRankIsBlacklisted);
            res.redirect('/panel/courses/requestCourse');
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