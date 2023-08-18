const {
    selectCommentsByArticleId
} = require('../model/comments-model');

const getCommentsByArticleId = (request, response, next) => {

    const article_id = parseInt(request.params.article_id);
    selectCommentsByArticleId(article_id)
    .then((comments) => {
        response.status(200).send({comments});
    })
    .catch(next);
    
}

// parseInt will convert string to a number, so if request.params.article_id is not a number it will return NaN, use this for error handling


module.exports = { getCommentsByArticleId, selectCommentsByArticleId };