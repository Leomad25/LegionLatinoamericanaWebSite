const pool = require('../database');
const { matchPassword } = require('../lib/helpers');

const controller = {
    getProfile: async (req, res) => {
        const userExtra = await require('../lib/userExtra')(req);
        const pageConf = {};
        // permissionLevel
        pageConf.permissionLevel = {};
        if (req.user.permissions == 0) pageConf.permissionLevel.none = true;
        if (req.user.permissions == 1) pageConf.permissionLevel.squad = true;
        if (req.user.permissions == 2) pageConf.permissionLevel.allSquads = true;
        if (req.user.permissions == 3) pageConf.permissionLevel.squadsAndUsers = true;
        if (req.user.permissions == 4) pageConf.permissionLevel.squadsUsersAndPermissions = true;
        if (req.user.permissions == 5) pageConf.permissionLevel.allClan = true;
        if (req.user.permissions == 9) pageConf.permissionLevel.developer = true;
        // role info
        pageConf.roleInfo = {};
        try { // Rank
            let ranks = undefined;
            if (userExtra.idrank != null) ranks = await userExtra.func.getRank(userExtra.idrank);
            if (ranks != undefined) {
                pageConf.roleInfo.rank = ranks.name;
            } else pageConf.roleInfo.rank = 'Not assigned';
        } catch (e) { pageConf.roleInfo.rank = 'Error'; }
        try { // Squads and Leader
            let squads = undefined;
            if (userExtra.idsquad != null) squads = await userExtra.func.getSquad(userExtra.idsquad);
            if (squads != undefined) {
                pageConf.roleInfo.squad = squads.name;
                if (squads.leader != undefined) {
                    pageConf.roleInfo.leader = (await userExtra.func.getRank((await userExtra.func.getUserExtra(squads.leader)).idrank)).tag +
                        '. ' + (await userExtra.func.getUser(squads.leader)).username;
                } else pageConf.roleInfo.leader = 'Not assigned';
            } else { pageConf.roleInfo.squad = 'Not assigned'; pageConf.roleInfo.leader = 'Not assigned'; }
        } catch (e) { pageConf.roleInfo.squad = 'Error'; pageConf.roleInfo.leader = 'Error'; }
        try { // Role
            if ( userExtra.defaultrole != null ) {
                pageConf.roleInfo.role = (await userExtra.func.getRole(userExtra.defaultrole)).name;
            } else { pageConf.roleInfo.role = 'Not assigned'; }
        } catch (e) { pageConf.roleInfo.role = 'Error'; }
        if (req.user.status == true) { pageConf.roleInfo.status = 'Active'; } else { pageConf.roleInfo.status = 'Inactive'; }
        try { // Approved courses
            pageConf.approvedCourses = await require('../lib/helpers/approvedCourses')(req);
        } catch (e) { pageConf.approvedCourses = undefined; }
        // Attendance
        pageConf.attendance = await require('../lib/helpers/userAttendance')(req);
        //render
        res.render('pages/profile', {
            stylesheet: '/css/pages/profile.css',
            script: '/js/pages/profiile.js',
            userExtra, pageConf,
            flash: require('../lib/helpers').getFlashMessage(req),
            strings: require('../lib/langSelector').profile(req)
        });
    },

    postProfile: {
        email: async (req, res) => {
            const flashMessage = require('../lib/langSelector').flash(req);
            const { currentPassword, email } = req.body;
            if (await matchPassword(currentPassword, req.user.password)) {
                try {
                    const update = await pool.query('UPDATE legion_latinoamericana_website.users SET activated = 0, email = ? WHERE (iduser = ?);', [email, req.user.iduser]);
                    if ( update.changedRows > 0 ) {
                        req.flash('success', flashMessage.success.yourEmailHasBeenChangedSuccessfully);
                    } else {
                        req.flash('error', flashMessage.error.anUnexpectedErrorHasOccurred);
                    }
                } catch (e) {
                    req.flash('error', flashMessage.error.anUnexpectedErrorHasOccurred);
                }
            } else req.flash('error', flashMessage.error.incorrectPassword);
            res.redirect('/profile/');
        },
        password: async (req, res) => {
            const flashMessage = require('../lib/langSelector').flash(req);
            const { currentPassword, password } = req.body;
            const { matchPassword, encryptPassword } = require('../lib/helpers');
            if (await matchPassword(currentPassword, req.user.password)) {
                try {
                    const update = await pool.query('UPDATE legion_latinoamericana_website.users SET `password` = ? WHERE (iduser = ?);', [await encryptPassword(password), req.user.iduser]);
                    if ( update.changedRows > 0 ) {
                        req.flash('success', flashMessage.success.yourPasswordHasBeenSuccessfullyUpdated);
                        req.logOut();
                        delete req.session.passport;
                        return res.redirect('/auth/login'); 
                    } else {
                        req.flash('error', flashMessage.error.anUnexpectedErrorHasOccurred);
                    }
                } catch (e) {
                    req.flash('error', flashMessage.error.anUnexpectedErrorHasOccurred);
                }
            } else req.flash('error', flashMessage.error.incorrectPassword);
            res.redirect('/profile/');
        },
        lang: async (req, res) => {
            const flashMessage = require('../lib/langSelector').flash(req);
            const { currentPassword } = req.body;
            let { lang } = req.body;
            if (await matchPassword(currentPassword, req.user.password)) {
                try {
                    if ( lang != 'en' && lang != 'es') lang = 'en';
                    const update = await pool.query('UPDATE `legion_latinoamericana_website`.`users` SET `lang` = ? WHERE (`iduser` = ?);', [lang, req.user.iduser]);
                    if ( update.changedRows > 0 ) {
                        if (req.session.lang != lang) req.session.lang = lang;
                        req.flash('success', flashMessage.success.yourLanguageHasBeenUpdated);
                    } else {
                        req.flash('error', flashMessage.error.anUnexpectedErrorHasOccurred);
                    }
                } catch (e) {
                    req.flash('error', flashMessage.error.anUnexpectedErrorHasOccurred);
                }
            } else req.flash('error', flashMessage.error.incorrectPassword);
            res.redirect('/profile');
        },
        role: async (req, res) => {
            const flashMessage = require('../lib/langSelector').flash(req);
            const { currentPassword, role } = req.body;
            if (await matchPassword(currentPassword, req.user.password)) {
                try {
                    const rolesrequests = await pool.query('SELECT * FROM legion_latinoamericana_website.rolesrequests;');
                    if (rolesrequests.length == 0) {
                        if (await require('../lib/helpers/validateRoleRequestsEnable')(req, role)) {
                            const userExtra = await require('../lib/userExtra')(req);
                            if (userExtra.defaultrole != role) {
                                const datetime = require('moment')().format('yyyy-MM-DD HH:mm:ss');
                                const insert = await pool.query('INSERT INTO `legion_latinoamericana_website`.`rolesrequests` (`iduser`, `idrole`, `datetime`) VALUES (?, ?, ?);', [req.user.iduser, role, datetime]);
                                if (insert.affectedRows > 0) {
                                    req.flash('success', flashMessage.success.yourRoleRequestHasBeenGenerated);
                                } else {
                                    req.flash('error', flashMessage.error.anErrorOccurredWhileCreatingYourRequest);
                                }
                            } else {
                                req.flash('error', flashMessage.error.youAlreadyOccupyThatRole);
                            }
                        } else {
                            req.flash('error', flashMessage.error.theRoleToWhichYouApplyDoesNotExistOrYouAreNotQualified);
                        }
                    } else {
                        req.flash('info', flashMessage.info.youAlreadyHaveAPendingRoleRequest);
                    }
                } catch (e) { req.flash('error', flashMessage.error.anUnexpectedErrorHasOccurred); console.log(e); }
            } else req.flash('error', flashMessage.error.incorrectPassword);
            res.redirect('/profile');
        }
    }
}

module.exports = controller;