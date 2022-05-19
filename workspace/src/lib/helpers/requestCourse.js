const pool = require('../../database');

module.exports = {
    getRolesToRequest: async (req, userExtra) => {
        const list = [];
        // rank permitted check
        const rank_blackList = await pool.query('SELECT * FROM legion_latinoamericana_website.`rolesrequests-blacklist`;');
        for (let bl_elment of rank_blackList) if (userExtra.idrank == bl_elment.idrank) {
            req.flash('panelMessageInfo', require('../../lib/langSelector').panelMessage(req).info.yourRankIsIncompatibleToRequestACourse);
            return [];
        }
        // check role if permitted to select
        const roles = await pool.query('SELECT * FROM legion_latinoamericana_website.roles WHERE request=1;');
        const user_roles = await pool.query('SELECT * FROM legion_latinoamericana_website.`users-roles` WHERE iduser=?;', [req.user.iduser]);
        const rolesRequests = await pool.query('SELECT * FROM legion_latinoamericana_website.rolesrequests ORDER BY idrole, rolerequest ASC;');
        var isDuplicate;
        for (let role of roles) {
            isDuplicate = false;
            for (let userRole of user_roles) if (role.idrole == userRole.idrole) isDuplicate = true;
            if (isDuplicate) continue;
            let obj = {};
            obj.idrole = role.idrole;
            obj.tag = role.name;
            if (role.description != null) obj.desc = role.description;
            const rolerequest = roleRequest(obj.idrole, rolesRequests, roles);
            if (rolerequest.lines.length > 0) obj.lines = rolerequest.lines;
            if (rolerequest.courses.length > 0) obj.courses = rolerequest.courses;
            if (obj.courses && obj.lines) obj.notPrerequisites = true;
            list.push(obj);
        }
        return list;
    }
}

function roleRequest(idrole, rolesRequests, roles) {
    let arr = [];
    rolesRequests.forEach((element) => {
        if (element.idrole == idrole) arr.push(element);
    });
    const obj = {lines: [], courses: []};
    arr.forEach((element) => {
        if (element.rolerequest == null) {
            obj.lines.push(element.label);
        } else {
            let name = '';
            for (let role of roles) if (role.idrole == element.rolerequest) name = role.name;
            obj.courses.push(name);
        }
    });
    return obj;
}