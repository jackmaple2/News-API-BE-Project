const db = require('../connection');
const { convertTimestampToDate, createRef, formatComments} = require('../seeds/utils');
const { selectArticles } = require('./articles-model');


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

const makePostComment = ({article_id, username, body}) => {
    return selectArticles(article_id).then(() => {
        return db.query(`INSERT INTO comments (article_id, author, body)
        VALUES ($1, $2, $3) RETURNING *`, [article_id, username, body]
        )
        .then(({rows}) => {
            const comment = rows[0];
       
            return comment;
        })
    })    
}
module.exports = { selectCommentsByArticleId, makePostComment };