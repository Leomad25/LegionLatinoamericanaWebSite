const pool = require('../../database');

module.exports = async (req) => {
    const attendance = {};
    try { // missions
        const missionCount = (await pool.query('SELECT COUNT(*) AS count FROM legion_latinoamericana_website.missionsattendances WHERE (iduser = ?);', [req.user.iduser]))[0].count;
        const missionAssistant = (await pool.query('SELECT COUNT(*) AS count FROM legion_latinoamericana_website.missionsattendances WHERE (iduser = ?) AND (assists = 1);', [req.user.iduser]))[0].count;
        const missionExcuse = (await pool.query('SELECT COUNT(*) AS count FROM legion_latinoamericana_website.missionsattendances WHERE (iduser = ?) AND (excuse = 1);', [req.user.iduser]))[0].count;
        if ((missionCount-missionExcuse) > 0) {
            attendance.missions = ((missionAssistant/(missionCount-missionExcuse)) * 100).toFixed(1) + '% | M: ' + missionCount + ', A: ' + missionAssistant + ', E: ' + missionExcuse;
        } else attendance.missions = 'N/A | M: ' + missionCount + ', A: ' + missionAssistant + ', E: ' + missionExcuse;
    } catch (e) { attendance.missions = 'ERROR'; console.log(e); }
    try { // trainings
        const trainingCount = (await pool.query('SELECT COUNT(*) AS count FROM legion_latinoamericana_website.squadsattendances WHERE (iduser = ?);', [req.user.iduser]))[0].count;
        const trainingAssistant = (await pool.query('SELECT COUNT(*) AS count FROM legion_latinoamericana_website.squadsattendances WHERE (iduser = ?) AND (assists = 1);', [req.user.iduser]))[0].count;
        const trainingExcuse = (await pool.query('SELECT COUNT(*) AS count FROM legion_latinoamericana_website.squadsattendances WHERE (iduser = ?) AND (excuse = 1);', [req.user.iduser]))[0].count;
        if ((trainingCount-trainingExcuse) > 0) {
            attendance.trainings = ((trainingAssistant/(trainingCount-trainingExcuse)) * 100).toFixed(1) + '% | T: ' + trainingCount + ', A: ' + trainingAssistant + ', E: ' + trainingExcuse;
        } else attendance.trainings = 'N/A | T: ' + trainingCount + ', A: ' + trainingAssistant + ', E: ' + trainingExcuse;
    } catch (e) { attendance.trainings = 'ERROR'; }
    return attendance;
}