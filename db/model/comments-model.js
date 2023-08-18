const db = require('../connection');
const { convertTimestampToDate, createRef, formatComments} = require('../seeds/utils');
const { selectArticles } = require('./articles-model');


const selectCommentsByArticleId = (article_id) => {
    return selectArticles(article_id).then(()=> {
        return db.query(`SELECT * FROM comments WHERE article_id = $1 
    ORDER BY created_at desc;`,  [article_id])
    .then((result) => {
        return result.rows;
    })
    })

};

module.exports = { selectCommentsByArticleId };