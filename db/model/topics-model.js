const db = require('../connection');
const { convertTimestampToDate, createRef, formatComments} = require('../seeds/utils');


selectTopics = () => {
    const baseSqlString = `SELECT * FROM topics;`
    
    return db.query(baseSqlString).then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'Resource not found'});
        } else {
            return result.rows;
        }
    })
};




module.exports = {selectTopics};