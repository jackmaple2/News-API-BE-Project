const db = require('../connection');
const { convertTimestampToDate, createRef, formatComments} = require('../seeds/utils');
const { selectArticles } = require('./articles-model');


const selectCommentsByArticleId = (article_id) => {
    return selectArticles(article_id).then(() => {
        return db.query(`SELECT * FROM comments WHERE article_id = $1 
        ORDER BY created_at desc;`,  [article_id])
        .then((result) => {
            if (!article_id) {
                return Promise.reject({
                    status: 404,
                    msg: 'Resource not found'
                });
            }
            return result.rows;
        })
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

const updateVotes = (inc_votes, article_id) => {
    return selectArticles(article_id).then(() => {
        return db.query(`UPDATE comments SET votes = $1 + votes WHERE article_id = $2 RETURNING *;`, ([inc_votes, article_id]))
        .then((result) => {
            return result.rows[0];
        })
    })
}

const modelDeleteComment = ({comment_id}) => {
    if (!comment_id) {
        return Promise.reject({
            status: 404,
            msg: 'Resource not found'
        })
    }
    return db.query(`DELETE FROM comments WHERE comment_id = $1;`, [comment_id])
}


module.exports = { selectCommentsByArticleId, makePostComment, updateVotes, modelDeleteComment };