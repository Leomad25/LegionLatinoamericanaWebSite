const pool = require('../database');

const func = {
    getUser: async (iduser) => {
        if (iduser != null) {
            const users = await pool.query('SELECT * FROM legion_latinoamericana_website.users WHERE (iduser = ?);', [iduser]);
            if (users.length > 0) {
               return users[0]; 
            }
        }
        return undefined;
    },
    getUserExtra: async (iduser) => {
        if (iduser != null) {
            const users = await pool.query('SELECT * FROM legion_latinoamericana_website.userextras WHERE (iduser = ?);', [iduser]);
            if (users.length > 0) {
               return users[0]; 
            }
        }
        return undefined;
    },
    getRank: async (idrank) => {
        if (idrank != null) {
            const ranks = await pool.query('SELECT * FROM legion_latinoamericana_website.ranks WHERE (idrank = ?);', [idrank]);
            if (ranks.length > 0) {
               return ranks[0]; 
            }
        }
        return undefined;
    },
    getSquad: async (idsquad) => {
        if (idsquad != null) {
            const squads = await pool.query('SELECT * FROM legion_latinoamericana_website.squads WHERE (idsquad = ?);', [idsquad]);
            if (squads.length > 0) {
               return squads[0]; 
            }
        }
        return undefined;
    },
    getRole: async (idrole) => {
        if (idrole != null) {
            const roles = await pool.query('SELECT * FROM legion_latinoamericana_website.roles WHERE (idrole = ?);', [idrole]);
            if (roles.length > 0) {
               return roles[0]; 
            }
        }
        return undefined;
    }
}

module.exports = async (req) => {
    const result = await pool.query('SELECT * FROM legion_latinoamericana_website.userextras WHERE (iduser = ?);', [req.user.iduser]);
    if (result.length > 0) {
        const item = result[0];
        item.func = func;
        return item;
    } else {
        await pool.query('INSERT INTO `legion_latinoamericana_website`.`userextras` (`iduser`) VALUES (?);', [req.user.iduser]);
        return undefined;
    }
}