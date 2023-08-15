const db = require('../connection');
const { convertTimestampToDate, createRef, formatComments} = require('../seeds/utils');

const selectArticles = (article_id) => {

    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({rows}) => {
        const userId = rows[0];
        if (!userId) {
            return Promise.reject({
                status: 404,
                msg: 'Resource not found'
            })
        }          
        return userId;
    })
}



module.exports = { selectArticles };