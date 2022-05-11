const pool = require('../database');

const controller = {
    getRouter: async (req, res) => {
        const pageConf = {};
        if (
            req.query.filter &&
            (req.query.filter == 'personal' || req.query.filter == 'ranks' || req.query.filter == 'awards')
        ) {
            // filter
            pageConf.filter = {};
            pageConf.filter.filter = req.query.filter;
            if (req.query.filter == 'personal') pageConf.filter.personal = true;
            if (req.query.filter == 'ranks') pageConf.filter.ranks = true;
            if (req.query.filter == 'awards') pageConf.filter.awards = true;
            // data info
            await loadData(pageConf);
            // render
            res.render('pages/roster', {
                stylesheet: '/css/pages/roster.css',
                script: '/js/pages/roster.js',
                strings: require('../lib/langSelector').roster(req),
                pageConf
            });
        } else res.redirect('/roster?filter=personal');
    }
}

module.exports = controller;

async function loadData(pageConf) {
    if (pageConf.filter.filter == 'personal') {
        const users = await pool.query('SELECT users.iduser, users.username, userextras.idsquad, userextras.idrank, users.status, users.staff FROM legion_latinoamericana_website.users , legion_latinoamericana_website.userextras WHERE (userextras.iduser = users.iduser AND userextras.cbi = 1);');
        const ranks = await pool.query('SELECT idrank, tag, infantry, airforce, icon FROM legion_latinoamericana_website.ranks;');
        const squads = await pool.query('SELECT * FROM legion_latinoamericana_website.squads;');
        pageConf.data = [];
        pageConf.dataStaff = [];
        // load tables
        squads.forEach(element => { pageConf.data.push({squad: element.name, squadId: element.idsquad, list: []}); });
        pageConf.data.push({squad: 'N.S.', squadId: -1, list: []});
        pageConf.data.push({squad: 'Reired', squadId: -2, list: []});
        // set ranks data to users
        loadRankToUsers(users, ranks);
        // load users to tables
        loadUsersToTables(users, pageConf);
        // delete the empty tables
        deleteEmptyTable(pageConf);
        // order by rank
        orderTableByRank(pageConf);
    }

    if (pageConf.filter.filter == 'ranks') {
        const ranks = await pool.query('SELECT * FROM legion_latinoamericana_website.ranks WHERE visible = 1;');
        const infantry = [];
        const airforce = [];
        const civilian = [];
        ranks.forEach((element) => {
            let rankIcon = '/image/'
            if (element.infantry == 1) {
                if (element.icon != null) {
                    rankIcon += 'ranks/infantry/' + element.icon;
                } else rankIcon += 'no-photo.png';
            }
            if (element.airforce == 1) {
                if (element.icon != null) {
                    rankIcon += 'ranks/airForce/' + element.icon;
                } else rankIcon += 'no-photo.png';
            }
            if (element.infantry == 0 && element.airforce == 0) rankIcon += 'no-photo.png';
            const item = {
                rankIcon,
                tag: element.tag,
                name: element.name
            };
            if (element.infantry == 1) infantry.push(item);
            if (element.airforce == 1) airforce.push(item);
            if (element.infantry == 0 && element.airforce == 0)
                civilian.push(item);
        });
        pageConf.data = { infantry, airforce, civilian };
        // fix table of ranks
        fixTablesOfRanks(pageConf);
    }

    if (pageConf.filter.filter == 'awards') {
        const result = await pool.query('SELECT logo, title, lore, `type` FROM legion_latinoamericana_website.awards WHERE `visible` = 1;');
        fillAwards(result, pageConf);
    }
    /* Test line */ //console.log(pageConf);
}

function loadRankToUsers(users, ranks) {
    users.forEach((element, index) => {
        if (element.idrank != null) {
            ranks.forEach((subElement) => {
                if (element.idrank == subElement.idrank) {
                    users[index].rank = subElement.tag;
                    let rankIconPath = '/image/';
                    if (subElement.icon != null) {
                        if (subElement.infantry == 1) rankIconPath += 'ranks/infantry/' + subElement.icon;
                        if (subElement.airforce == 1) rankIconPath += 'ranks/airForce/' + subElement.icon;
                        if (subElement.infantry == 0 && subElement.airforce == 0)
                            rankIconPath += 'no-photo.png';
                    } else {
                        rankIconPath += 'no-photo.png';
                    }
                    users[index].rankIcon = rankIconPath;
                }
            });
        } else {
            users[index].rank = 'N/A';
            users[index].rankIcon = '/image/no-photo.png';
        }
    });
}

function loadUsersToTables(users, pageConf) {
    users.forEach((element) => {
        // load data
        if (element.status == 0) {
            pageConf.data[pageConf.data.length - 1].list.push(element);
        } else {
            if (element.idsquad != null) {
                pageConf.data.forEach((subElement, index) => {
                    if (element.idsquad == subElement.squadId) pageConf.data[index].list.push(element);
                });
            } else {
                pageConf.data[pageConf.data.length - 2].list.push(element);
            }
        }
        // load data Staff
        if (element.staff == 1) pageConf.dataStaff.push(element);
    });
}

function deleteEmptyTable(pageConf) {
    let newData = [];
    pageConf.data.forEach((element) => { if (element.list.length != 0) newData.push(element); });
    pageConf.data = newData;
}

function orderTableByRank(pageConf) {
    pageConf.data.forEach((element) => {
        var arr = element.list;
        arr.sort((a, b) => {
            if (a.idrank < b.idrank) return 1;
            if (a.idrank > b.idrank) return -1;
            return 0;
        });
        element.list = arr;
    });
}

function fixTablesOfRanks(pageConf) {
    let data = {};
    if (pageConf.data.infantry.length != 0) data.infantry = pageConf.data.infantry;
    if (pageConf.data.airforce.length != 0) data.airforce = pageConf.data.airforce;
    if (pageConf.data.civilian.length != 0) data.civilian = pageConf.data.civilian;
    pageConf.data = data;
}

function fillAwards(result, pageConf) {
    let tables = [];
    result.forEach((element) => { tables.push({ type: element.type, list: [] }); });
    tables.sort((a, b) => {
        if (a.type < b.type) return 1;
        if (a.type > b.type) return -1;
        return 0;
    });
    let temp = [];
    tables.forEach((element, index) => {
        if (index == 0) {
            temp.push(element);
        }  else {
            if (temp[temp.length - 1].type != element.type) temp.push(element);
        }
    });
    tables = temp;
    result.forEach((element) => {
        tables.forEach((subElement, index) => {
            if (element.type == subElement.type) tables[index].list.push({
                title: element.title,
                lore: element.lore,
                logo: '/image/awards/' + element.type + '/' + element.logo
            });
        });
    });
    pageConf.data = tables;
}