const db = require('../connection');
const { convertTimestampToDate, createRef, formatComments} = require('../seeds/utils');
const { selectArticles } = require('./articles-model');


const selectCommentsByArticleId = (article_id) => {
    return selectArticles(article_id).then(()=> {
        return db.query(`SELECT * FROM comments WHERE article_id = $1 
        ORDER BY created_at desc;`,  [article_id])
        .then((result) => {
            console.log(result);
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

// const updateVotes = (inc_votes, article_id) => {
//     return selectArticles(article_id).then(() => {
//         return db.query(`UPDATE comments SET votes = $1 + votes WHERE article_id = $2 RETURNING *;`, ([inc_votes, article_id]))
//         .then((result) => {
//             return result.rows[0];
//         })
//     })
// }

const updateVotesInArticle = (inc_votes, article_id) => {
    return selectArticles(article_id).then(() => {
        return db.query(`UPDATE articles SET votes = $1 + votes WHERE article_id = $2 RETURNING *;`, ([inc_votes, article_id]))
        .then((result) => {
            return result.rows[0];
        })
    })
}

module.exports = { selectCommentsByArticleId, makePostComment, 
    // updateVotes, 
    updateVotesInArticle
 };

