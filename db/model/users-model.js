const db = require('../connection');
const { convertTimestampToDate, createRef, formatComments} = require('../seeds/utils');

function selectUsers() {
    return db.query(`SELECT * FROM users`)
    .then((result) =>  {
        if (result.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'Resource not found'})
        } else {
            return result.rows;
        }
    })
 }

module.exports = {selectUsers}

