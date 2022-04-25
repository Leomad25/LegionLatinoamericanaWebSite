const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const {
    validateUsername,
    encryptPassword, matchPassword
} = require('../lib/helpers');

passport.use('local.singin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const flashStrings = require('../lib/langSelector').flash(req);
    let row = await pool.query('SELECT * FROM legion_latinoamericana_website.users WHERE (username = ?)', [username.toLowerCase()]);
    if (row.length > 0) {
        const user = row[0];
        const validPassword = await matchPassword(password, user.password);
        if (validPassword) {
            return done(null, user);
        } else {
            return done(null, false, req.flash('error', flashStrings.error.incorrectPassword));
        }
    } else {
        return done(null, false, req.flash('error', flashStrings.error.theUserDoesNotExist));
    }
}));

passport.use('local.singup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const flashStrings = require('../lib/langSelector').flash(req);
    if (req.body.confirmPassword != password) return done(null, null, req.flash('error', 'The password not match.'));
    const { email, reason, discovered, tellUs } = req.body;
    const newUser = {
        username: username.toLowerCase(),
        password: await encryptPassword(password),
        lang: req.session.lang,
        email: email.toLowerCase()
    };
    const newReasons = {
        reason: reason.toLowerCase(),
        discovered,
        tellUs: tellUs.toLowerCase()
    }
    req.session.preload = {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        reason: reason.toLowerCase(),
        tellUs: tellUs.toLowerCase()
    }
    if (!validateUsername(username)) return done(null, false, req.flash('error', flashStrings.error.usernameIsInvalid));
    let row = await pool.query('SELECT username FROM legion_latinoamericana_website.users WHERE (username = ?);', [newUser.username]);
    if (row.length === 0) {
        row = await pool.query('SELECT email FROM legion_latinoamericana_website.users WHERE (email = ?)', [newUser.email]);
        if (row.length === 0) {
            if (newReasons.reason.length > 0) {
                row = await pool.query('SELECT iddiscovered FROM legion_latinoamericana_website.discovered;');
                for (let i = 0; i < row.length; i++) {
                    if (row[i].iddiscovered.toString() === newReasons.discovered) {
                        if (req.session.preload) delete req.session.preload;
                        let result = await pool.query('INSERT INTO legion_latinoamericana_website.users SET ?', [newUser]);
                        newUser.iduser = result.insertId;
                        newReasons.iduser = newUser.iduser;
                        newReasons.iddiscovered = row[i].iddiscovered;
                        delete newReasons.discovered;
                        delete newReasons.tellUs;
                        await pool.query('INSERT INTO legion_latinoamericana_website.`users-discovered` SET ?', [newReasons]);
                        return done(null, newUser);
                    }
                }
                if (newReasons.discovered === 'other') {
                    if (newReasons.tellUs.length > 0) {
                        console.log('tell us: on');
                        return;
                    } else {
                        return done(null, false, req.flash('error', flashStrings.error.tellUsHowYouFoundUs));
                    }
                }
                return done(null, false, req.flash('error', flashStrings.error.wayDiscoverUsIsInvalid));
            } else {
                return done(null, false, req.flash('error', flashStrings.error.weNeedYouToTellUsWhyYouWantToJoinUs));
            }
        } else {
            return done(null, false, req.flash('error', flashStrings.error.emailAddressIsAlreadyInUse));
        }
    } else {
        return done(null, false, req.flash('error', flashStrings.error.usernameIsAlreadyRegistered));
    }
}));

passport.serializeUser((user, done) => {
    return done(null, user.iduser);
});

passport.deserializeUser(async (iduser, done) => {
    let row = await pool.query('SELECT * FROM legion_latinoamericana_website.users WHERE (iduser = ?)', [iduser]);
    return done(null, row[0]);
});