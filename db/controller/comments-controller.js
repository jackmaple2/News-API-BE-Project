const { response } = require('../../app');
const {
    selectCommentsByArticleId,
    makePostComment,
    deleteComment
} = require('../model/comments-model');

const getCommentsByArticleId = (request, response, next) => {

    const article_id = parseInt(request.params.article_id);
    selectCommentsByArticleId(article_id)
    .then((comments) => {
        response.status(200).send({comments});
    })
    .catch(next);
}

const postComment = (request, response, next) => {
    const {article_id} = request.params;
    const {username, body} = request.body;
    makePostComment({article_id, username, body})
    .then((comment) => {
        response.status(201).send({comment})
    })
    .catch(next);
}

const handleDeleteComment = (request, response, next) => {

    deleteComment()
}

module.exports = { getCommentsByArticleId, postComment, handleDeleteComment
};
