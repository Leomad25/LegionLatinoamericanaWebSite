const pool = require('../../database');

module.exports = async (req) => {
    if (req.user) {
        const roles = await pool.query('SELECT idrole, `name` FROM legion_latinoamericana_website.roles;');
        if (roles.length > 0) {
            const approved = await pool.query('SELECT idrole FROM legion_latinoamericana_website.`users-roles` WHERE (iduser = ?);', [req.user.iduser]);
            if (approved.length > 0) {
                const courses = [];
                approved.forEach((element) => {
                    roles.forEach((element2) => {
                        if (element.idrole == element2.idrole) courses.push({ idrole: element2.idrole, name: element2.name });
                    });
                });
                return courses;
            }
        }
    }
    return undefined;
}