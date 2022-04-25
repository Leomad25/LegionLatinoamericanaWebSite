const pool = require('../../database');

module.exports = async (req, role) => {
    let validate = false;
    if ((await pool.query('SELECT COUNT(*) AS count FROM legion_latinoamericana_website.roles WHERE (idrole = ?);', [role]))[0].count != 0) {
        const approvedCourses = await require('./approvedCourses')(req);
        if (approvedCourses.length > 0) approvedCourses.forEach((element) => {
            if (element.idrole == role) {
                validate = true;
                return;
            }
        });
    }
    return validate;
}