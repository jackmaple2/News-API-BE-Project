const db = require('../connection');
const { convertTimestampToDate, createRef, formatComments} = require('../seeds/utils');


function selectUsers() {
    return db.query(`SELECT * FROM users`)
    .then(([rows]) => {
    if (rows.length === 0) {
        return Promise.reject({status: 404, msg: 'Not found'})
    }
        return rows;
    })
}

module.exports = {selectUsers}

