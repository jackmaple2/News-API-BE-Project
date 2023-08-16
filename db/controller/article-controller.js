const {
    selectArticles,
    selectAllArticles
} = require('../model/articles-model');

const getAllArticles = (request, response, next) => {
    selectAllArticles()
    .then((articles) => {
        response.status(200).send({articles: articles})
    })
    .catch(next);
}

const getArticles = (request, response, next) => {
    const article_id = parseInt(request.params.article_id);
    
    selectArticles(article_id)
    .then((article) => {
        response.status(200).send({article});
    })
    .catch(next);
}

module.exports = { getArticles, getAllArticles };