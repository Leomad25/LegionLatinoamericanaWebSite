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
        const rolesListed = await pool.query('SELECT * FROM legion_latinoamericana_website.`roles-users-requests` WHERE `iduser` = ?;', [req.user.iduser]);
        const user_roles = await pool.query('SELECT * FROM legion_latinoamericana_website.`users-roles` WHERE iduser=?;', [req.user.iduser]);
        const rolesRequests = await pool.query('SELECT * FROM legion_latinoamericana_website.rolesrequests ORDER BY idrole, rolerequest ASC;');
        var isDuplicate;
        for (let role of roles) {
            if (isRoleListed(role.idrole, rolesListed)) continue;
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
    },
    isCheckRankOnBlackList: async (idrank) => {
        const blacklist = await pool.query('SELECT * FROM legion_latinoamericana_website.`rolesrequests-blacklist` WHERE `idrank` = ?;', [idrank]);
        let ret = false;
        if (blacklist.length == 0) ret = true;
        return ret;
    },
    isRoleNameValid: async (coursesSelected) => {
        const idrole = await pool.query('SELECT idrole FROM legion_latinoamericana_website.roles WHERE `name` = ?;', [coursesSelected]);
        if (idrole.length > 0) return true;
        return false;
    },
    isInsideToLimitOfRequestCourse: async (iduser) => {
        const clanSettings = await pool.query('SELECT * FROM legion_latinoamericana_website.clansettings WHERE tag = \'maxLimitToRequestCoursePerUser\';');
        if (clanSettings.length == 0) return true;
        if (clanSettings[0].value != null) {
            if (clanSettings[0].value > 0) {
                const rolesRequests = await pool.query('SELECT * FROM legion_latinoamericana_website.`roles-users-requests` WHERE (`iduser` = ?);', [iduser]);
                if (rolesRequests.length < clanSettings[0].value) return true;
            }
        }
        return false;
    },
    isNotRepliedRequest: async (iduser, coursesSelected) => {
        const idrole = (await pool.query('SELECT idrole FROM legion_latinoamericana_website.roles WHERE `name` = ?;', [coursesSelected]))[0].idrole;
        const row = (await pool.query('SELECT * FROM legion_latinoamericana_website.`roles-users-requests` WHERE (`iduser` = ?) AND (`idrole` = ?);', [iduser, idrole])).length;
        if (row == 0) return true;
        return false;
    },
    addRequestToDatabase: async (iduser, coursesSelected) => {
        const idrole = (await pool.query('SELECT idrole FROM legion_latinoamericana_website.roles WHERE `name` = ?;', [coursesSelected]))[0].idrole;
        const insert = await pool.query('INSERT INTO legion_latinoamericana_website.`roles-users-requests` (`iduser`, `idrole`) VALUES (?, ?);', [iduser, idrole]);
        if (insert.affectedRows > 0) return true;
        return false;
    },
    getRolesListed: async (req) => {
        let arr = [];
        const rolesListed = await pool.query('SELECT * FROM legion_latinoamericana_website.`roles-users-requests` WHERE `iduser` = ?;', [req.user.iduser]);
        const roles = await pool.query('SELECT * FROM legion_latinoamericana_website.roles;');
        for (let role of roles) {
            for (let listed of rolesListed) if (role.idrole == listed.idrole) arr.push(role.name);
        }
        if (arr.length == 0) return undefined;
        return arr;
    }
}

function roleRequest(idrole, rolesRequests, roles) {
    let arr = [];
    rolesRequests.forEach((element) => {
        if (element.idrole == idrole) arr.push(element);
    });
    //await deleteRoleRequest(idrole)
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


function isRoleListed(idrole, rolesListed) {
    if (rolesListed.length == 0) return false;
    for (let role of rolesListed) if (role.idrole == idrole) return true;
    return false;
}