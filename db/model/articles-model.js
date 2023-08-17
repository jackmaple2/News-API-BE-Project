const db = require('../connection');
const { convertTimestampToDate, createRef, formatComments} = require('../seeds/utils');


const selectAllArticles = () => {

    const baseSql = `SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.*)
    AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY created_at desc;`;
    return db.query(baseSql)
    .then((result) => {
        return result.rows;
    })
}



const getArticlesById = (article_id) => {
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



module.exports = { getArticlesById, selectAllArticles };