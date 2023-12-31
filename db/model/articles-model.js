const db = require('../connection');
const { convertTimestampToDate, createRef, formatComments} = require('../seeds/utils');


const selectAllArticles = (topic) => {
    const acceptedSorts = ['topic']

    let baseSql = `SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.*)
    AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id`;
  
    if (topic) {
        baseSql += ` WHERE articles.topic = ${topic}`;
    }

    baseSql += ` GROUP BY articles.article_id ORDER BY created_at desc;`;

    return db.query(baseSql)
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'Not found'})
        }
        return result.rows;
    })
}

const selectArticles = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({rows}) => {
        const article = rows[0];
        if (!article) {
            return Promise.reject({
                status: 404,
                msg: 'Resource not found'
            })
        }          
        return article;
    })
}

const updateVotesInArticle = (inc_votes, article_id) => {
    return selectArticles(article_id).then(() => {
        return db.query(`UPDATE articles SET votes = $1 + votes WHERE article_id = $2 RETURNING *;`, ([inc_votes, article_id]))
        .then((result) => {
            return result.rows[0];
        })
    })
}

module.exports = { selectArticles, selectAllArticles, updateVotesInArticle };