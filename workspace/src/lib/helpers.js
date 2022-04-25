const bcrypt = require('bcryptjs');

module.exports = {
    encryptPassword: async (password) => {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    },
    matchPassword: async (password, savedPassword) => {
        try {
            return await bcrypt.compare(password, savedPassword);
        } catch (e) {
            console.log(e);
        }
    },
    getFlashMessage: (req) => {
        const flashStrings = require('./langSelector').flash(req);
        let flash = {};
        if (req.session.flash) {
            if (req.session.flash.success) {
                flash.title = flashStrings.title.success;
                flash.success = true;
                flash.message = req.flash('success');
            }
            if (req.session.flash.error) {
                flash.title = flashStrings.title.error;
                flash.error = true;
                flash.message = req.flash('error');
            }
            if (req.session.flash.info) {
                flash.title = flashStrings.title.info;
                flash.info = true;
                flash.message = req.flash('info');
            }
            if (flash.success || flash.error || flash.info) {
                flash.btn = flashStrings.btn;
                return flash;
            }
        }
        return undefined;
    },
    validateUsername: (username) => {
        let value = true;
        var c;
        for (var index = 0; index < username.length; index++) {
            c = username.charAt(index);
            if (!((c >= 'a' && c <= 'z') || c == '.' || c == ' '))
                value = false;
        }
        return value;
    }
};