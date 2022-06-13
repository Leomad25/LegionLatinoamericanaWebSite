const pool = require('../../../database');

module.exports = {
    getRequestCourseTables: async (req) => {
        const obj = {
            general: await requestCourseTables(req, 'gen'),
            specific: await requestCourseTables(req, 'spe')
        }
        return obj;
    },

    getFroms: async (req) => {
        const arr = [];
        await roleForFroms(req, arr);
        //arr.forEach(element => { console.log(element); });
        if (arr.length > 0) return arr;
        return undefined;
    }
}

async function requestCourseTables(req, opt) {
    let arr = [];
    if (opt == 'gen') {
        let roles = [];
        let rolesRequests = [];
        if (req.user.permissions == 5 || req.user.permissions == 9) {
            roles = await pool.query('SELECT idrole, name FROM legion_latinoamericana_website.roles;');
            rolesRequests = await pool.query('SELECT * FROM legion_latinoamericana_website.`roles-users-requests`;');
        } else {
            const instructors = await pool.query('SELECT * FROM legion_latinoamericana_website.instructors WHERE (iduser = ?);', [req.user.iduser]);
            if (instructors.length > 0) {
                for (let instructor of instructors) {
                    const roles_db = await pool.query('SELECT idrole, name FROM legion_latinoamericana_website.roles WHERE (idrole = ?);', [instructor.idrole]);
                    if (roles_db.length > 0) roles_db.forEach(element => { roles.push(element); });
                    const rolesRequests_db = await pool.query('SELECT * FROM legion_latinoamericana_website.`roles-users-requests` WHERE (idrole = ?);', [instructor.idrole]);
                    if (rolesRequests_db.length > 0) rolesRequests_db.forEach(element => { rolesRequests.push(element); });
                };
            }
        }
        var count;
        roles.forEach(element => {
            count = 0;
            rolesRequests.forEach(subElement => {
                if (subElement.idrole == element.idrole) count++;
            });
            arr.push({
                idrole: element.idrole,
                name: element.name,
                count
            });
        });
    } else if (opt == 'spe') {
        let roles = [];
        const users = await pool.query('SELECT `iduser`, `username` FROM legion_latinoamericana_website.users;');
        let rolesRequests = [];
        if (req.user.permissions == 5 || req.user.permissions == 9) {
            roles = await pool.query('SELECT idrole, name FROM legion_latinoamericana_website.roles;');
            rolesRequests = await pool.query('SELECT * FROM legion_latinoamericana_website.`roles-users-requests`;');
        } else {
            const instructors = await pool.query('SELECT * FROM legion_latinoamericana_website.instructors WHERE (iduser = ?);', [req.user.iduser]);
            if (instructors.length > 0) {
                for (let instructor of instructors) {
                    roles_db = await pool.query('SELECT idrole, name FROM legion_latinoamericana_website.roles WHERE (idrole = ?);', [instructor.idrole]);
                    if (roles_db.length > 0) roles_db.forEach(element => { roles.push(element); });
                    rolesRequests_db = await pool.query('SELECT * FROM legion_latinoamericana_website.`roles-users-requests` WHERE (idrole = ?);', [instructor.idrole]);
                    if (rolesRequests_db.length > 0) rolesRequests_db.forEach(element => { rolesRequests.push(element); });
                };
                
            }
        }
        var date, user, role;
        rolesRequests.forEach((element) => {
            for (let subElement of roles) {
                if (element.idrole == subElement.idrole) role = subElement.name;
            }
            for (let subElement of users) {
                if (element.iduser == subElement.iduser) user = subElement.username;
            }
            if (element.date == null) {
                date = 'No set';
            }
            arr.push({date, role, user});
        });
    }
    return arr;
}

async function roleForFroms(req, arr) {
    const user = req.user;
    let roles = [];
    const allRoles = await pool.query('SELECT * FROM legion_latinoamericana_website.roles;');
    const prerequisites_db = await pool.query('SELECT * FROM legion_latinoamericana_website.rolesrequests;');
    if (user.permissions == 5 || user.permissions == 9) {
        roles = allRoles;
    } else {
        const instructors = await pool.query('SELECT * FROM legion_latinoamericana_website.instructors WHERE (iduser = ?);', [req.user.iduser]);
        if (instructors.length > 0) for (let instructor of instructors) {
            if (allRoles.length > 0) allRoles.forEach(element => { if (element.idrole == instructor.idrole) roles.push(element); });
        };
    }
    if (roles.length > 0) roles.forEach(element => {
        const id = element.idrole;
        const name = element.name;
        let request = false;
        if (element.request == 1) request = true;
        let adminLock = false; 
        if (element.adminlock == 1) adminLock = true;
        const prerequisites = { roles: [], selected: [] };
        addPrerequisitesRolesForForms(id, prerequisites_db, allRoles, prerequisites);
        for (let index = 0; index < 100; index++) {
            prerequisites.roles.push({idrole: (0 - index), name: 'test ' + (0 - index)});
        }
        arr.push({id, name, adminLock, request, prerequisites});
    });
}

function addPrerequisitesRolesForForms(id, list, roles, arrs) {
    list.forEach(element => { if (element.idrole == id) {
        let name = '';
        for (let role of roles) if (role.idrole == element.rolerequest) {
            name = role.name;
            break;
        };
        arrs.selected.push({idrole: element.rolerequest, name});
    }});
    const tempArray = [];
    roles.forEach(element => {
        const name = element.name;
        const idrole = element.idrole;
        if (idrole != id) tempArray.push({idrole, name});
    });
    if (arrs.selected.length > 0) {
        tempArray.forEach(element => {
            let skip = false;
            arrs.selected.forEach(subElement => {
                if (element.idrole == subElement.idrole) skip = true;
            });
            if (!skip) arrs.roles.push(element);
        });
    } else arrs.roles = tempArray;
}