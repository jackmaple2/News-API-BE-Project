const db = require('../connection');
const { convertTimestampToDate, createRef, formatComments} = require('../seeds/utils');


function selectUsers() {
    return db.query(`SELECT * FROM users`)
    .then(([rows]) => {
        const users = rows[0]
        return users;
    })
}

module.exports = {selectUsers}

