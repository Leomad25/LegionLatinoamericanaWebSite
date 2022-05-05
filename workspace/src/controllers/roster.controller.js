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
        const ranks = await pool.query('SELECT idrank, tag FROM legion_latinoamericana_website.ranks;');
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
        //console.log(pageConf);
    }
}

function loadRankToUsers(users, ranks) {
    users.forEach((element, index) => {
        if (element.idrank != null) {
            ranks.forEach((subElement) => {
                if (element.idrank == subElement.idrank) users[index].rank = subElement.tag;
            });
        } else {
            users[index].rank = 'N/A';
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