module.exports = {
    requestCourse: {
        get: async (req, res) => {
            const userExtra = await require('../../lib/userExtra')(req);
            res.render('pages/panel/courses/requestCourses', {
                stylesheet: '/css/pages/panel/courses/requestCourse.css',
                script: '/js/pages/panel/courses/requestCourse.js',
                userExtra, pageConf: {
                    roles: await require('../../lib/helpers/courses/requestCourse').getRolesToRequest(req, userExtra),
                    listed: await require('../../lib/helpers/courses/requestCourse').getRolesListed(req)
                },
                panelMessage: require('../../lib/helpers').getPanelMessage(req),
                strings: require('../../lib/langSelector').panelCourses(req, 0)
            });
        },
        post: async (req, res) => {
            const flashMessage = require('../../lib/langSelector').panelMessage(req);
            if (await require('../../lib/helpers/courses/requestCourse').isCheckRankOnBlackList( (await require('../../lib/userExtra')(req)).idrank)) {
                const { coursesSelected } = req.body;
                if (await require('../../lib/helpers/courses/requestCourse').isRoleNameValid(coursesSelected)) {
                    if (await require('../../lib/helpers/courses/requestCourse').isInsideToLimitOfRequestCourse(req.user.iduser)) {
                        if (await require('../../lib/helpers/courses/requestCourse').isNotRepliedRequest(req.user.iduser, coursesSelected)) {
                            if (await require('../../lib/helpers/courses/requestCourse').addRequestToDatabase(req.user.iduser, coursesSelected)) {
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
        get: async (req, res) => {}
    },
    administration: {
        get:  async (req, res) => {
            const userExtra = await require('../../lib/userExtra')(req);
            res.render('pages/panel/courses/administration', {
                stylesheet: '/css/pages/panel/courses/administration.css',
                script: '/js/pages/panel/courses/administration.js',
                userExtra, pageConf: {
                    requestCourse: await require('../../lib/helpers/courses/administration').getRequestCourseTables(req),
                    forms: await require('../../lib/helpers/courses/administration').getFroms(req)
                },
                panelMessage: require('../../lib/helpers').getPanelMessage(req),
                strings: require('../../lib/langSelector').panelCourses(req, 2)
            });
        },
        post: async (req, res) => {

        }
    }
}