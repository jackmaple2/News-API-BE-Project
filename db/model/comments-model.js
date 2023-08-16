const db = require('../connection');
const { convertTimestampToDate, createRef, formatComments} = require('../seeds/utils');


const selectCommentsByArticleId = (article_id) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1 
    ORDER BY created_at desc;`,  [article_id])
    .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'Resource not found'
            });
        }
        return result.rows;
    })
};

module.exports = { selectCommentsByArticleId };