const {
    selectArticles,
    selectAllArticles,
    updateVotesInArticle
} = require('../model/articles-model');

const getAllArticles = (request, response, next) => {
    const {topic} = request.query
    selectAllArticles(topic)
    .then((articles) => {
        response.status(200).send({articles})
    })
    .catch(next);
}

const getArticleById = (request, response, next) => {
    const article_id = parseInt(request.params.article_id);
    
    selectArticles(article_id)
    .then((article) => {
        response.status(200).send({article});
    })
    .catch(next);
}

const patchVotesInArticle = (request, response, next) => {
    const {article_id} = request.params;
    const {inc_votes} = request.body;
    updateVotesInArticle(inc_votes, article_id)
    .then((article) => {
        response.status(200).send({article})
    })
    .catch(next);
}

module.exports = { getArticleById, getAllArticles, patchVotesInArticle };